"use client";

import { useEffect, useState } from "react";

interface HeatmapData {
  date: string;
  sessions: number;
  speakingSeconds: number;
}

async function fetchHeatmapData(): Promise<{ heatmap: HeatmapData[]; streak: number }> {
  try {
    const [heatRes, dashRes] = await Promise.all([
      fetch("/api/heatmap"),
      fetch("/api/dashboard"),
    ]);

    if (!heatRes.ok || !dashRes.ok) {
      throw new Error("Failed to fetch data");
    }

    const heatData = await heatRes.json();
    const dashData = await dashRes.json();

    return {
      heatmap: heatData.heatmap,
      streak: dashData.user.streak,
    };
  } catch (error) {
    console.error("Heatmap fetch error:", error);
    throw error;
  }
}

export default function Heatmap() {
  const [heatmap, setHeatmap] = useState<HeatmapData[]>([]);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initial load
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const { heatmap: heatData, streak: streakVal } = await fetchHeatmapData();
        setHeatmap(heatData);
        setStreak(streakVal);
        console.log(" Heatmap loaded");
      } catch (err) {
        setError("Failed to load heatmap");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // Auto-refetch when user returns to this page
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        console.log(" Heatmap: Page visible - auto-refreshing...");
        fetchHeatmapData()
          .then(({ heatmap: heatData, streak: streakVal }) => {
            setHeatmap(heatData);
            setStreak(streakVal);
            console.log(" Heatmap: Auto-refresh complete");
          })
          .catch((err) => console.error("Heatmap auto-refresh error:", err));
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  if (loading) return <div className="p-6">Loading heatmap...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Your Streak</h3>
        <span className="text-orange-500 font-semibold">
          ⚡ {streak} days
        </span>
      </div>

      {/* HEATMAP */}
      <div className="overflow-x-auto flex justify-end">
        <div className="grid grid-rows-7 grid-flow-col gap-1 w-max">
          {heatmap.map((d, i) => {
            let color = "bg-gray-100";

            if (d.sessions > 0) color = "bg-[#FFE2CC]";
            if (d.sessions > 2) color = "bg-[#FFB680]";
            if (d.sessions > 4) color = "bg-[#FFA133]";
            if (d.sessions > 6) color = "bg-[#3B5BFF]";

            return (
              <div
                key={i}
                className={`w-3 h-3 rounded-sm ${color}`}
                title={`${d.date} • ${d.sessions} sessions`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}