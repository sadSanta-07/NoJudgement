"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Shield, Check, Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";
import MatchButton from "@/components/MatchButton";

export default function Matchmaking() {
  const { data: session, status } = useSession();

  const userId = (session?.user as any)?.id || session?.user?.email;

  const [level, setLevel] = useState("Intermediate");
  const [topic, setTopic] = useState("Casual");

  const levels = [
    { id: "Beginner", desc: "A1—A2 · Foundational vocabulary & relaxed pacing" },
    { id: "Intermediate", desc: "B1—B2 · Everyday fluid conversational topics" },
    { id: "Advanced", desc: "C1—C2 · Complex discussions, nuance & debate" },
  ];

  const topics = [
    { id: "Casual", icon: "☕", label: "Casual Chit-Chat" },
    { id: "Business", icon: "💼", label: "Workplace & Professional" },
    { id: "Travel", icon: "✈️", label: "Travel & Culture" },
    { id: "Interview", icon: "🎯", label: "Job & Behavioral Interview" },
    { id: "Debate", icon: "⚖️", label: "Opinions & Polite Debate" },
  ];

  if (status === "loading") {
    return (
      <div className="rounded-[22px] bg-[#fcfbf8] border border-[#e8e6e1] p-12 text-center font-mono text-sm text-[#6a625a]">
        Connecting to matchmaking network...
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="rounded-[22px] bg-[#fcfbf8] border border-[#e8e6e1] p-12 text-center font-mono text-sm text-[#6a625a]">
        Please log in to enter matchmaking rooms.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* ── MAIN CONFIGURATION CARD ── */}
      <div className="rounded-[22px] bg-[#fcfbf8] border border-[#e8e6e1] p-8 sm:p-10 shadow-[0_1px_2px_rgba(60,48,30,.07),0_4px_8px_rgba(60,48,30,.07),0_12px_24px_rgba(60,48,30,.07)]">
        
        {/* HEADER */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="w-12 h-12 rounded-[8px] bg-[#f1efea] border border-[#e8e6e1] text-[#1d1c1a] flex items-center justify-center mx-auto mb-4">
            <Users size={22} />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#1d1c1a] tracking-tight">
            Configure Your Speaking Session
          </h2>
          <p className="text-sm text-[#5e5b55] mt-2 leading-relaxed">
            Choose your comfortable proficiency level and preferred topic. You will be matched with an active peer looking for the same practice.
          </p>
        </div>

        {/* OPTIONS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#e8e6e1]">
          {/* LEVEL SELECTION */}
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[#6a625a] block mb-2">
              Speaking Proficiency
            </span>

            <div className="space-y-2.5">
              {levels.map((l) => {
                const isSelected = level === l.id;
                return (
                  <button
                    key={l.id}
                    onClick={() => setLevel(l.id)}
                    className={`w-full p-4 rounded-[8px] text-left transition-all duration-150 border cursor-pointer ${
                      isSelected
                        ? "bg-[#f1efea] border-[#1d1c1a] shadow-sm text-[#1d1c1a]"
                        : "bg-[#f5f3ee] border-[#e8e6e1] text-[#5e5b55] hover:bg-[#ffffff] hover:text-[#1d1c1a]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-[#1d1c1a]">{l.id}</span>
                      {isSelected && (
                        <span className="w-4 h-4 rounded-full bg-[#1d1c1a] text-[#fbfaf7] flex items-center justify-center text-[10px]">
                          ✓
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-xs text-[#6a625a]">{l.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TOPIC SELECTION */}
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[#6a625a] block mb-2">
              Conversation Arena
            </span>

            <div className="space-y-2.5">
              {topics.map((t) => {
                const isSelected = topic === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTopic(t.id)}
                    className={`w-full p-3.5 rounded-[8px] flex items-center justify-between text-left transition-all duration-150 border cursor-pointer ${
                      isSelected
                        ? "bg-[#f1efea] border-[#1d1c1a] shadow-sm text-[#1d1c1a]"
                        : "bg-[#f5f3ee] border-[#e8e6e1] text-[#5e5b55] hover:bg-[#ffffff] hover:text-[#1d1c1a]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{t.icon}</span>
                      <span className="text-sm font-medium text-[#1d1c1a]">{t.label}</span>
                    </div>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-[#1d1c1a] text-[#fbfaf7] flex items-center justify-center text-[10px]">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* MATCH BUTTON */}
        <div className="mt-10 pt-8 border-t border-[#e8e6e1] flex flex-col items-center gap-3">
          <MatchButton
            level={level.toLowerCase()}
            topic={topic.toLowerCase()}
            userId={userId}
            label={`Search Partner (${level} · ${topic})`}
          />
          <p className="font-mono text-xs text-[#a39a8e]">
            Pressing search emits a realtime matchmaking ticket. You can cancel at any point.
          </p>
        </div>
      </div>

      {/* ── SAFETY CARD ── */}
      <div className="rounded-[16px] bg-[#99c1bb]/20 border border-[#99c1bb]/50 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-[6px] bg-[#99c1bb] text-[#1d1c1a] flex items-center justify-center shrink-0 shadow-sm">
            <Shield size={20} />
          </div>
          <div>
            <p className="font-semibold text-sm text-[#1d1c1a]">Community Moderation & Safety First</p>
            <p className="text-xs text-[#5e5b55] leading-relaxed">
              Every peer room is private and audio-only. Automated speech filters flag inappropriate interactions.
            </p>
          </div>
        </div>

        <a
          href="/dashboard/reports"
          className="font-mono text-xs text-[#1d1c1a] underline hover:text-[#b4400f] transition-colors shrink-0"
        >
          Community Guidelines →
        </a>
      </div>
    </div>
  );
}
