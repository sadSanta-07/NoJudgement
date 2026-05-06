"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Sparkles,
  Brain,
  Mic,
  Plus,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AICoachPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const res = await fetch("/api/coach");
        const data = await res.json();
        setMessages(data.messages || []);
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    };

    loadMessages();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] bg-[#f5f5f7] flex flex-col p-4 md:p-6">

      {/* CHAT CONTAINER */}
      <div className="flex-1 bg-white/80 backdrop-blur-2xl rounded-[2rem] border border-black/[0.04] shadow-[0_10px_40px_rgba(0,0,0,0.06)] flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="px-6 py-4 border-b flex items-center justify-between bg-white/60 backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFA133] to-[#A5BBFC] flex items-center justify-center text-white">
              <Brain size={20} />
            </div>
            <div>
              <p className="font-bold text-[var(--color-tertiary)]">
                NoJudgment.AI
              </p>
              <p className="text-xs text-green-500 font-semibold">
                Coach Online
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-[#A5BBFC]/20 px-3 py-1.5 rounded-lg">
              <Sparkles size={14} className="text-[#6F8EF6]" />
            </div>

            <button className="p-2 hover:bg-[var(--color-neutral)] rounded-lg text-gray-400">
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] px-5 py-3.5 rounded-[1.6rem] ${
                  msg.role === "user"
                    ? "bg-[#6F8EF6] text-white"
                    : "bg-[var(--color-neutral)] text-[var(--color-tertiary)]"
                }`}
              >
                <p className="text-[15px] leading-7 font-medium tracking-[-0.01em]">{msg.content}</p>
              </div>
            </motion.div>
          ))}

          {/* LOADING INDICATOR */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-4 py-2 rounded-xl text-sm text-gray-500">
                <div className="flex gap-1 px-4 py-3 rounded-2xl bg-black/[0.04]">
  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100" />
  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200" />
</div>
              </div>
            </div>
          )}
        </div>

        {/* INPUT */}
        <div className="p-4 border-t flex items-center gap-3">

          <button className="p-3 rounded-xl bg-[#FFA133]/10 text-[#FFA133] hover:bg-[#FFA133]/20">
            <Mic size={18} />
          </button>

          <input
            type="text"
            placeholder="Type your response..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 px-4 py-3 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[#A5BBFC]"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#FFA133] to-[#A5BBFC] text-white font-semibold flex items-center gap-2 disabled:opacity-50"
          >
            <Send size={16} />
            Send
          </button>
        </div>
      </div>
    </div>
  );
}