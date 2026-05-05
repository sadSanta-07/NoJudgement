"use client";

import { Flame, Zap } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const currentPage = pathname?.split("/")[2] || "dashboard";
  const pageTitles: Record<string, string> = {
    dashboard: `Good morning, ${session?.user?.name?.split(" ")[0] || "User"}!`,
    matchmaking: "Ready to speak?",
    voicechat: "Live Practice",
    aicoach: "AI Coach",
    practice: "Practice Modes",
    leaderboard: "Rankings",
    settings: "Settings",
  };

  return (
    <header className="h-16 md:h-20 bg-white/70 backdrop-blur-md border-b border-[var(--color-border)] px-4 md:px-10 flex items-center justify-between sticky top-0 z-30">

      {/* TITLE */}
      <h2 className="text-lg md:text-3xl font-bold text-[var(--color-tertiary)] truncate max-w-[60%] md:max-w-none">
        {pageTitles[currentPage] || "NoJudgment"}
      </h2>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3 md:gap-6">

        {/* STATS */}
        <div className="hidden sm:flex items-center gap-3 md:gap-4 bg-[var(--color-neutral)] px-3 md:px-5 py-1.5 md:py-2.5 rounded-full border border-[var(--color-border)]">

          {/* STREAK */}
          <div className="flex items-center gap-1.5 md:gap-2 pr-2 md:pr-4 border-r border-gray-200">
            <Flame size={16} className="md:w-[20px] md:h-[20px] text-[#FF6A00] fill-[#FF6A00]" />
            <span className="font-bold text-sm md:text-base text-[var(--color-tertiary)]">
              12
            </span>
          </div>

          {/* POINTS */}
          <div className="flex items-center gap-1.5 md:gap-2 pl-2 md:pl-3">
            <Zap size={16} className="md:w-[20px] md:h-[20px] text-[#3B5BFF] fill-[#3B5BFF]" />
            <span className="font-bold text-sm md:text-base text-[var(--color-tertiary)]">
              450
            </span>
          </div>
        </div>

        {/* USER */}
        <div className="w-9 h-9 md:w-11 md:h-11 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt="User"
              className="w-full h-full object-cover"
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