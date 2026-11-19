"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Zap, AlertCircle, CheckCircle2, Clock, Sparkles, ArrowRight } from "lucide-react";

interface Analysis {
  fluency: number;
  clarity: number;
  helpfulness: number;
  fillerWords: number;
  feedback: string;
  strongPoints: string;
  improvePoints: string;
  durationSecs?: number;
  createdAt?: string;
}

export default function PostCallPage() {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const stored = sessionStorage.getItem("callAnalysis");
        const dur = sessionStorage.getItem("callDuration");

        if (stored) {
          setAnalysis(JSON.parse(stored));
          if (dur) setDuration(Number(dur));
          setLoading(false);
          return;
        }

        const res = await fetch("/api/dashboard");
        const data = await res.json();

        if (data?.recentSessions?.length > 0) {
          const latest = data.recentSessions[0];

          setAnalysis({
            fluency: latest.fluency,
            clarity: latest.clarity,
            helpfulness: latest.helpfulness,
            fillerWords: latest.fillerWords || 0,
            feedback: latest.feedback,
            strongPoints: latest.strongPoints || "",
            improvePoints: latest.improvePoints || "",
            durationSecs: latest.durationSecs,
            createdAt: latest.createdAt,
          });

          setDuration(latest.durationSecs || 0);
        }
      } catch (err) {
        console.error("Failed to load analysis:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const getSessionQuality = () => {
    if (!analysis) return "Productive";
    const avg =
      (analysis.fluency + analysis.clarity + analysis.helpfulness) / 3;

    if (avg >= 8) return "Exceptional";
    if (avg >= 6) return "Great";
    return "Promising";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f5f1] flex items-center justify-center p-6">
        <p className="font-mono text-sm text-[#6a625a]">
          Synthesizing your conversation diagnostic...
        </p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-[#f6f5f1] flex flex-col items-center justify-center p-6 gap-4">
        <p className="font-mono text-sm text-[#6a625a]">No session data found.</p>
        <button
          onClick={() => router.push("/dashboard")}
          className="px-5 py-2.5 rounded-[5px] bg-[#1d1c1a] text-[#fbfaf7] text-xs font-mono"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f5f1] text-[#1d1c1a] bg-tactile-dots py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* ── HEADER BANNER ── */}
        <div className="rounded-[22px] bg-[#fcfbf8] border border-[#e8e6e1] p-8 sm:p-10 shadow-[0_1px_2px_rgba(60,48,30,.07),0_4px_8px_rgba(60,48,30,.07)] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[5px] bg-[#f1efea] border border-[#e8e6e1] font-mono text-xs text-[#1d1c1a]">
              <Sparkles size={13} className="text-[#b4400f]" />
              <span>Session Completed</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-normal text-[#1d1c1a] tracking-tight">
              {getSessionQuality()} Speaking Session!
            </h1>
            <p className="text-sm text-[#5e5b55] leading-relaxed">
              Every sentence spoken builds auditory muscle and linguistic confidence.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => router.push("/dashboard")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[5px] bg-[#1d1c1a] text-[#fbfaf7] text-sm font-medium hover:bg-[#2c2a26] transition-all cursor-pointer shadow-sm active:translate-y-[1px]"
            >
              <span>Back to Dashboard</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* ── METRIC TILES ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-[16px] bg-[#fcfbf8] border border-[#e8e6e1] shadow-sm">
            <span className="font-mono text-xs uppercase text-[#6a625a] block mb-1">Duration</span>
            <p className="font-display text-3xl font-normal text-[#1d1c1a]">{formatTime(duration)}</p>
            <span className="font-mono text-[10px] text-[#a39a8e] mt-1 block">Live peer dialogue</span>
          </div>

          <div className="p-5 rounded-[16px] bg-[#fcfbf8] border border-[#e8e6e1] shadow-sm">
            <span className="font-mono text-xs uppercase text-[#6a625a] block mb-1">Fluency</span>
            <p className="font-display text-3xl font-normal text-[#1d1c1a]">{analysis.fluency} <span className="text-lg text-[#6a625a]">/ 10</span></p>
            <span className="font-mono text-[10px] text-[#a39a8e] mt-1 block">Rhythm & continuity</span>
          </div>

          <div className="p-5 rounded-[16px] bg-[#fcfbf8] border border-[#e8e6e1] shadow-sm">
            <span className="font-mono text-xs uppercase text-[#6a625a] block mb-1">Clarity</span>
            <p className="font-display text-3xl font-normal text-[#1d1c1a]">{analysis.clarity} <span className="text-lg text-[#6a625a]">/ 10</span></p>
            <span className="font-mono text-[10px] text-[#a39a8e] mt-1 block">Enunciation & cadence</span>
          </div>

          <div className="p-5 rounded-[16px] bg-[#fcfbf8] border border-[#e8e6e1] shadow-sm">
            <span className="font-mono text-xs uppercase text-[#6a625a] block mb-1">Filler Words</span>
            <p className="font-display text-3xl font-normal text-[#b4400f]">{analysis.fillerWords}</p>
            <span className="font-mono text-[10px] text-[#a39a8e] mt-1 block">&ldquo;um&rdquo;, &ldquo;ah&rdquo;, &ldquo;like&rdquo;</span>
          </div>
        </div>

        {/* ── DETAILED DIAGNOSTIC FEEDBACK ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Strong Point */}
          <div className="p-6 rounded-[18px] bg-[#99c1bb]/20 border border-[#99c1bb]/50 space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-[#1e5d36]" />
              <span className="font-mono text-xs uppercase tracking-wider text-[#1d1c1a] font-semibold">
                What Stood Out
              </span>
            </div>
            <p className="text-sm text-[#1d1c1a] leading-relaxed">
              {analysis.strongPoints || "Great pacing and active listening throughout the dialogue."}
            </p>
          </div>

          {/* Area to Polish */}
          <div className="p-6 rounded-[18px] bg-[#d9b3a9]/25 border border-[#d9b3a9]/60 space-y-3">
            <div className="flex items-center gap-2">
              <AlertCircle size={18} className="text-[#b4400f]" />
              <span className="font-mono text-xs uppercase tracking-wider text-[#1d1c1a] font-semibold">
                Area to Polish
              </span>
            </div>
            <p className="text-sm text-[#1d1c1a] leading-relaxed">
              {analysis.improvePoints || "Practice phrasing thoughts before speaking to decrease pauses."}
            </p>
          </div>

          {/* Holistic AI Feedback */}
          <div className="p-6 rounded-[18px] bg-[#c9bcd6]/25 border border-[#c9bcd6]/60 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-[#1d1c1a]" />
              <span className="font-mono text-xs uppercase tracking-wider text-[#1d1c1a] font-semibold">
                Coach Synthesis
              </span>
            </div>
            <p className="text-sm text-[#1d1c1a] leading-relaxed">
              {analysis.feedback || "Consistent progress. Continue attending daily conversations."}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
