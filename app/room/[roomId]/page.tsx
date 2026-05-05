"use client";
import { awardPoints } from "@/lib/points";
import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Socket } from "socket.io-client";
import { WebRTCConnection } from "@/lib/webrtc";
import { useSession } from "next-auth/react";
import { getSocket } from "@/lib/socket-client";
import { useAudioRecorder } from "@/lib/useAudioRecorder";

export default function RoomPage() {
  const params = useParams() as { roomId: string };
  const roomId = params.roomId;
  const { data: session } = useSession();
  const router = useRouter();

  const [callState, setCallState] = useState<"connecting" | "connected" | "ended">("connecting");
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [warning, setWarning] = useState<string | null>(null);
  const [englishScore, setEnglishScore] = useState<number>(100);
  const [analyzing, setAnalyzing] = useState(false);

  const socketRef = useRef<Socket | null>(null);
  const webrtcRef = useRef<WebRTCConnection | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const warningTimerRef = useRef<NodeJS.Timeout | null>(null);
  const initializedRef = useRef(false);
  const localStreamRef = useRef<MediaStream | null>(null);
  const durationRef = useRef(0);

  const { start: startRecorder, stop: stopRecorder, getFullTranscript } = useAudioRecorder(
    (result) => {
      if (result.warning) {
        setWarning(result.warning);
        if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
        warningTimerRef.current = setTimeout(() => setWarning(null), 4000);
      }
      if (result.englishScore !== undefined) {
        setEnglishScore(result.englishScore);
      }
    }
  );

  const cleanup = useCallback(() => {
    webrtcRef.current?.destroy();
    stopRecorder();
    if (timerRef.current) clearInterval(timerRef.current);
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
  }, [stopRecorder]);

  const handleCallEnd = useCallback(async () => {
    stopRecorder();
    if (timerRef.current) clearInterval(timerRef.current);
    setCallState("ended");
    setAnalyzing(true);

    const transcript = getFullTranscript();
    const sessionDuration = durationRef.current;

    if (sessionDuration >= 120) {
      await awardPoints("session_complete");
    } else if (sessionDuration > 0) {
      await awardPoints("left_early");
    }

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcript: transcript || "",
          durationSeconds: sessionDuration,
        }),
      });

      const text = await res.text();
      if (!text) throw new Error("Empty response");

      const analysis = JSON.parse(text);

      if (analysis.englishScore !== undefined && analysis.englishScore < 60) {
        await awardPoints("non_english");
      }

      sessionStorage.setItem("callAnalysis", JSON.stringify(analysis));
      sessionStorage.setItem("callDuration", String(sessionDuration));

      router.push("/post-call");
    } catch (err) {
      console.error("Analysis failed:", err);
      sessionStorage.setItem("callAnalysis", JSON.stringify({
        fluency: 5, clarity: 5, helpfulness: 5,
        fillerWords: 0,
        feedback: "Analysis unavailable.",
        strongPoints: "Keep practicing!",
        improvePoints: "Speak clearly and in English.",
      }));
      router.push("/post-call");
    }
  }, [stopRecorder, getFullTranscript, router]);

  useEffect(() => {
    if (!session?.user) return;
    if (initializedRef.current) return;
    if (!roomId || roomId === "undefined") return;
    initializedRef.current = true;
    const socket = getSocket(roomId);
    socketRef.current = socket;

    const webrtc = new WebRTCConnection({
      socket,
      roomId,
      onRemoteStream: (stream) => {
        console.log("🎵 Got remote stream!");
        setCallState("connected");
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = stream;
          remoteAudioRef.current.play().catch(console.warn);
        }
        timerRef.current = setInterval(() => {
          setDuration((d) => {
            durationRef.current = d + 1;
            return d + 1;
          });
        }, 1000);
      },
      onPeerLeft: () => handleCallEnd(),
    });

    webrtcRef.current = webrtc;

    webrtc.initLocalStream()
      .then((stream) => {
        if (!stream) return;
        localStreamRef.current = stream;
        webrtc.joinRoom();
        startRecorder(stream);
      })
      .catch(console.error);
  }, [session, roomId, cleanup, handleCallEnd, startRecorder]);

  const handleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    webrtcRef.current?.toggleMute(newMuted);
  };

  const handleLeave = () => {
    cleanup();
    handleCallEnd();
  };

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

return (
  <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-[#f7f7fb]">

    <audio ref={remoteAudioRef} autoPlay />

    {/* English warning banner */}
    {warning && (
      <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
        ⚠️ {warning}
      </div>
    )}

    {/* CONNECTING */}
    {callState === "connecting" && (
      <p className="text-gray-500">Connecting to partner...</p>
    )}

    {/* CONNECTED */}
    {callState === "connected" && (
      <div className="flex flex-col items-center gap-4">

        {/* 🔥 TOP BAR */}
        <div className="flex items-center gap-3 bg-white px-6 py-2 rounded-full shadow border">
          
          {/* USERS ICON */}
          <span className="text-blue-500 text-xl">👥</span>

          {/* LIVE LABEL */}
          <span className="text-green-600 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Live
          </span>

          {/* TIMER */}
          <span className="font-mono text-gray-700 text-lg">
            {formatTime(duration)}
          </span>
        </div>

        {/* TITLE */}
        <p className="text-green-600 font-bold">Live Practice</p>

        {/* English score indicator */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">English score:</span>
          <span
            className={
              englishScore >= 60
                ? "text-green-600 font-bold"
                : "text-red-500 font-bold"
            }
          >
            {englishScore}%
          </span>
        </div>
      </div>
    )}

    {/* ENDED */}
    {callState === "ended" && (
      <div className="flex flex-col items-center gap-2">
        <p className="text-gray-500">Call ended</p>
        {analyzing && (
          <p className="text-blue-500 text-sm">Analyzing your session...</p>
        )}
      </div>
    )}

    {/* CONTROLS */}
    <div className="flex gap-4 mt-4">
      <button
        onClick={handleMute}
        className={`px-5 py-2 rounded-full transition ${
          isMuted
            ? "bg-red-500 text-white"
            : "bg-white border text-gray-700 shadow"
        }`}
      >
        {isMuted ? "Unmute" : "Mute"}
      </button>

      <button
        onClick={handleLeave}
        className="bg-red-600 text-white px-5 py-2 rounded-full shadow"
      >
        Leave
      </button>
    </div>
  </div>
);
}