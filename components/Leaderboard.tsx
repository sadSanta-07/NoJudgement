"use client";

import { Trophy, Medal, Crown, TrendingUp, Zap, RefreshCw, AlertCircle, Layers, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface LeaderboardUser {
  rank: number;
  name: string;
  image: string;
  points: number;
  streak: number;
  totalSessions: number;
  isCurrentUser: boolean;
}

interface LeaderboardResponse {
  leaderboard: LeaderboardUser[];
  currentUserRank: number;
}

function SkeletonRow() {
  return (
    <div className="flex items-center justify-between py-3.5 px-3 rounded-[8px] bg-[#f5f3ee] animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-5 h-4 bg-[#e8e6e1] rounded" />
        <div className="w-8 h-8 rounded-full bg-[#e8e6e1]" />
        <div className="w-24 h-4 bg-[#e8e6e1] rounded" />
      </div>
      <div className="w-16 h-4 bg-[#e8e6e1] rounded" />
    </div>
  );
}

export default function Leaderboard() {
  const [data, setData] = useState<LeaderboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [expandedRank, setExpandedRank] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/leaderboard");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: LeaderboardResponse = await res.json();
      setData(json);
      setLastUpdated(new Date());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const handleRowClick = (rank: number) => {
    setExpandedRank((prev) => (prev === rank ? null : rank));
  };

  const topUsers = data?.leaderboard.slice(0, 3) ?? [];
  const rankingList = data?.leaderboard.slice(3) ?? [];
  const currentUser = data?.leaderboard.find((u) => u.isCurrentUser);
  const currentUserRank = data?.currentUserRank ?? null;

  const userIndex = data?.leaderboard.findIndex((u) => u.isCurrentUser) ?? -1;
  const userAbove = userIndex > 0 ? data!.leaderboard[userIndex - 1] : null;
  const pointsGap = userAbove && currentUser ? userAbove.points - currentUser.points : null;

  const avatar = (src: string | undefined, name: string) => (
    <img
      src={src || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`}
      alt={name}
      className="w-full h-full object-cover"
      onError={(e) => {
        (e.target as HTMLImageElement).src =
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
      }}
    />
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* ── MAIN LEADERBOARD CONTAINER ── */}
      <div className="rounded-[22px] bg-[#fcfbf8] border border-[#e8e6e1] p-6 sm:p-10 shadow-[0_1px_2px_rgba(60,48,30,.07),0_4px_8px_rgba(60,48,30,.07)] space-y-8">
        
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-[#e8e6e1] pb-5">
          <div>
            <h1 className="font-display text-3xl font-normal text-[#1d1c1a] tracking-tight">
              Global Standings
            </h1>
            <p className="font-mono text-xs text-[#6a625a] mt-1">
              Live ranking powered by consistent speaking minutes & fluency
            </p>
          </div>

          <div className="flex items-center gap-2">
            {lastUpdated && (
              <span className="font-mono text-[11px] text-[#a39a8e] hidden sm:inline">
                {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            )}
            <button
              onClick={fetchLeaderboard}
              disabled={loading}
              className="p-2 rounded-[5px] bg-[#f1efea] hover:bg-[#ffffff] border border-[#e8e6e1] text-[#1d1c1a] cursor-pointer transition-all disabled:opacity-40"
              title="Refresh standings"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* ERROR STATE */}
        {error && !loading && (
          <div className="rounded-[10px] p-6 bg-red-50 border border-red-200 text-center space-y-3 font-mono text-xs">
            <AlertCircle size={24} className="text-red-500 mx-auto" />
            <p className="text-red-700">Failed to load leaderboard data.</p>
            <button
              onClick={fetchLeaderboard}
              className="px-3.5 py-1.5 rounded-[5px] bg-[#1d1c1a] text-white"
            >
              Retry
            </button>
          </div>
        )}

        {/* ── PODIUM TOP 3 ── */}
        {!error && (
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-wider text-[#6a625a] block">
              This Week&apos;s Podium
            </span>

            {loading ? (
              <div className="grid grid-cols-3 gap-4 pt-6 pb-2">
                <div className="h-32 bg-[#f5f3ee] rounded-[16px] animate-pulse" />
                <div className="h-44 bg-[#f5f3ee] rounded-[16px] animate-pulse" />
                <div className="h-28 bg-[#f5f3ee] rounded-[16px] animate-pulse" />
              </div>
            ) : topUsers.length >= 3 ? (
              <div className="grid grid-cols-3 gap-3 sm:gap-4 items-end pt-4 pb-2">
                
                {/* 2nd Place - Lavender */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[12px] bg-[#c9bcd6]/40 border-2 border-[#c9bcd6] overflow-hidden mb-2 shadow-sm">
                    {avatar(topUsers[1].image, topUsers[1].name)}
                  </div>
                  <div className="w-full rounded-[14px] bg-[#c9bcd6]/20 border border-[#c9bcd6]/60 p-3 sm:p-4 text-center">
                    <span className="font-mono text-[10px] text-[#6a625a] font-semibold uppercase block">2nd Place</span>
                    <p className="font-semibold text-xs sm:text-sm text-[#1d1c1a] truncate mt-0.5">
                      {topUsers[1].name}{topUsers[1].isCurrentUser ? " (You)" : ""}
                    </p>
                    <p className="font-mono font-bold text-xs sm:text-sm text-[#1d1c1a] mt-1">
                      {topUsers[1].points.toLocaleString()} pts
                    </p>
                  </div>
                </div>

                {/* 1st Place - Peach / Terracotta */}
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[14px] bg-[#d9b3a9]/40 border-2 border-[#d9b3a9] overflow-hidden mb-2 shadow-md">
                      {avatar(topUsers[0].image, topUsers[0].name)}
                    </div>
                    <div className="absolute -top-2.5 -right-2 w-6 h-6 rounded-full bg-[#1d1c1a] text-[#fbfaf7] flex items-center justify-center text-xs shadow">
                      👑
                    </div>
                  </div>
                  <div className="w-full rounded-[16px] bg-[#d9b3a9]/25 border-2 border-[#d9b3a9] p-4 sm:p-5 text-center shadow-sm">
                    <span className="font-mono text-[11px] text-[#b4400f] font-semibold uppercase block">Champion</span>
                    <p className="font-display text-sm sm:text-base text-[#1d1c1a] truncate mt-0.5 font-normal">
                      {topUsers[0].name}{topUsers[0].isCurrentUser ? " (You)" : ""}
                    </p>
                    <p className="font-mono font-bold text-sm sm:text-base text-[#b4400f] mt-1">
                      {topUsers[0].points.toLocaleString()} pts
                    </p>
                  </div>
                </div>

                {/* 3rd Place - Sage Teal */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[12px] bg-[#99c1bb]/40 border-2 border-[#99c1bb] overflow-hidden mb-2 shadow-sm">
                    {avatar(topUsers[2].image, topUsers[2].name)}
                  </div>
                  <div className="w-full rounded-[14px] bg-[#99c1bb]/20 border border-[#99c1bb]/60 p-3 sm:p-4 text-center">
                    <span className="font-mono text-[10px] text-[#6a625a] font-semibold uppercase block">3rd Place</span>
                    <p className="font-semibold text-xs sm:text-sm text-[#1d1c1a] truncate mt-0.5">
                      {topUsers[2].name}{topUsers[2].isCurrentUser ? " (You)" : ""}
                    </p>
                    <p className="font-mono font-bold text-xs sm:text-sm text-[#1d1c1a] mt-1">
                      {topUsers[2].points.toLocaleString()} pts
                    </p>
                  </div>
                </div>

              </div>
            ) : null}
          </div>
        )}

        {/* ── FULL RANKINGS LIST ── */}
        {!error && (
          <div className="space-y-4 pt-4 border-t border-[#e8e6e1]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-[#6a625a]">
                Remaining Rankings
              </span>
              <span className="font-mono text-[11px] text-[#a39a8e]">
                Click row for statistics
              </span>
            </div>

            <div className="space-y-2">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)
                : rankingList.map((user) => (
                    <div key={user.rank} className="rounded-[8px] overflow-hidden border border-[#e8e6e1]">
                      <div
                        onClick={() => handleRowClick(user.rank)}
                        className={`p-3.5 flex items-center justify-between cursor-pointer transition-all ${
                          user.isCurrentUser
                            ? "bg-[#f1efea] font-medium"
                            : "bg-[#fcfbf8] hover:bg-[#f5f3ee]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-[#6a625a] w-6 text-center">
                            #{user.rank}
                          </span>
                          <div className="w-8 h-8 rounded-[6px] overflow-hidden border border-[#e8e6e1] bg-[#f1efea]">
                            {avatar(user.image, user.name)}
                          </div>
                          <div>
                            <p className="text-sm text-[#1d1c1a] font-medium leading-none">
                              {user.name}
                              {user.isCurrentUser && (
                                <span className="ml-1.5 font-mono text-[10px] text-[#b4400f] font-semibold">
                                  (You)
                                </span>
                              )}
                            </p>
                            <span className="font-mono text-[10px] text-[#6a625a] mt-1 block">
                              {user.totalSessions} sessions
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-[#b4400f] flex items-center gap-1 font-semibold">
                            <Flame size={12} /> {user.streak}d
                          </span>
                          <span className="font-mono text-xs font-bold text-[#1d1c1a]">
                            {user.points.toLocaleString()} pts
                          </span>
                        </div>
                      </div>

                      {/* Expandable breakdown */}
                      <AnimatePresence>
                        {expandedRank === user.rank && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-[#f5f3ee] p-4 border-t border-[#e8e6e1] grid grid-cols-3 gap-2 font-mono text-xs"
                          >
                            <div>
                              <span className="text-[#6a625a] block text-[10px] uppercase">Streak</span>
                              <span className="font-semibold text-[#1d1c1a]">{user.streak} days active</span>
                            </div>
                            <div>
                              <span className="text-[#6a625a] block text-[10px] uppercase">Total Rounds</span>
                              <span className="font-semibold text-[#1d1c1a]">{user.totalSessions} completed</span>
                            </div>
                            <div>
                              <span className="text-[#6a625a] block text-[10px] uppercase">Avg pts/session</span>
                              <span className="font-semibold text-[#1d1c1a]">
                                {user.totalSessions > 0
                                  ? Math.round(user.points / user.totalSessions).toLocaleString()
                                  : "—"}
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
            </div>
          </div>
        )}

        {/* ── CURRENT USER STANDING SUMMARY ── */}
        {!error && currentUser && (
          <div className="p-5 rounded-[14px] bg-[#f5f3ee] border border-[#e8e6e1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[8px] bg-[#1d1c1a] text-[#fbfaf7] font-display text-sm flex items-center justify-center font-normal">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-sm text-[#1d1c1a]">Your Current Position</p>
                <p className="font-mono text-xs text-[#6a625a]">
                  Rank #{currentUserRank ?? currentUser.rank} · {currentUser.points.toLocaleString()} XP
                </p>
              </div>
            </div>

            {pointsGap !== null && userAbove && (
              <div className="font-mono text-xs text-[#b4400f] font-semibold">
                {pointsGap.toLocaleString()} pts to pass #{userAbove.rank} {userAbove.name}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
