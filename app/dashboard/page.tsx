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

  // Initial load
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const dashboardData = await fetchDashboardData();
        setData(dashboardData);
        console.log(" Dashboard loaded");
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load dashboard";
        setError(message);
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // Auto-refetch when user returns to this page (after a call)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        console.log(" Dashboard: Page visible - auto-refreshing...");
        fetchDashboardData()
          .then((dashboardData) => {
            setData(dashboardData);
            console.log(" Dashboard: Auto-refresh complete");
          })
          .catch((err) => console.error("Dashboard auto-refresh error:", err));
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  if (loading) return <p className="p-10">Loading...</p>;

  if (error)
    return (
      <div className="p-10 bg-red-50 text-red-700 rounded-lg">
        <p>Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
        >
          Retry
        </button>
      </div>
    );

  if (!data) return <p className="p-10">No data available</p>;

  const minutes = Math.floor(data.stats.totalSpeakingSeconds / 60);

  return (
    <div className="p-6 md:p-10 space-y-8 bg-[#f7f7fb] min-h-screen">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#FFA133] to-[#3B5BFF] rounded-3xl p-8 text-white shadow-lg">
        <div>
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {data.user.name}
          </h2>
          <p className="text-white/80">
            You've spoken {minutes} minutes so far. Keep going.
          </p>
        </div>

        <div className="mt-5">
          <MatchButton
            level="Intermediate"
            topic="Debate"
            userId={data.user.name}
            label="Start a Session"
          />
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
              : data.stats.avgEnglishScore > 60
              ? "Medium"
              : "Low"
          }
        />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {/* HEATMAP COMPONENT */}
          <Heatmap />

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* FOCUS AREAS COMPONENT */}
          <FocusAreas
            weakAreas={data.stats.weakAreas}
            avgFluency={data.stats.avgFluency}
            avgClarity={data.stats.avgClarity}
            avgEnglishScore={data.stats.avgEnglishScore}
            avgFillerWords={data.stats.avgFillerWords}
          />

          {/* RECENT SESSIONS */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border">
            <h3 className="text-lg font-semibold mb-6">
              Recent Sessions
            </h3>

            {data.recentSessions.length === 0 ? (
              <p className="text-gray-400 text-sm">
                No sessions yet
              </p>
            ) : (
              data.recentSessions.map((s, i) => (
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
                      <p className="text-xs text-gray-500">
                        Speaking • {Math.round(s.durationSecs / 60)}m ago
                      </p>
                    </div>
                  </div>

                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    s.helpfulness > 7
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {s.helpfulness > 7 ? "Adv" : "Int"}
                  </span>
                </div>
              ))
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
    <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
      <div className="mb-2 flex justify-center text-blue-500">
        {icon}
      </div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
