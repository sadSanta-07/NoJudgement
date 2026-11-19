"use client";

import { useEffect, useState } from "react";
import MatchButton from "@/components/MatchButton";
import Heatmap from "@/components/Heatmap";
import FocusAreas from "@/components/FocusAreas";
import {
  TrendingUp,
  Clock,
  Target,
  Sparkles,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

interface User {
  name: string;
  image: string;
  points: number;
  streak: number;
}

interface Stats {
  totalSessions: number;
  totalSpeakingSeconds: number;
  avgFluency: number;
  avgClarity: number;
  avgEnglishScore: number;
  avgFillerWords: number;
  weakAreas: string[];
}

interface RecentSession {
  id: string;
  fluency: number;
  clarity: number;
  helpfulness: number;
  durationSecs: number;
  feedback: string;
  englishScore: number;
  createdAt: string;
}

interface RecentTransaction {
  id: string;
  amount: number;
  reason: string;
  createdAt: string;
}

interface DashboardResponse {
  user: User;
  stats: Stats;
  graphData: any[];
  recentSessions: RecentSession[];
  recentTransactions: RecentTransaction[];
}

const quotes = [
  {
    text: "Small, consistent practice every day yields enduring conversational fluency.",
    subtext: "Show up today. Fear no mistake.",
  },
  {
    text: "Confidence is not the absence of hesitation, but the willingness to speak through it.",
    subtext: "Imperfections are the stepping stones of mastery.",
  },
  {
    text: "Fluency is earned sentence by sentence, conversation by conversation.",
    subtext: "One deliberate session at a time.",
  },
  {
    text: "Every dialogue sharpens your pronunciation and expands your vocabulary.",
    subtext: "Speak more. Overthink less.",
  },
  {
    text: "Your future bilingual self will thank you for practicing today.",
    subtext: "Trust the compound interest of consistency.",
  },
];

async function fetchDashboardData(): Promise<DashboardResponse> {
  const response = await fetch("/api/dashboard");

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Initial Load
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const dashboardData = await fetchDashboardData();
        setData(dashboardData);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load dashboard";
        setError(message);
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    load();

    // Quote Logic
    const savedHour = localStorage.getItem("quoteHour");
    const currentHour = new Date().getHours();

    if (!savedHour || Number(savedHour) !== currentHour) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      localStorage.setItem("quoteHour", currentHour.toString());
      localStorage.setItem("quoteIndex", randomIndex.toString());
      setQuoteIndex(randomIndex);
    } else {
      const savedIndex = localStorage.getItem("quoteIndex");
      setQuoteIndex(savedIndex ? Number(savedIndex) : 0);
    }
  }, []);

  // Auto Refetch on Visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchDashboardData()
          .then((dashboardData) => setData(dashboardData))
          .catch((err) => console.error("Dashboard auto-refresh error:", err));
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  if (loading) {
    return (
      <div className="rounded-[22px] bg-[#fcfbf8] border border-[#e8e6e1] p-12 text-center">
        <p className="font-mono text-sm text-[#6a625a]">
          Loading speaking studio analytics...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[22px] bg-[#fcfbf8] border border-red-200 p-8 text-center space-y-4">
        <p className="font-mono text-sm text-red-600">Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 rounded-[5px] bg-[#1d1c1a] text-[#fbfaf7] text-xs font-mono"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-[22px] bg-[#fcfbf8] border border-[#e8e6e1] p-10 text-center font-mono text-sm text-[#6a625a]">
        No user profile data available.
      </div>
    );
  }

  const minutes = Math.floor(data.stats.totalSpeakingSeconds / 60);

  return (
    <div className="space-y-8">
      {/* ──────────────── HERO ACTION BANNER ──────────────── */}
      <div className="rounded-[22px] bg-[#fcfbf8] border border-[#e8e6e1] p-8 sm:p-10 shadow-[0_1px_2px_rgba(60,48,30,.07),0_4px_8px_rgba(60,48,30,.07)] flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden">
        {/* Subtle decorative dot pattern overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-tactile-dots opacity-40 pointer-events-none hidden md:block" />

        <div className="max-w-xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-[#f1efea] border border-[#e8e6e1] font-mono text-xs text-[#1d1c1a]">
            <Sparkles size={13} className="text-[#b4400f]" />
            <span>Ready for your daily practice</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#1d1c1a] tracking-tight leading-tight">
            You&apos;re getting closer to natural fluency!
          </h2>

          <p className="text-sm sm:text-base text-[#5e5b55] leading-relaxed">
            You have practiced for{" "}
            <span className="font-mono font-semibold text-[#1d1c1a]">
              {minutes} minutes
            </span>{" "}
            across{" "}
            <span className="font-mono font-semibold text-[#1d1c1a]">
              {data.stats.totalSessions} sessions
            </span>
            . Connect with a live partner to keep building conversational muscle.
          </p>
        </div>

        <div className="relative z-10 shrink-0">
          <MatchButton
            level="Intermediate"
            topic="Casual"
            userId={data.user.name}
            label="Start Practice Session"
          />
        </div>
      </div>

      {/* ──────────────── TOP THREE METRICS ──────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatTile
          icon={<Clock size={20} />}
          label="Total Speaking Time"
          value={`${minutes} min`}
          helper={`${data.stats.totalSessions} completed conversations`}
        />

        <StatTile
          icon={<TrendingUp size={20} />}
          label="Average Fluency"
          value={`${Math.round(data.stats.avgFluency * 10)}%`}
          helper="Measured by pacing & continuous speech"
        />

        <StatTile
          icon={<Target size={20} />}
          label="Confidence Level"
          value={
            data.stats.avgEnglishScore > 80
              ? "High"
              : data.stats.avgEnglishScore > 60
              ? "Steady"
              : "Developing"
          }
          helper={`English consistency: ${data.stats.avgEnglishScore || 85}%`}
        />
      </div>

      {/* ──────────────── TWO COLUMN BODY GRID ──────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* LEFT COLUMN: HEATMAP & MOTIVATION QUOTE */}
        <div className="lg:col-span-2 space-y-6">
          <Heatmap />

          {/* EDITORIAL QUOTE CARD */}
          <div className="rounded-[22px] bg-[#f5f3ee] border border-[#e8e6e1] p-7 sm:p-8 relative">
            <span className="font-display text-5xl leading-none text-[#d9b3a9] block mb-2 font-normal select-none">
              &ldquo;
            </span>
            <p className="font-display text-xl sm:text-2xl font-normal italic text-[#1d1c1a] leading-relaxed">
              {quotes[quoteIndex].text}
            </p>
            <p className="font-mono text-xs text-[#6a625a] mt-4 flex items-center gap-1.5">
              <span>—</span>
              <span>{quotes[quoteIndex].subtext}</span>
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: FOCUS AREAS & RECENT SESSIONS */}
        <div className="space-y-6">
          <FocusAreas
            weakAreas={data.stats.weakAreas}
            avgFluency={data.stats.avgFluency}
            avgClarity={data.stats.avgClarity}
            avgEnglishScore={data.stats.avgEnglishScore}
            avgFillerWords={data.stats.avgFillerWords}
          />

          {/* RECENT SESSIONS LIST */}
          <div className="rounded-[22px] bg-[#fcfbf8] border border-[#e8e6e1] p-6 sm:p-7 shadow-[0_1px_2px_rgba(60,48,30,.07),0_4px_8px_rgba(60,48,30,.07)]">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-xl font-normal text-[#1d1c1a]">
                Recent Sessions
              </h3>
              <span className="font-mono text-xs text-[#6a625a]">
                {data.recentSessions.length} total
              </span>
            </div>

            {data.recentSessions.length === 0 ? (
              <p className="font-mono text-xs text-[#a39a8e] py-6 text-center">
                No past speaking sessions recorded yet. Start your first session above!
              </p>
            ) : (
              <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                {data.recentSessions.map((session, i) => (
                  <div
                    key={session.id || i}
                    className="p-3.5 rounded-[10px] bg-[#f5f3ee] border border-[#e8e6e1] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-[5px] bg-[#1d1c1a] text-[#fbfaf7] font-display text-xs flex items-center justify-center font-normal">
                        {data.user.name?.charAt(0) || "U"}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#1d1c1a]">
                          {Math.round(session.durationSecs / 60) || 1} min practice
                        </p>
                        <p className="font-mono text-[11px] text-[#6a625a]">
                          Fluency: {Math.round(session.fluency * 10)}%
                        </p>
                      </div>
                    </div>

                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded-[4px] border ${
                        session.helpfulness > 7
                          ? "bg-[#d8eedf] text-[#1e5d36] border-[#b7dfc3]"
                          : "bg-[#f1efea] text-[#1d1c1a] border-[#e8e6e1]"
                      }`}
                    >
                      {session.helpfulness > 7 ? "High Growth" : "Practice"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatTile({
  icon,
  label,
  value,
  helper,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <div className="rounded-[22px] bg-[#fcfbf8] border border-[#e8e6e1] p-6 shadow-[0_1px_2px_rgba(60,48,30,.07),0_4px_8px_rgba(60,48,30,.07)] flex flex-col justify-between hover:-translate-y-0.5 transition-all duration-150">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-xs text-[#6a625a] uppercase tracking-wider">
          {label}
        </span>
        <div className="w-8 h-8 rounded-[6px] bg-[#f1efea] border border-[#e8e6e1] text-[#1d1c1a] flex items-center justify-center">
          {icon}
        </div>
      </div>

      <div>
        <p className="font-display text-3xl sm:text-4xl font-normal text-[#1d1c1a]">
          {value}
        </p>
        <p className="font-mono text-[11px] text-[#a39a8e] mt-1.5">{helper}</p>
      </div>
    </div>
  );
}
