"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Zap, AlertCircle, CheckCircle, Clock } from "lucide-react";

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
        // ✅ PRIMARY: sessionStorage (instant + accurate)
        const stored = sessionStorage.getItem("callAnalysis");
        const dur = sessionStorage.getItem("callDuration");

        if (stored) {
          setAnalysis(JSON.parse(stored));
          if (dur) setDuration(Number(dur));
          setLoading(false);
          return;
        }

        // ✅ FALLBACK: backend (refresh-safe)
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
    if (!analysis) return "Session";
    const avg =
      (analysis.fluency + analysis.clarity + analysis.helpfulness) / 3;

    if (avg >= 8) return "Excellent";
    if (avg >= 6) return "Great";
    return "Good";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F5F7FB]">
        <p className="text-gray-500">Loading your session...</p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F5F7FB]">
        <p className="text-gray-500">No session data found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FB] p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-[#FFA133] to-[#6F8EF6] rounded-3xl p-6 flex items-center gap-4 text-white shadow-md"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap size={36} />
          </motion.div>

          <div>
            <h1 className="text-3xl font-bold">
              {getSessionQuality()} Session!
            </h1>
            <p className="text-white/80 text-sm">
              You're improving steadily 🚀
            </p>
          </div>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-6 gap-4">

          {/* DURATION */}
          <div className="col-span-3 bg-white rounded-2xl p-6 border">
            <div className="flex items-center gap-2 text-gray-500 mb-3">
              <Clock size={16} />
              <p className="text-xs uppercase">Duration</p>
            </div>
            <p className="text-5xl font-bold text-[#131313]">
              {formatTime(duration)}
            </p>
          </div>

          {/* FILLER WORDS */}
          <div className="col-span-3 bg-white rounded-2xl p-6 border">
            <p className="text-xs uppercase text-gray-500 mb-3">
              Filler Words
            </p>
            <p className="text-5xl font-bold text-[#CC7A1F]">
              {analysis.fillerWords}
            </p>
          </div>

          {/* SCORES */}
          {[
            { label: "Fluency", value: analysis.fluency, color: "#CC7A1F" },
            { label: "Clarity", value: analysis.clarity, color: "#6F8EF6" },
            { label: "Engagement", value: analysis.helpfulness, color: "#2A2A2A" },
          ].map((item) => (
            <div key={item.label} className="col-span-2 bg-white rounded-2xl p-4 border">
              <p className="text-xs text-gray-500 uppercase mb-2">
                {item.label}
              </p>

              <p className="text-4xl font-bold text-[#131313]">
                {item.value}
              </p>

              <div className="mt-3 h-2 bg-gray-100 rounded-full">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value * 10}%` }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* FEEDBACK SECTION */}
        <div className="grid grid-cols-3 gap-4">

          <div className="bg-white p-4 rounded-xl border-l-4 border-[#CC7A1F] shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={16} className="text-[#CC7A1F]" />
              <p className="text-xs font-bold uppercase">Strong Point</p>
            </div>
            <p className="text-sm text-gray-600">
              {analysis.strongPoints}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border-l-4 border-[#FFA133] shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={16} className="text-[#FFA133]" />
              <p className="text-xs font-bold uppercase">Improve</p>
            </div>
            <p className="text-sm text-gray-600">
              {analysis.improvePoints}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border-l-4 border-[#6F8EF6] shadow-sm">
            <p className="text-xs uppercase text-gray-500 mb-2">
              Feedback
            </p>
            <p className="text-sm text-gray-600">
              {analysis.feedback}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center pt-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="px-14 py-3 rounded-full font-semibold text-lg text-white
                       bg-gradient-to-r from-[#FFA133] to-[#6F8EF6]
                       hover:scale-105 hover:shadow-lg transition-all"
          >
            Back to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}