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
      console.log("Got remote track");
      this.onRemoteStream(event.streams[0]);
    };

    this.pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("Sending ICE candidate");
        this.socket.emit("webrtc_ice_candidate", {
          candidate: event.candidate,
          roomId: this.roomId,
        });
      }
    };

    this.pc.onconnectionstatechange = () => {
      console.log("WebRTC state:", this.pc.connectionState);
    };

    this.pc.onicegatheringstatechange = () => {
      console.log("ICE gathering:", this.pc.iceGatheringState);
    };

    this.pc.oniceconnectionstatechange = () => {
      console.log("ICE connection:", this.pc.iceConnectionState);
      if (this.pc.iceConnectionState === "failed") {
        console.warn("ICE failed — restarting...");
        this.pc.restartIce();
      }
    };
  }

  private async flushIceCandidates() {
    console.log(`Flushing ${this.iceCandidateBuffer.length} buffered ICE candidates`);
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
    this.socket.on("room_role", async ({ role }: { role: "caller" | "callee" }) => {
       console.log("Got role:", role);
      this.isCaller = role === "caller";
      console.log(`Role assigned: ${role}`);

      if (this.isCaller) {
        await this.createOffer();
      }
    });

    this.socket.on("webrtc_offer", async ({ offer }: { offer: RTCSessionDescriptionInit }) => {
      console.log("Got offer");
      try {
        await this.pc.setRemoteDescription(new RTCSessionDescription(offer));
        this.remoteDescSet = true;
        await this.flushIceCandidates();

        const answer = await this.pc.createAnswer();
        await this.pc.setLocalDescription(answer);

        this.socket.emit("webrtc_answer", { answer, roomId: this.roomId });
        console.log("Sent answer");
      } catch (e) {
        console.error("Error handling offer:", e);
      }
    });

    this.socket.on("webrtc_answer", async ({ answer }: { answer: RTCSessionDescriptionInit }) => {
      console.log("Got answer");
      try {
        await this.pc.setRemoteDescription(new RTCSessionDescription(answer));
        this.remoteDescSet = true;
        await this.flushIceCandidates();
      } catch (e) {
        console.error("Error handling answer:", e);
      }
    });

    this.socket.on("webrtc_ice_candidate", async ({ candidate }: { candidate: RTCIceCandidateInit }) => {
      console.log("Got ICE candidate, remoteDescSet:", this.remoteDescSet);
      if (!this.remoteDescSet) {
        console.log("Buffering ICE candidate");
        this.iceCandidateBuffer.push(candidate);
        return;
      }
      try {
        await this.pc.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (e) {
        console.error("ICE candidate error:", e);
      }
    });

    this.socket.on("peer_left", () => {
      console.log("Peer left");
      this.onPeerLeft();
    });
  }

  private async createOffer() {
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
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
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
    console.log("Joined room:", this.roomId);
    this.socket.emit("join_room", this.roomId);
  }

  toggleMute(muted: boolean) {
    if (this.localStream) {
      this.localStream.getAudioTracks().forEach((track) => {
        track.enabled = !muted;
      });
    }
  }

  destroy() {
    this.localStream?.getTracks().forEach((t) => t.stop());
    this.pc.close();
    this.socket.off("room_role");
    this.socket.off("webrtc_offer");
    this.socket.off("webrtc_answer");
    this.socket.off("webrtc_ice_candidate");
    this.socket.off("peer_left");
    this.socket.emit("leave_room", this.roomId);
    console.log("WebRTC cleaned up");
  }
}