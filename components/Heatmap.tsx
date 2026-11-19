"use client";

import { useEffect, useState } from "react";
import { Flame } from "lucide-react";

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
      return { heatmap: [], streak: 0 };
    }

    const heatData = await heatRes.json();
    const dashData = await dashRes.json();

    return {
      heatmap: heatData.heatmap || [],
      streak: dashData.user?.streak || 0,
    };
  } catch (error) {
    return { heatmap: [], streak: 0 };
  }
}

export default function Heatmap() {
  const [heatmap, setHeatmap] = useState<HeatmapData[]>([]);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const { heatmap: heatData, streak: streakVal } = await fetchHeatmapData();
        setHeatmap(heatData);
        setStreak(streakVal);
      } catch (err) {
        setError("Failed to load heatmap");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchHeatmapData()
          .then(({ heatmap: heatData, streak: streakVal }) => {
            setHeatmap(heatData);
            setStreak(streakVal);
          })
          .catch((err) => console.error("Heatmap auto-refresh error:", err));
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  if (loading) {
    return (
      <div className="rounded-[22px] bg-[#fcfbf8] border border-[#e8e6e1] p-6 text-sm text-[#6a625a] font-mono">
        Loading habit heatmap...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[22px] bg-[#fcfbf8] border border-red-200 p-6 text-sm text-red-600 font-mono">
        {error}
      </div>
    );
  }

  return (
    <div className="rounded-[22px] bg-[#fcfbf8] border border-[#e8e6e1] p-6 sm:p-7 shadow-[0_1px_2px_rgba(60,48,30,.07),0_4px_8px_rgba(60,48,30,.07)]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-display text-2xl font-normal text-[#1d1c1a]">
            Speaking Consistency
          </h3>
          <p className="text-xs text-[#6a625a] mt-0.5 font-mono">
            Daily practice sessions recorded across the year
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] bg-[#f1efea] border border-[#e8e6e1]">
          <Flame size={14} className="text-[#b4400f] fill-[#b4400f]" />
          <span className="font-mono text-xs font-semibold text-[#1d1c1a]">
            {streak} Day Streak
          </span>
        </div>
      </div>

      {/* HEATMAP GRID */}
      <div className="overflow-x-auto pb-2">
        <div className="grid grid-rows-7 grid-flow-col gap-1.5 w-max">
          {heatmap.map((d, i) => {
            let color = "bg-[#f5f3ee] border border-[#e8e6e1]";

            if (d.sessions > 0) color = "bg-[#d9b3a9] border border-[#cca196]";
            if (d.sessions > 2) color = "bg-[#c9bcd6] border border-[#bcaecb]";
            if (d.sessions > 4) color = "bg-[#99c1bb] border border-[#88b3ac]";
            if (d.sessions > 6) color = "bg-[#1d1c1a] border border-[#1d1c1a]";

            return (
              <div
                key={i}
                className={`w-3.5 h-3.5 rounded-[3px] transition-all hover:scale-125 cursor-pointer ${color}`}
                title={`${d.date} • ${d.sessions} session${d.sessions === 1 ? "" : "s"} (${Math.round(d.speakingSeconds / 60)} min)`}
              />
            );
          })}
        </div>
      </div>

      {/* HEATMAP LEGEND */}
      <div className="flex items-center justify-between pt-4 mt-2 border-t border-[#e8e6e1] text-xs font-mono text-[#6a625a]">
        <span>Less active</span>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-[3px] bg-[#f5f3ee] border border-[#e8e6e1]" />
          <span className="w-3 h-3 rounded-[3px] bg-[#d9b3a9] border border-[#cca196]" />
          <span className="w-3 h-3 rounded-[3px] bg-[#c9bcd6] border border-[#bcaecb]" />
          <span className="w-3 h-3 rounded-[3px] bg-[#99c1bb] border border-[#88b3ac]" />
          <span className="w-3 h-3 rounded-[3px] bg-[#1d1c1a] border border-[#1d1c1a]" />
        </div>
        <span>More active</span>
      </div>
    </div>
  );
}
