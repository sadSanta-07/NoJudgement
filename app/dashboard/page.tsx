"use client";

import { useEffect, useState } from "react";
import MatchButton from "@/components/MatchButton";
import {
  TrendingUp,
  Clock,
  Target,
  BookOpen,
} from "lucide-react";

interface DashboardData {
  user: {
    name: string;
    image: string;
    points: number;
    streak: number;
  };
  stats: {
    totalSessions: number;
    totalSpeakingSeconds: number;
    avgFluency: number;
    avgClarity: number;
    avgEnglishScore: number;
    avgFillerWords: number;
    weakAreas: string[];
  };
  recentSessions: any[];
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [heatmap, setHeatmap] = useState<any[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      const [d, h] = await Promise.all([
        fetch("/api/dashboard"),
        fetch("/api/heatmap"),
      ]);

      const dash = await d.json();
      const heat = await h.json();

      setData(dash);
      setHeatmap(heat.heatmap);
    };

    fetchAll();
  }, []);

  if (!data) return <p className="p-10">Loading...</p>;

  const hours = (data.stats.totalSpeakingSeconds / 3600).toFixed(1);

  return (
    <div className="p-6 md:p-10 space-y-8 bg-[#f7f7fb] min-h-screen">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#FFA133] to-[#3B5BFF] rounded-3xl p-8 text-white shadow-lg">
        <h2 className="text-3xl font-bold mb-2">
          Welcome back, {data.user.name}
        </h2>
        <p className="text-white/80">
          You've spoken {hours} hours so far. Keep going.
        </p>

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
          value={`${hours}h`}
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

          {/* STREAK + HEATMAP */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Your Streak</h3>
              <span className="text-orange-500 font-semibold">
                ⚡ {data.user.streak} days
              </span>
            </div>

            {/* FIXED HEATMAP */}
            <div className="overflow-x-auto">
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

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* FOCUS AREAS */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <BookOpen className="mr-2 text-blue-500" />
              Focus Areas
            </h3>

            {data.stats.weakAreas.length === 0 ? (
              <p className="text-sm text-gray-400">
                No major weaknesses detected 🎉
              </p>
            ) : (
              data.stats.weakAreas.map((area, i) => (
                <div key={i} className="mb-3">
                  <p className="text-sm font-medium">{area}</p>
                  <div className="h-2 bg-gray-100 rounded-full mt-1">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: "60%" }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* RECENT SESSIONS */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">
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
                  className="flex justify-between items-center mb-3"
                >
                  <div>
                    <p className="font-medium">
                      Fluency {s.fluency} • Clarity {s.clarity}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
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
    <div className="bg-white p-6 rounded-2xl  shadow-lg text-center">
      <div className="mb-2 flex justify-center text-blue-500">
        {icon}
      </div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}