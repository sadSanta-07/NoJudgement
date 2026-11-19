"use client";

import { motion } from "framer-motion";
import { Mic, CheckCircle2, Sparkles, Volume2 } from "lucide-react";
import { useEffect, useState } from "react";

const sentence =
  "I think the, um, presentation went well, but I was nervous.";

export default function AICard() {
  const [text, setText] = useState("");

  // Typing effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(sentence.slice(0, i));
      i++;
      if (i > sentence.length) clearInterval(interval);
    }, 35);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="relative rounded-[22px] bg-[#fcfbf8] border border-[#e8e6e1] shadow-[0_1px_2px_rgba(60,48,30,.07),0_4px_8px_rgba(60,48,30,.07),0_12px_24px_rgba(60,48,30,.07)] p-6 sm:p-8 overflow-hidden text-left">
        
        {/* TOP STATUS BAR */}
        <div className="flex items-center justify-between border-b border-[#e8e6e1] pb-4 mb-6">
          <div className="flex items-center gap-3">
            {/* Tactile mic pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-[5px] bg-[#f1efea] border border-[#e8e6e1]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b4400f] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b4400f]" />
              </span>
              <Mic size={14} className="text-[#1d1c1a]" />
              <span className="font-mono text-xs font-medium text-[#1d1c1a]">Live Audio Stream</span>
            </div>
            <span className="font-mono text-xs text-[#6a625a] hidden sm:inline">48kHz WebRTC</span>
          </div>

          {/* Tactile Waveform Bars */}
          <div className="flex items-end gap-1 h-5 px-2 py-1 rounded-[5px] bg-[#f1efea] border border-[#e8e6e1]">
            {[10, 16, 12, 20, 14, 18, 9].map((h, i) => (
              <motion.div
                key={i}
                animate={{ height: [h, Math.max(6, (h * 1.4) % 20), h] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.1,
                  delay: i * 0.12,
                }}
                className="w-1 bg-[#1d1c1a] rounded-full"
                style={{ height: h }}
              />
            ))}
          </div>
        </div>

        {/* SPEECH TRANSCRIPT BOX */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs text-[#6a625a] uppercase tracking-wider">Spoken Input</span>
            <span className="font-mono text-xs text-[#a39a8e]">Transcription Delay: 120ms</span>
          </div>
          <div className="rounded-[8px] bg-[#f5f3ee] border border-[#e8e6e1] p-4 text-[#1d1c1a] text-lg font-normal leading-relaxed min-h-[64px] font-sans">
            {text}
            <span className="inline-block w-2 h-5 bg-[#b4400f] ml-1 translate-y-0.5 animate-pulse" />
          </div>
        </div>

        {/* FEEDBACK & DIAGNOSTIC CARD */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Diagnostic 1: Fluency */}
          <div className="rounded-[8px] p-3.5 bg-[#f1efea] border border-[#e8e6e1] flex flex-col justify-between">
            <span className="font-mono text-[11px] text-[#6a625a] uppercase">Fluency Score</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-display text-2xl font-normal text-[#1d1c1a]">88%</span>
              <span className="font-mono text-xs text-[#1e5d36] font-medium">+4% wk</span>
            </div>
          </div>

          {/* Diagnostic 2: Filler Words */}
          <div className="rounded-[8px] p-3.5 bg-[#f1efea] border border-[#e8e6e1] flex flex-col justify-between">
            <span className="font-mono text-[11px] text-[#6a625a] uppercase">Filler Detection</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-display text-2xl font-normal text-[#b4400f]">1</span>
              <span className="font-mono text-xs text-[#6a625a]">(&ldquo;um&rdquo;)</span>
            </div>
          </div>

          {/* Diagnostic 3: AI Advice */}
          <div className="rounded-[8px] p-3.5 bg-[#d9b3a9]/40 border border-[#d9b3a9] flex flex-col justify-between sm:col-span-1">
            <span className="font-mono text-[11px] text-[#1d1c1a] uppercase font-semibold">Suggested Refinement</span>
            <p className="text-xs text-[#1d1c1a] mt-1 font-medium leading-snug">
              &ldquo;Overall, the presentation went smoothly...&rdquo;
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
