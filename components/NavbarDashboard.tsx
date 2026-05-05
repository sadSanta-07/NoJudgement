"use client";

import { Flame, Zap } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMemo, useEffect, useState } from "react";

interface UserStats {
  points: number;
  streak: number;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const [stats, setStats] = useState<UserStats>({
    points: 0,
    streak: 0,
  });

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/points");
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();

        setStats({
          points: data.points || 0,
          streak: data.streak || 0,
        });
      } catch (err) {
        console.error("Navbar stats error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);


  const segments = pathname?.split("/").filter(Boolean);
  const currentPage = segments?.[1] || "dashboard";


  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" :
    hour < 18 ? "Good afternoon" :
    "Good evening";

  const pageTitles: Record<string, string> = {
    dashboard: `${greeting}, ${session?.user?.name?.split(" ")[0] || "User"}!`,
    matchmaking: "Ready to speak?",
    voicechat: "Live Practice",
    aicoach: "AI Coach",
    practice: "Practice Modes",
    leaderboard: "Rankings",
    settings: "Settings",
    reports: "Reports & Safety",
  };

  const title = useMemo(() => {
    return pageTitles[currentPage] || "NoJudgment";
  }, [currentPage, session, greeting]);

  return (
    <header className="h-16 md:h-20 bg-white/70 backdrop-blur-md border-b border-[var(--color-border)] px-4 md:px-10 flex items-center justify-between sticky top-0 z-30">

      {/* TITLE */}
      <h2 className="text-lg md:text-3xl font-bold text-[var(--color-tertiary)] truncate max-w-[60%] md:max-w-none">
        {title}
      </h2>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3 md:gap-6">

        {/* STATS */}
        <div className="hidden sm:flex items-center gap-3 md:gap-4 bg-[var(--color-neutral)] px-3 md:px-5 py-1.5 md:py-2.5 rounded-full border border-[var(--color-border)]">

          {/* STREAK */}
          <div className="flex items-center gap-1.5 md:gap-2 pr-2 md:pr-4 border-r border-gray-200">
            <Flame size={16} className="md:w-[20px] md:h-[20px] text-[#FF6A00] fill-[#FF6A00]" />
            <span className="font-bold text-sm md:text-base text-[var(--color-tertiary)]">
              {loading ? "--" : stats.streak}
            </span>
          </div>

          {/* POINTS */}
          <div className="flex items-center gap-1.5 md:gap-2 pl-2 md:pl-3">
            <Zap size={16} className="md:w-[20px] md:h-[20px] text-[#3B5BFF] fill-[#3B5BFF]" />
            <span className="font-bold text-sm md:text-base text-[var(--color-tertiary)]">
              {loading ? "--" : stats.points}
            </span>
          </div>

        </div>

        {/* USER */}
        <div
          onClick={() => router.push("/dashboard/settings")}
          title="Go to settings"
          className="w-9 h-9 md:w-11 md:h-11 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0 cursor-pointer hover:scale-105 transition"
        >
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt="User"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#FF6A00] to-[#3B5BFF] flex items-center justify-center text-white font-bold text-sm md:text-base">
              {session?.user?.name?.charAt(0) || "U"}
            </div>
          )}
        </div>

      </div>
    </header>
  );
}