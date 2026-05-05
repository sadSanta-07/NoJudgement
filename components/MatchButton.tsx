"use client";

import { useState, useRef, useEffect } from "react";
import { Socket } from "socket.io-client";
import { useRouter } from "next/navigation";
import { getSocket } from "@/lib/socket-client";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

interface Props {
  level: string;
  topic: string;
  userId: string;
  label?: string;
}

export default function MatchButton({
  level,
  topic,
  userId,
  label = "Start a Session",
}: Props) {
  const [status, setStatus] = useState<"idle" | "searching" | "matched">("idle");
  const socketRef = useRef<Socket | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  // ✅ CLEANUP ON UNMOUNT
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

    // ✅ SAFE: remove previous listeners before adding
    socket.off("matched");
    socket.off("connect_error");

    socket.once("matched", async ({ roomId: serverRoomId }) => {
      const finalRoomId = serverRoomId || roomId;

      try {
        const res = await fetch("/api/match", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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

      {/* IDLE */}
      {status === "idle" && (
        <button
          onClick={startSearch}
          className="flex items-center gap-3 px-8 py-4 rounded-full 
                     bg-white text-gray-900 font-semibold text-lg
                     shadow-md hover:shadow-lg 
                     transition-all duration-200
                     active:scale-[0.97]"
        >
          {label}
          <span className="text-xl font-bold">+</span>
        </button>
      )}

      {/* SEARCHING */}
      {status === "searching" && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">

          {/* RIPPLE */}
          <div className="relative flex items-center justify-center mb-10">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-48 h-48 rounded-full border border-blue-300"
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeOut",
                }}
              />
            ))}

            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md z-10">
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#FF6A00] to-[#3B5BFF] flex items-center justify-center text-white font-bold text-xl">
                  {session?.user?.name?.charAt(0) || "U"}
                </div>
              )}
            </div>
          </div>

          {/* TEXT */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Searching for Partners...
          </h2>

          <p className="text-gray-500 text-center max-w-md mb-6">
            Finding someone interested in{" "}
            <span className="text-blue-600 font-semibold">{topic}</span> at{" "}
            <span className="text-blue-600 font-semibold">{level}</span> level.
          </p>

          {/* DOT LOADER */}
          <div className="flex space-x-2 mb-8">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2.5 h-2.5 bg-blue-400 rounded-full"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          {/* CANCEL */}
          <button
            onClick={cancelSearch}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition"
          >
            ✕ Cancel Search
          </button>
        </div>
      )}

      {/* MATCHED */}
      {status === "matched" && (
        <p className="text-green-600 font-semibold text-lg">
          Matched! Redirecting...
        </p>
      )}
    </div>
  );
}