"use client";

import { awardPoints } from "@/lib/points";
import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Socket } from "socket.io-client";
import { WebRTCConnection } from "@/lib/webrtc";
import { useSession } from "next-auth/react";
import { getSocket } from "@/lib/socket-client";
import { useAudioRecorder } from "@/lib/useAudioRecorder";
import { Mic, MicOff, PhoneOff, AlertTriangle, Users, Sparkles, Radio } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-[#f6f5f1] text-[#1d1c1a] bg-tactile-dots flex flex-col items-center justify-between p-6 sm:p-10">
      <audio ref={remoteAudioRef} autoPlay />

      {/* WARNING BANNER */}
      {warning && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-[#fee9d6] border border-[#fbd2b3] text-[#93450c] px-5 py-2.5 rounded-[6px] shadow-lg z-50 font-mono text-xs flex items-center gap-2 animate-bounce">
          <AlertTriangle size={15} />
          <span>⚠️ {warning}</span>
        </div>
      )}

      {/* ── TOP ROOM BAR ── */}
      <header className="w-full max-w-2xl mx-auto flex items-center justify-between p-4 rounded-[14px] bg-[#fcfbf8] border border-[#e8e6e1] shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[6px] bg-[#1d1c1a] text-[#fbfaf7] flex items-center justify-center font-display text-xs">
            N
          </div>
          <div>
            <h1 className="font-display text-lg font-normal text-[#1d1c1a] leading-none">
              Live Voice Arena
            </h1>
            <span className="font-mono text-[10px] text-[#6a625a]">Room: {roomId.slice(0, 8)}...</span>
          </div>
        </div>

        {callState === "connected" && (
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-[#d8eedf] border border-[#b7dfc3] font-mono text-xs text-[#1e5d36] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#1e5d36] animate-pulse" />
              Live
            </span>
            <span className="font-mono text-sm font-semibold text-[#1d1c1a] px-2.5 py-1 rounded-[5px] bg-[#f1efea] border border-[#e8e6e1]">
              {formatTime(duration)}
            </span>
          </div>
        )}
      </header>

      {/* ── CENTER STAGE ── */}
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-xl mx-auto py-12 text-center">
        {/* CONNECTING STATE */}
        {callState === "connecting" && (
          <div className="space-y-6">
            <div className="relative flex items-center justify-center w-40 h-40 mx-auto">
              {[0, 1].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-[#d9b3a9]"
                  initial={{ width: 60, height: 60, opacity: 0.8 }}
                  animate={{ width: 160, height: 160, opacity: 0 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.8,
                    ease: "easeOut",
                  }}
                />
              ))}
              <div className="w-16 h-16 rounded-[14px] bg-[#fcfbf8] border-2 border-[#e8e6e1] shadow-md flex items-center justify-center text-[#1d1c1a] font-display text-xl z-10">
                <Radio size={24} className="animate-pulse text-[#b4400f]" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="font-display text-3xl font-normal text-[#1d1c1a]">
                Establishing Audio Tunnel...
              </h2>
              <p className="font-mono text-xs text-[#6a625a] max-w-sm mx-auto leading-relaxed">
                Negotiating ICE candidates and establishing low-latency peer-to-peer WebRTC connection.
              </p>
            </div>
          </div>
        )}

        {/* CONNECTED STATE */}
        {callState === "connected" && (
          <div className="space-y-8 w-full">
            {/* AVATAR NODES */}
            <div className="flex items-center justify-center gap-8">
              {/* YOU */}
              <div className="flex flex-col items-center gap-2">
                <div className={`w-20 h-20 rounded-[20px] bg-[#fcfbf8] border-2 shadow-md flex items-center justify-center overflow-hidden transition-all ${isMuted ? "border-[#e8e6e1]" : "border-[#1d1c1a]"}`}>
                  <span className="font-display text-2xl font-normal text-[#1d1c1a]">
                    {session?.user?.name?.charAt(0) || "Y"}
                  </span>
                </div>
                <span className="font-mono text-xs text-[#1d1c1a] font-medium">You {isMuted ? "(Muted)" : ""}</span>
              </div>

              <div className="font-mono text-xs text-[#a39a8e] flex flex-col items-center">
                <span>⇄</span>
                <span>P2P</span>
              </div>

              {/* PARTNER */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-[20px] bg-[#d9b3a9]/30 border-2 border-[#d9b3a9] shadow-md flex items-center justify-center overflow-hidden">
                  <span className="font-display text-2xl font-normal text-[#1d1c1a]">
                    P
                  </span>
                </div>
                <span className="font-mono text-xs text-[#1d1c1a] font-medium">Partner</span>
              </div>
            </div>

            {/* REALTIME METRICS CARD */}
            <div className="p-4 rounded-[12px] bg-[#fcfbf8] border border-[#e8e6e1] shadow-sm max-w-xs mx-auto flex items-center justify-between text-xs font-mono">
              <span className="text-[#6a625a]">English Consistency:</span>
              <span className={`font-semibold ${englishScore >= 60 ? "text-[#1e5d36]" : "text-[#b4400f]"}`}>
                {englishScore}%
              </span>
            </div>
          </div>
        )}

        {/* ENDED STATE */}
        {callState === "ended" && (
          <div className="space-y-4">
            <h2 className="font-display text-3xl font-normal text-[#1d1c1a]">
              Conversation Completed
            </h2>
            {analyzing && (
              <p className="font-mono text-xs text-[#6a625a] flex items-center justify-center gap-2">
                <span className="w-3 h-3 border-2 border-[#1d1c1a] border-t-transparent rounded-full animate-spin" />
                Processing speech transcript with AI analysis...
              </p>
            )}
          </div>
        )}
      </main>

      {/* ── BOTTOM TACTILE CALL CONTROLS ── */}
      <footer className="w-full max-w-sm mx-auto flex items-center justify-center gap-4 p-3 rounded-[16px] bg-[#fcfbf8] border border-[#e8e6e1] shadow-[0_1px_2px_rgba(60,48,30,.07),0_4px_8px_rgba(60,48,30,.07)]">
        <button
          onClick={handleMute}
          disabled={callState !== "connected"}
          className={`flex items-center gap-2 px-5 py-3 rounded-[6px] text-xs font-mono font-medium border transition-all cursor-pointer active:translate-y-[1px] disabled:opacity-40 ${
            isMuted
              ? "bg-[#fee9d6] border-[#fbd2b3] text-[#93450c]"
              : "bg-[#f1efea] border-[#e8e6e1] text-[#1d1c1a] hover:bg-[#ffffff]"
          }`}
        >
          {isMuted ? <MicOff size={15} /> : <Mic size={15} />}
          <span>{isMuted ? "Unmute" : "Mute"}</span>
        </button>

        <button
          onClick={handleLeave}
          className="flex items-center gap-2 px-6 py-3 rounded-[6px] text-xs font-mono font-medium text-[#fbfaf7] bg-[#e0564c] hover:bg-[#c8443b] border border-[#c8443b] shadow-sm transition-all cursor-pointer active:translate-y-[1px]"
        >
          <PhoneOff size={15} />
          <span>Leave Session</span>
        </button>
      </footer>
    </div>
  );
}
