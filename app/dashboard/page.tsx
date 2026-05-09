"use client";

import { useEffect, useState } from "react";
import MatchButton from "@/components/MatchButton";
import Heatmap from "@/components/Heatmap";
import FocusAreas from "@/components/FocusAreas";
import {
  TrendingUp,
  Clock,
  Target,
} from "lucide-react";

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
    text: "Small progress every day leads to big results.",
    subtext: "Keep showing up. Fluency is built daily.",
  },
  {
    text: "Confidence grows every time you speak.",
    subtext: "Even imperfect practice counts.",
  },
  {
    text: "Fluency is earned through consistency.",
    subtext: "One session at a time.",
  },
  {
    text: "Every conversation sharpens your skills.",
    subtext: "Speak more. Fear less.",
  },
  {
    text: "Your future self will thank you for practicing today.",
    subtext: "Stay consistent and trust the process.",
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
  const [data, setData] =
    useState<DashboardResponse | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(
    null
  );

  const [quoteIndex, setQuoteIndex] = useState(0);

  // Initial Load
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const dashboardData =
          await fetchDashboardData();

        setData(dashboardData);

        console.log("Dashboard loaded");
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to load dashboard";

        setError(message);

        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    load();

    // Quote Logic
    const savedHour =
      localStorage.getItem("quoteHour");

    const currentHour =
      new Date().getHours();

    if (
      !savedHour ||
      Number(savedHour) !== currentHour
    ) {
      const randomIndex = Math.floor(
        Math.random() * quotes.length
      );

      localStorage.setItem(
        "quoteHour",
        currentHour.toString()
      );

      localStorage.setItem(
        "quoteIndex",
        randomIndex.toString()
      );

      setQuoteIndex(randomIndex);
    } else {
      const savedIndex =
        localStorage.getItem("quoteIndex");

      setQuoteIndex(
        savedIndex ? Number(savedIndex) : 0
      );
    }
  }, []);

  // Auto Refetch
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "visible"
      ) {
        console.log(
          "Dashboard visible - auto-refreshing..."
        );

        fetchDashboardData()
          .then((dashboardData) => {
            setData(dashboardData);

            console.log(
              "Dashboard auto-refresh complete"
            );
          })
          .catch((err) =>
            console.error(
              "Dashboard auto-refresh error:",
              err
            )
          );
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () =>
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
  }, []);

  if (loading)
    return <p className="p-10">Loading...</p>;

  if (error)
    return (
      <div className="p-10 bg-red-50 text-red-700 rounded-lg">
        <p>Error: {error}</p>

        <button
          onClick={() =>
            window.location.reload()
          }
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
        >
          Retry
        </button>
      </div>
    );

  if (!data)
    return (
      <p className="p-10">
        No data available
      </p>
    );

  const minutes = Math.floor(
    data.stats.totalSpeakingSeconds / 60
  );

  return (
    <div className="p-6 md:p-10 space-y-8 bg-[#f7f7fb] min-h-screen">

      {/* HEADER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#FF8A3D] via-[#B39BC8] to-[#3B6CFF] rounded-[32px] p-8 md:p-10 text-white shadow-lg min-h-[280px] flex items-center">

        {/* Glow Circle */}
        <div className="absolute right-[-80px] top-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-white/15" />

        <div className="relative z-10 max-w-2xl">

          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">
            You're getting closer to
            fluency!
          </h2>

          <p className="text-white/85 text-lg md:text-xl leading-relaxed max-w-xl">
            You've spoken for {minutes}{" "}
            minutes so far. Keep hitting
            your daily speaking goal.
          </p>
          
          <div className="mt-2">
            <MatchButton
              level="Intermediate"
              topic="Debate"
              userId={data.user.name}
              label="Start a Session"
            />
          </div>
        </div>
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <StatCard
          icon={<Clock />}
          label="Speaking Time"
          value={`${minutes}m`}
        />

        <StatCard
          icon={<TrendingUp />}
          label="Fluency Score"
          value={data.stats.avgFluency.toString()}
        />

        <StatCard
          icon={<Target />}
          label="Confidence"
          value={
            data.stats.avgEnglishScore > 85
              ? "High"
              : data.stats.avgEnglishScore >
                60
              ? "Medium"
              : "Low"
          }
        />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">

        {/* LEFT */}
        <div className="xl:col-span-2 space-y-6">

          {/* HEATMAP */}
          <Heatmap />

          {/* MOTIVATION CARD */}
          <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100 min-h-[170px] flex items-center">

            <div className="flex gap-5 items-start">

              <div className="text-6xl text-[#6D5DFC] font-bold leading-none">
                “
              </div>

              <div>
                <p className="text-2xl md:text-3xl font-semibold text-gray-800 italic leading-relaxed">
                  {
                    quotes[quoteIndex]
                      .text
                  }
                </p>

                <p className="text-sm text-gray-400 mt-4">
                  {
                    quotes[quoteIndex]
                      .subtext
                  }
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-6 h-full flex flex-col">

          {/* FOCUS AREAS */}
          <div className="flex-1">
            <FocusAreas
              weakAreas={
                data.stats.weakAreas
              }
              avgFluency={
                data.stats.avgFluency
              }
              avgClarity={
                data.stats.avgClarity
              }
              avgEnglishScore={
                data.stats
                  .avgEnglishScore
              }
              avgFillerWords={
                data.stats
                  .avgFillerWords
              }
            />
          </div>

          {/* RECENT SESSIONS */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border flex-1">

            <h3 className="text-lg font-semibold mb-6">
              Recent Sessions
            </h3>

            {data.recentSessions.length === 0 ? (
              <p className="text-gray-400 text-sm">
                No sessions yet
              </p>
            ) : (

              <div className="max-h-[190px] overflow-y-auto pr-2">

                {data.recentSessions.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between mb-5 pb-5 border-b last:border-b-0"
                  >
                    <div className="flex items-center gap-3 flex-1">

                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                        {data.user.name?.charAt(0) || "U"}
                      </div>

                      <div className="flex-1">
                        <p className="font-medium text-gray-800">
                          {data.user.name}
                        </p>

                        {/* <p className="text-xs text-gray-500">
                          Speaking •{" "}
                          {Math.round(s.durationSecs / 60)}m ago
                        </p> */}
                      </div>
                    </div>

                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        s.helpfulness > 7
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {s.helpfulness > 7 ? "Adv" : "Int"}
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

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center min-h-[160px] flex flex-col justify-center">

      <div className="mb-4 flex justify-center">
        <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
          {icon}
        </div>
      </div>

      <p className="text-sm text-gray-400">
        {label}
      </p>

      <p className="text-3xl font-bold mt-2 text-gray-900">
        {value}
      </p>
    </div>
  );
}