"use client";

import { Flame, Zap } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMemo, useEffect, useState } from "react";
import Image from "next/image";

interface UserStats {
  points: number;
  streak: number;
}

export default function NavbarDashboard() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const [stats, setStats] = useState<UserStats>({
    points: 0,
    streak: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user) {
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetch("/api/points");
        if (!res.ok) {
          // Gracefully handle unauthenticated or session expiry
          return;
        }

        const data = await res.json();

        setStats({
          points: data.points || 0,
          streak: data.streak || 0,
        });
      } catch (err) {
        // Silent fallback without noisy console logging
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [session]);

  const segments = pathname?.split("/").filter(Boolean);
  const currentPage = segments?.[1] || "dashboard";

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" :
    hour < 18 ? "Good afternoon" :
    "Good evening";

  const firstName = session?.user?.name?.split(" ")[0] || "Speaker";

  const pageTitles: Record<string, string> = {
    dashboard: `${greeting}, ${firstName}`,
    matchmaking: "Find a Conversation Partner",
    voicechat: "Live Speaking Session",
    aicoach: "AI Speaking Coach",
    practice: "Practice Arenas",
    leaderboard: "Global Standings",
    settings: "Account & Voice Settings",
    reports: "Safety & Community Moderation",
  };

  const title = useMemo(() => {
    return pageTitles[currentPage] || "NoJudgment Studio";
  }, [currentPage, session, greeting]);

  return (
    <header className="h-18 bg-[#f6f5f1]/90 backdrop-blur-md border-b border-[#e8e6e1] px-6 sm:px-10 flex items-center justify-between transition-all">
      {/* TITLE */}
      <h2 className="font-display text-xl sm:text-2xl font-normal text-[#1d1c1a] tracking-tight truncate max-w-[65%] sm:max-w-none">
        {title}
      </h2>

      {/* RIGHT SIDE: STATS & USER */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* STATS KEYCAP PILL */}
        <div className="flex items-center gap-2 bg-[#f1efea] px-3 py-1.5 rounded-[5px] border border-[#e8e6e1] shadow-sm">
          {/* STREAK */}
          <div className="flex items-center gap-1.5 pr-2.5 border-r border-[#e8e6e1]" title="Active Practice Streak">
            <Flame size={14} className="text-[#b4400f] fill-[#b4400f]" />
            <span className="font-mono text-xs font-semibold text-[#1d1c1a]">
              {loading ? "--" : stats.streak}
              <span className="text-[#6a625a] font-normal ml-0.5 hidden sm:inline">d</span>
            </span>
          </div>

          {/* POINTS */}
          <div className="flex items-center gap-1.5 pl-1" title="Practice XP Points">
            <Zap size={14} className="text-[#1d1c1a]" />
            <span className="font-mono text-xs font-semibold text-[#1d1c1a]">
              {loading ? "--" : stats.points.toLocaleString()}
              <span className="text-[#6a625a] font-normal ml-0.5 hidden sm:inline">pts</span>
            </span>
          </div>
        </div>

        {/* USER PROFILE AVATAR */}
        <div
          onClick={() => router.push("/dashboard/settings")}
          title="Account Settings"
          className="w-9 h-9 rounded-[6px] overflow-hidden border border-[#e8e6e1] shadow-sm shrink-0 cursor-pointer hover:border-[#1d1c1a] hover:-translate-y-0.5 transition-all bg-[#f1efea] flex items-center justify-center active:translate-y-[1px]"
        >
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || "User avatar"}
              width={36}
              height={36}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-display font-medium text-sm text-[#1d1c1a]">
              {firstName.charAt(0)}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
