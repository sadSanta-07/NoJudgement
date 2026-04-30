"use client";

import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/navigation";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL!;

interface Props {
  level: string;
  topic: string;
  userId: string;
}

export default function MatchButton({ level, topic, userId }: Props) {
  const [status, setStatus] = useState<"idle" | "searching" | "matched">("idle");
  const socketRef = useRef<Socket | null>(null);
  const router = useRouter();

  useEffect(() => {
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

const startSearch = async () => {
  setStatus("searching");

  const socket = io(SOCKET_URL, { transports: ["websocket"] });
  socketRef.current = socket;

  socket.on("connect", () => {

    socket.emit("join_queue", { userId, level, topic });
  });

  socket.on("matched", async ({ partnerId, roomId }) => {
    console.log("Matched! roomId:", roomId);
    setStatus("matched");

    await fetch("/api/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ level, topic, partnerId, roomId }),
    });

    setTimeout(() => {
      router.push(`/room/${roomId}`);
    }, 1000);
  });

  socket.on("connect_error", () => {
    setStatus("idle");
    console.error("Socket connection failed");
  });
};
  const cancelSearch = () => {
    socketRef.current?.emit("leave_queue");
    socketRef.current?.disconnect();
    setStatus("idle");
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {status === "idle" && (
        <button
          onClick={startSearch}
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Search for Partners
        </button>
      )}

      {status === "searching" && (
        <>
          <p className="text-gray-600">Finding someone for {topic} at {level} level...</p>
          <button
            onClick={cancelSearch}
            className="text-sm text-gray-400 underline"
          >
            Cancel Search
          </button>
        </>
      )}

      {status === "matched" && (
        <p className="text-green-600 font-bold">Matched! Redirecting...</p>
      )}
    </div>
  );
}