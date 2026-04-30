"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { io, Socket } from "socket.io-client";
import { WebRTCConnection } from "@/lib/webrtc";
import { useSession } from "next-auth/react";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL!;

export default function RoomPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const { data: session } = useSession();

  const [callState, setCallState] = useState<"connecting" | "connected" | "ended">("connecting");
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);

  const socketRef = useRef<Socket | null>(null);
  const webrtcRef = useRef<WebRTCConnection | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const cleanup = useCallback(() => {
    webrtcRef.current?.destroy();
    socketRef.current?.disconnect();
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (!session?.user) return;

    const socket = io(SOCKET_URL, { transports: ["websocket"] });
    socketRef.current = socket;

    socket.on("connect", async () => {
      const webrtc = new WebRTCConnection({
        socket,
        roomId,
        onRemoteStream: (stream) => {
          console.log("Got remote stream!");
          setCallState("connected");

          if (remoteAudioRef.current) {
            remoteAudioRef.current.srcObject = stream;

            remoteAudioRef.current.play().catch((e) => {
              console.warn("Autoplay blocked:", e);

            });
          }

          timerRef.current = setInterval(() => {
            setDuration((d) => d + 1);
          }, 1000);
        },
        onPeerLeft: () => {
          setCallState("ended");
          cleanup();
        },
      });

      webrtcRef.current = webrtc;
      await webrtc.initLocalStream();
      webrtc.joinRoom();
    });

    return () => cleanup();
  }, [session, roomId, setCallState, cleanup]);

  const handleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    webrtcRef.current?.toggleMute(newMuted);
  };

  const handleLeave = () => {
    cleanup();
    setCallState("ended");
  };

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <audio ref={remoteAudioRef} autoPlay />

      {callState === "connecting" && (
        <p className="text-gray-500">Connecting to partner...</p>
      )}

      {callState === "connected" && (
        <>
          <p className="text-green-600 font-bold">Live Practice</p>
          <p className="text-2xl font-mono">{formatTime(duration)}</p>
        </>
      )}

      {callState === "ended" && (
        <p className="text-red-500">Call ended</p>
      )}

      <div className="flex gap-4">
        <button
          onClick={handleMute}
          className={`px-4 py-2 rounded-full ${isMuted ? "bg-red-500 text-white" : "bg-gray-200"
            }`}
        >
          {isMuted ? "Unmute" : "Mute"}
        </button>

        <button
          onClick={handleLeave}
          className="bg-red-600 text-white px-4 py-2 rounded-full"
        >
          Leave
        </button>
      </div>
    </div>
  );
}