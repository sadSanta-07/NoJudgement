"use client";

import { useState, useRef, useEffect } from "react";
import { Socket } from "socket.io-client";
import { useRouter } from "next/navigation";
import { getSocket } from "@/lib/socket-client";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Globe, Radio } from "lucide-react";
import Image from "next/image";

interface Props {
  level: string;
  topic: string;
  userId: string;
  label?: string;
  buttonClassName?: string;
}

export default function MatchButton({
  level,
  topic,
  userId,
  label = "Start Speaking Session",
  buttonClassName = "",
}: Props) {
  const [status, setStatus] = useState<"idle" | "searching" | "matched">("idle");
  const socketRef = useRef<Socket | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    return () => {
      const socket = socketRef.current;
      if (socket) {
        socket.off("matched");
        socket.off("connect_error");
      }
    };
  }, []);

  const startSearch = async () => {
    if (status === "searching") return;

    if (!userId) {
      console.error("User not authenticated");
      return;
    }

    setStatus("searching");
    const socket = getSocket();
    socketRef.current = socket;
    const roomId = crypto.randomUUID();

    const emitJoin = () => {
      socket.emit("join_queue", {
        userId,
        level,
        topic,
        roomId,
      });
    };

    if (socket.connected) emitJoin();
    else socket.once("connect", emitJoin);

    socket.off("matched");
    socket.off("connect_error");

    socket.once("matched", async ({ roomId: serverRoomId }) => {
      const finalRoomId = serverRoomId || roomId;

      try {
        const res = await fetch("/api/match", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            level,
            topic,
            roomId: finalRoomId,
          }),
        });

        if (!res.ok) throw new Error("Match API failed");

        setStatus("matched");

        setTimeout(() => {
          router.push(`/room/${finalRoomId}`);
        }, 600);
      } catch (err) {
        console.error(err);
        setStatus("idle");
      }
    });

    socket.once("connect_error", () => {
      console.error("Socket connection failed");
      setStatus("idle");
    });
  };

  const cancelSearch = () => {
    const socket = socketRef.current;
    if (socket) {
      socket.emit("leave_queue");
      socket.off("matched");
      socket.off("connect_error");
    }
    setStatus("idle");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* ── IDLE STATE ── */}
      {status === "idle" && (
        <button
          onClick={startSearch}
          className={`inline-flex items-center gap-3 px-6 py-3.5 rounded-[6px] font-sans font-medium text-base text-[#fbfaf7] bg-[#1d1c1a] border border-[#1d1c1a] shadow-[0_1px_1px_rgba(60,48,30,.06),0_2px_4px_rgba(60,48,30,.06)] hover:shadow-[0_1px_2px_rgba(60,48,30,.07),0_4px_8px_rgba(60,48,30,.07),0_12px_24px_rgba(60,48,30,.07)] hover:bg-[#282725] transition-all duration-150 cursor-pointer active:translate-y-[1px] select-none ${buttonClassName}`}
        >
          <span>{label}</span>
          <Plus size={18} strokeWidth={2.5} />
        </button>
      )}

      {/* ── SEARCHING MODAL (Tactile Aesthetic) ── */}
      <AnimatePresence>
        {status === "searching" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex flex-col items-center justify-center bg-[#f6f5f1]/95 backdrop-blur-md z-50 p-6 bg-tactile-dots text-center"
          >
            {/* Concentric Tactile Waves */}
            <div className="relative flex items-center justify-center mb-10 w-48 h-48">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-[#d9b3a9]"
                  initial={{ width: 60, height: 60, opacity: 0.8 }}
                  animate={{ width: 220, height: 220, opacity: 0 }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: "easeOut",
                  }}
                />
              ))}

              {/* Avatar Center Node */}
              <div className="w-20 h-20 rounded-[18px] bg-[#fcfbf8] border-2 border-[#e8e6e1] shadow-lg flex items-center justify-center overflow-hidden z-10 relative">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="font-display text-2xl font-normal text-[#1d1c1a]">
                    {session?.user?.name?.charAt(0) || "U"}
                  </div>
                )}
              </div>
            </div>

            {/* Typography */}
            <h2 className="font-display text-3xl md:text-4xl font-normal text-[#1d1c1a] mb-3">
              Finding your conversation partner...
            </h2>

            <p className="text-sm text-[#5e5b55] max-w-md mb-6 leading-relaxed">
              Searching for an active speaker at{" "}
              <span className="font-mono text-xs px-2 py-0.5 rounded-[5px] bg-[#f1efea] border border-[#e8e6e1] text-[#1d1c1a] font-semibold">
                {level}
              </span>{" "}
              level for{" "}
              <span className="font-mono text-xs px-2 py-0.5 rounded-[5px] bg-[#f1efea] border border-[#e8e6e1] text-[#1d1c1a] font-semibold">
                {topic}
              </span>{" "}
              practice.
            </p>

            {/* Dot Animation */}
            <div className="flex space-x-2 mb-10">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-[#1d1c1a] rounded-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 0.7,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>

            {/* Cancel Keycap Button */}
            <button
              onClick={cancelSearch}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[5px] bg-[#f1efea] hover:bg-[#ffffff] text-[#1d1c1a] border border-[#e8e6e1] font-mono text-xs font-medium shadow-sm transition-all cursor-pointer active:translate-y-[1px]"
            >
              <X size={14} />
              <span>Cancel Search</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MATCHED NOTIFICATION ── */}
      {status === "matched" && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#f6f5f1]/95 z-50">
          <div className="p-8 rounded-[22px] bg-[#fcfbf8] border border-[#e8e6e1] shadow-2xl text-center space-y-3">
            <span className="font-mono text-xs text-[#1e5d36] uppercase tracking-wider font-semibold">
              ● Match Connected
            </span>
            <h3 className="font-display text-3xl font-normal text-[#1d1c1a]">
              Partner Found!
            </h3>
            <p className="text-sm text-[#5e5b55]">
              Connecting audio channel & opening room...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
