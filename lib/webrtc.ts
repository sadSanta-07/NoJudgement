import { Socket } from "socket.io-client";

const ICE_SERVERS = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    {
      urls: "turn:openrelay.metered.ca:80",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
    {
      urls: "turn:openrelay.metered.ca:443",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
  ],
};

export class WebRTCConnection {
  private pc: RTCPeerConnection;
  private localStream: MediaStream | null = null;
  private socket: Socket;
  private roomId: string;
  private onRemoteStream: (stream: MediaStream) => void;
  private onPeerLeft: () => void;
  private isCaller: boolean = false;
  private iceCandidateBuffer: RTCIceCandidateInit[] = [];
  private remoteDescSet: boolean = false;
  private destroyed: boolean = false; // track destruction
  private joinedAt: number = 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handlers: Record<string, (...args: any[]) => void> = {};

  constructor({
    socket,
    roomId,
    onRemoteStream,
    onPeerLeft,
  }: {
    socket: Socket;
    roomId: string;
    onRemoteStream: (stream: MediaStream) => void;
    onPeerLeft: () => void;
  }) {
    this.socket = socket;
    this.roomId = roomId;
    this.onRemoteStream = onRemoteStream;
    this.onPeerLeft = onPeerLeft;
    this.pc = new RTCPeerConnection(ICE_SERVERS);

    this.setupPeerConnection();
    this.setupSocketListeners();
  }

  private setupPeerConnection() {
    this.pc.ontrack = (event) => {
      if (this.destroyed) return;
      console.log("Got remote track");
      this.onRemoteStream(event.streams[0]);
    };

    this.pc.onicecandidate = (event) => {
      if (this.destroyed) return;
      if (event.candidate) {
        this.socket.emit("webrtc_ice_candidate", {
          candidate: event.candidate,
          roomId: this.roomId,
        });
      }
    };

    this.pc.onconnectionstatechange = () => {
      console.log("WebRTC state:", this.pc.connectionState);
    };

    this.pc.oniceconnectionstatechange = () => {
      console.log("ICE connection:", this.pc.iceConnectionState);
      if (this.pc.iceConnectionState === "failed") {
        this.pc.restartIce();
      }
    };
  }

  private async flushIceCandidates() {
    for (const candidate of this.iceCandidateBuffer) {
      try {
        await this.pc.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (e) {
        console.error("ICE flush error:", e);
      }
    }
    this.iceCandidateBuffer = [];
  }

  private setupSocketListeners() {
    // Store named handlers so we remove only THIS instance's listeners
    this.handlers["room_role"] = async ({ role }: { role: "caller" | "callee" }) => {
      if (this.destroyed) return;
      console.log(`Role assigned: ${role}`);
      this.isCaller = role === "caller";
      if (this.isCaller) await this.createOffer();
    };

    this.handlers["webrtc_offer"] = async ({ offer }: { offer: RTCSessionDescriptionInit }) => {
      if (this.destroyed) return;
      console.log("Got offer");
      try {
        await this.pc.setRemoteDescription(new RTCSessionDescription(offer));
        this.remoteDescSet = true;
        await this.flushIceCandidates();
        const answer = await this.pc.createAnswer();
        await this.pc.setLocalDescription(answer);
        this.socket.emit("webrtc_answer", { answer, roomId: this.roomId });
      } catch (e) {
        console.error("Error handling offer:", e);
      }
    };

    this.handlers["webrtc_answer"] = async ({ answer }: { answer: RTCSessionDescriptionInit }) => {
      if (this.destroyed) return;
      console.log("Got answer");
      try {
        await this.pc.setRemoteDescription(new RTCSessionDescription(answer));
        this.remoteDescSet = true;
        await this.flushIceCandidates();
      } catch (e) {
        console.error("Error handling answer:", e);
      }
    };

    this.handlers["webrtc_ice_candidate"] = async ({ candidate }: { candidate: RTCIceCandidateInit }) => {
      if (this.destroyed) return;
      if (!this.remoteDescSet) {
        this.iceCandidateBuffer.push(candidate);
        return;
      }
      try {
        await this.pc.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (e) {
        console.error("ICE candidate error:", e);
      }
    };

    this.handlers["peer_left"] = () => {
      if (Date.now() - this.joinedAt < 2000) {
        console.warn("⚠️ Ignoring stale peer_left event");
        return;
      }
      console.log("Peer left");
      this.onPeerLeft();
    };

    Object.entries(this.handlers).forEach(([event, handler]) => {
      this.socket.on(event, handler);
    });
  }

  private async createOffer() {
    if (this.destroyed || this.pc.signalingState === "closed") return;
    try {
      const offer = await this.pc.createOffer();
      await this.pc.setLocalDescription(offer);
      this.socket.emit("webrtc_offer", { offer, roomId: this.roomId });
      console.log("Sent offer");
    } catch (e) {
      console.error("Error creating offer:", e);
    }
  }

  async initLocalStream() {
    if (this.destroyed || this.pc.signalingState === "closed") {
      console.warn("Cannot init stream — connection closed");
      return null;
    }

    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      if (this.destroyed || this.pc.signalingState as string === "closed") {
        this.localStream.getTracks().forEach((t) => t.stop());
        console.warn("PC closed during getUserMedia, aborting");
        return null;
      }

      this.localStream.getTracks().forEach((track) => {
        this.pc.addTrack(track, this.localStream!);
      });

      console.log("Got local audio stream");
      return this.localStream;
    } catch (e) {
      console.error("Mic access denied:", e);
      throw e;
    }
  }

  joinRoom() {
    if (this.destroyed) return;
    this.joinedAt = Date.now();
    console.log("Joining room:", this.roomId);
    this.socket.emit("join_room", this.roomId);
  }

  toggleMute(muted: boolean) {
    this.localStream?.getAudioTracks().forEach((track) => {
      track.enabled = !muted;
    });
  }

  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;

    this.localStream?.getTracks().forEach((t) => t.stop());

    Object.entries(this.handlers).forEach(([event, handler]) => {
      this.socket.off(event, handler);
    });

    this.socket.emit("leave_room", this.roomId);
    this.pc.close();
    console.log("WebRTC cleaned up");
  }
}