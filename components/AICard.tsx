"use client";

import { motion } from "framer-motion";
import { Mic } from "lucide-react";
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
    }, 25);

    return () => clearInterval(interval);
  }, []);
  const progress = text.length / sentence.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-3xl relative"
    >
      <div
        className="absolute inset-0 blur-3xl rounded-full transition-all duration-300"
        style={{
          background: `linear-gradient(to right, rgba(255,161,51,${0.2 + progress * 0.4}), rgba(165,187,252,${0.2 + progress * 0.4}))`,
        }}
      />

      {/* Card */}
      <div className="relative backdrop-blur-2xl bg-white/70 border border-white/40 rounded-3xl shadow-2xl p-6">

        {/* TOP */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">

            {/* Mic with pulse */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-orange-400/30 animate-ping" />
              <div className="w-10 h-10 rounded-full bg-[#FFA133]/20 flex items-center justify-center relative">
                <Mic size={18} className="text-[#FFA133]" />
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-800">
                NoJudgment.AI
              </p>
              <p className="text-sm text-gray-500">
                Listening...
              </p>
            </div>
          </div>

          {/* Waveform */}
          <div className="flex gap-1 items-end h-6">
            {[10, 16, 12, 20, 14].map((h, i) => (
              <motion.div
                key={i}
                animate={{ height: [h, h + 8, h] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  delay: i * 0.15,
                }}
                className="w-1.5 bg-orange-400 rounded-full"
                style={{ height: h }}
              />
            ))}
          </div>
        </div>

        {/* SPEECH */}
        <div className="bg-white rounded-xl px-5 py-4 text-gray-700 shadow-sm border border-gray-100 min-h-[60px]">
          {text}
          <span className="animate-pulse">|</span>
        </div>

        {/* FEEDBACK */}
        <div className="mt-4 flex items-center justify-between">

          {/* Suggestion */}
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
            ✔ Try saying "overall, the presentation... "
          </div>

          {/* Score */}
          <div className="text-sm font-semibold text-orange-500">
            Fluency 85%
          </div>
        </div>
      </div>
    </motion.div>
  );
}