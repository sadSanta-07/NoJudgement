"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Sparkles,
  Brain,
  Mic,
  RotateCcw,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AICoachPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const res = await fetch("/api/coach");
        const data = await res.json();
        setMessages(data.messages || []);
      } catch (err) {
        console.error("Failed to load coach messages", err);
      }
    };

    loadMessages();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

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
    <div className="h-[calc(100vh-10rem)] max-w-4xl mx-auto flex flex-col">
      {/* ── CHAT CONTAINER ── */}
      <div className="flex-1 rounded-[22px] bg-[#fcfbf8] border border-[#e8e6e1] shadow-[0_1px_2px_rgba(60,48,30,.07),0_4px_8px_rgba(60,48,30,.07),0_12px_24px_rgba(60,48,30,.07)] flex flex-col overflow-hidden">
        
        {/* HEADER */}
        <div className="px-6 py-4 border-b border-[#e8e6e1] bg-[#fcfbf8] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[8px] bg-[#d9b3a9] text-[#1d1c1a] flex items-center justify-center shadow-sm">
              <Brain size={20} />
            </div>
            <div>
              <p className="font-display text-xl font-normal text-[#1d1c1a] leading-none">
                AI Speaking Coach
              </p>
              <span className="font-mono text-[11px] text-[#1e5d36] font-medium flex items-center gap-1 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1e5d36] animate-pulse" />
                Adaptive Speech Guidance Active
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-[5px] bg-[#f1efea] border border-[#e8e6e1] font-mono text-xs text-[#6a625a]">
              <Sparkles size={12} className="text-[#b4400f]" />
              Llama 3 70B
            </span>
          </div>
        </div>

        {/* MESSAGES BODY */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-tactile-dots-subtle"
        >
          {messages.length === 0 && !loading && (
            <div className="text-center py-12 max-w-md mx-auto space-y-3">
              <div className="w-12 h-12 rounded-[10px] bg-[#f1efea] border border-[#e8e6e1] flex items-center justify-center mx-auto text-[#1d1c1a]">
                <Brain size={22} />
              </div>
              <h3 className="font-display text-2xl font-normal text-[#1d1c1a]">
                Begin your conversation practice
              </h3>
              <p className="text-xs text-[#5e5b55] leading-relaxed">
                Introduce yourself, describe your day, or ask for pronunciation and grammar tips. Your coach will reply with natural conversational dialogue.
              </p>
            </div>
          )}

          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[78%] px-4 py-3 rounded-[12px] text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#1d1c1a] text-[#fbfaf7] shadow-sm font-sans"
                    : "bg-[#f5f3ee] text-[#1d1c1a] border border-[#e8e6e1] font-sans"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </motion.div>
          ))}

          {/* LOADING INDICATOR */}
          {loading && (
            <div className="flex justify-start">
              <div className="px-4 py-3 rounded-[12px] bg-[#f5f3ee] border border-[#e8e6e1] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6a625a] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#6a625a] animate-bounce [animation-delay:0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#6a625a] animate-bounce [animation-delay:0.3s]" />
              </div>
            </div>
          )}
        </div>

        {/* INPUT TACTILE CONTROLS */}
        <div className="p-4 border-t border-[#e8e6e1] bg-[#fcfbf8] flex items-center gap-2.5">
          <input
            type="text"
            placeholder="Type your response or question to your coach..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-[5px] bg-[#fcfbf8] border border-[rgba(29,28,26,0.12)] text-sm text-[#1d1c1a] placeholder:text-[#a39a8e] focus:outline-none focus:ring-2 focus:ring-[#1d1c1a] focus:ring-offset-2 transition-all font-sans"
          />

          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="px-5 py-3 rounded-[5px] bg-[#1d1c1a] text-[#fbfaf7] text-xs font-mono font-medium flex items-center gap-1.5 hover:bg-[#2e2c28] disabled:opacity-40 transition-all cursor-pointer shadow-sm active:translate-y-[1px]"
          >
            <span>Send</span>
            <Send size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
