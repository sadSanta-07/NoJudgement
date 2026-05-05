"use client";

import { Trophy, Medal, Crown, TrendingUp, Zap, RefreshCw, AlertCircle, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

// Types
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

// Animation Variants
const sectionVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const PLACE_LABELS: Record<number, string> = {
  1: "1st PLACE",
  2: "2nd PLACE",
  3: "3rd PLACE",
};

// Skeleton Loader 
function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 py-3 animate-pulse">
      <div className="w-6 h-4 bg-gray-100 rounded" />
      <div className="w-8 h-8 rounded-full bg-gray-100" />
      <div className="flex flex-col gap-1 flex-1">
        <div className="w-24 h-3 bg-gray-100 rounded" />
        <div className="w-16 h-2 bg-gray-100 rounded" />
      </div>
      <div className="w-12 h-4 bg-gray-100 rounded" />
    </div>
  );
}

function PodiumSkeleton({ height, wide }: { height: string; wide?: boolean }) {
  return (
    <div className={`flex flex-col items-center ${wide ? "order-1 sm:order-2" : ""}`}>
      <div className="w-14 h-14 rounded-full bg-gray-100 animate-pulse mb-2" />
      <div className={`bg-gray-50 rounded-t-2xl ${wide ? "w-36" : "w-32"} ${height} animate-pulse`} />
    </div>
  );
}

// Error State 
function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 py-12 text-center">
      <AlertCircle size={32} className="text-red-400" />
      <div>
        <p className="font-semibold text-gray-700 text-sm normal-case tracking-normal">
          Failed to load leaderboard
        </p>
        <p className="text-xs text-gray-400 normal-case tracking-normal mt-1">
          Check your connection and try again
        </p>
      </div>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-xs font-semibold rounded-xl hover:bg-blue-600 transition-colors normal-case tracking-normal"
      >
        <RefreshCw size={13} /> Retry
      </button>
    </div>
  );
}

// Main Component 
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

  // Derive podium top-3 and the rest
  const topUsers = data?.leaderboard.slice(0, 3) ?? [];
  const rankingList = data?.leaderboard.slice(3) ?? [];
  const currentUser = data?.leaderboard.find((u) => u.isCurrentUser);
  const currentUserRank = data?.currentUserRank ?? null;

  // Points gap to the person just above current user in the list
  const userIndex = data?.leaderboard.findIndex((u) => u.isCurrentUser) ?? -1;
  const userAbove = userIndex > 0 ? data!.leaderboard[userIndex - 1] : null;
  const pointsGap = userAbove && currentUser ? userAbove.points - currentUser.points : null;

  // Avatar helper 
  const avatar = (src: string | undefined, name: string, size = "w-14 h-14") => (
    <img
      src={src || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`}
      alt={name}
      className={`${size} object-cover`}
      onError={(e) => {
        (e.target as HTMLImageElement).src =
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
      }}
    />
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl mx-auto space-y-8 px-4 sm:px-6 lg:px-0"
    >
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm overflow-hidden text-sm uppercase font-bold text-gray-400">
        <div className="p-5 sm:p-8 space-y-6 sm:space-y-8">

          {/* ── Header with refresh ── */}
          <div className="flex items-center justify-between">
            <h1 className="text-gray-900 text-base tracking-tight">Leaderboard</h1>
            <div className="flex items-center gap-2">
              {lastUpdated && (
                <span className="text-[10px] text-gray-300 normal-case font-normal hidden sm:block">
                  Updated {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              )}
              <button
                onClick={fetchLeaderboard}
                disabled={loading}
                className="p-1.5 rounded-lg hover:bg-gray-50 text-gray-300 hover:text-gray-500 transition-colors disabled:opacity-40"
                title="Refresh leaderboard"
              >
                <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              </button>
            </div>
          </div>

          {/* Error  */}
          {error && !loading && <ErrorState onRetry={fetchLeaderboard} />}

          {/*  Podium Section */}
          {!error && (
            <motion.div variants={sectionVariants} className="space-y-3 sm:space-y-4">
              <label className="flex items-center text-gray-900 border-b border-gray-50 pb-3 sm:pb-4">
                <Trophy size={18} className="mr-3 text-yellow-500 shrink-0" /> This Week&apos;s Podium
              </label>

              {loading ? (
                <div className="flex flex-col sm:flex-row items-end justify-center gap-4 pt-2 pb-4">
                  <PodiumSkeleton height="h-28" />
                  <PodiumSkeleton height="h-40" wide />
                  <PodiumSkeleton height="h-24" />
                </div>
              ) : topUsers.length >= 3 ? (
                <div className="flex flex-col sm:flex-row items-end justify-center gap-4 pt-2 pb-4">

                  {/* 2nd Place */}
                  <div className="flex flex-col items-center order-2 sm:order-1">
                    <div className="relative">
                      <div className={`w-14 h-14 rounded-full border-4 shadow-lg overflow-hidden mb-2 ${topUsers[1].isCurrentUser ? "border-blue-300 bg-blue-50" : "border-white bg-gray-100"}`}>
                        {avatar(topUsers[1].image, topUsers[1].name)}
                      </div>
                      <div className="absolute -top-1 -right-1 bg-gray-400 text-white p-0.5 rounded-full border-2 border-white">
                        <Medal size={12} />
                      </div>
                    </div>
                    <div className={`border rounded-t-2xl w-32 text-center h-28 flex flex-col justify-end px-3 pb-3 ${topUsers[1].isCurrentUser ? "bg-blue-50/50 border-blue-100" : "bg-gray-50 border-gray-100"}`}>
                      <p className="font-bold text-gray-900 text-xs normal-case truncate">
                        {topUsers[1].name}{topUsers[1].isCurrentUser ? " (You)" : ""}
                      </p>
                      <p className="text-base font-bold text-gray-400">{topUsers[1].points.toLocaleString()}</p>
                      <p className="text-[10px] font-bold text-gray-300">{PLACE_LABELS[2]}</p>
                    </div>
                  </div>

                  {/* 1st Place */}
                  <div className="flex flex-col items-center order-1 sm:order-2">
                    <div className="relative">
                      <div className={`w-16 h-16 rounded-full border-4 shadow-2xl overflow-hidden mb-2 relative z-10 ${topUsers[0].isCurrentUser ? "border-blue-300 bg-blue-100" : "border-white bg-yellow-100"}`}>
                        {avatar(topUsers[0].image, topUsers[0].name, "w-full h-full")}
                      </div>
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute -top-3 -right-1 bg-yellow-500 text-white p-1 rounded-full border-2 border-white z-20 shadow-md"
                      >
                        <Crown size={14} />
                      </motion.div>
                    </div>
                    <div className="bg-white border-x border-t border-yellow-100 rounded-t-3xl w-36 text-center h-40 flex flex-col justify-end px-3 pb-3 relative shadow-lg shadow-yellow-100/50">
                      <div className="absolute top-0 inset-x-0 h-1.5 bg-yellow-400 rounded-t-3xl" />
                      <p className="font-bold text-gray-900 text-sm normal-case truncate">
                        {topUsers[0].name}{topUsers[0].isCurrentUser ? " (You)" : ""}
                      </p>
                      <p className="text-xl font-bold text-yellow-600">{topUsers[0].points.toLocaleString()}</p>
                      <p className="text-[10px] font-bold text-yellow-400">{PLACE_LABELS[1]}</p>
                    </div>
                  </div>

                  {/* 3rd Place */}
                  <div className="flex flex-col items-center order-3">
                    <div className="relative">
                      <div className={`w-14 h-14 rounded-full border-4 shadow-lg overflow-hidden mb-2 ${topUsers[2].isCurrentUser ? "border-blue-300 bg-blue-50" : "border-white bg-amber-100"}`}>
                        {avatar(topUsers[2].image, topUsers[2].name)}
                      </div>
                      <div className="absolute -top-1 -right-1 bg-amber-600 text-white p-0.5 rounded-full border-2 border-white">
                        <Medal size={12} />
                      </div>
                    </div>
                    <div className={`border rounded-t-2xl w-32 text-center h-24 flex flex-col justify-end px-3 pb-3 ${topUsers[2].isCurrentUser ? "bg-blue-50/50 border-blue-100" : "bg-amber-50/50 border-amber-100/80"}`}>
                      <p className="font-bold text-gray-900 text-xs normal-case truncate">
                        {topUsers[2].name}{topUsers[2].isCurrentUser ? " (You)" : ""}
                      </p>
                      <p className="text-base font-bold text-amber-700">{topUsers[2].points.toLocaleString()}</p>
                      <p className="text-[10px] font-bold text-amber-500/60">{PLACE_LABELS[3]}</p>
                    </div>
                  </div>

                </div>
              ) : null}
            </motion.div>
          )}

          {/*  Rankings Section */}
          {!error && (
            <motion.div variants={sectionVariants} className="space-y-3 sm:space-y-4">
              <label className="flex items-center text-gray-900 border-b border-gray-50 pb-3 sm:pb-4">
                <Medal size={18} className="mr-3 text-blue-500 shrink-0" /> Full Rankings
              </label>

              <div className="divide-y divide-gray-50">
                {loading
                  ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                  : rankingList.map((user) => (
                    <div key={user.rank}>
                      <div
                        className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 py-3 cursor-pointer -mx-2 px-2 rounded-xl transition-colors group ${
                          user.isCurrentUser
                            ? "bg-blue-50/60 hover:bg-blue-50"
                            : "hover:bg-blue-50/30"
                        }`}
                        onClick={() => handleRowClick(user.rank)}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`transition-colors w-6 text-right shrink-0 ${user.isCurrentUser ? "text-blue-400" : "text-gray-300 group-hover:text-blue-400"}`}>
                            #{user.rank}
                          </span>
                          <div className={`w-8 h-8 rounded-full border overflow-hidden shrink-0 ${user.isCurrentUser ? "border-blue-200 bg-blue-50" : "border-gray-100 bg-gray-50"}`}>
                            {avatar(user.image, user.name, "w-full h-full")}
                          </div>
                          <div className="flex flex-col">
                            <span className={`normal-case font-semibold text-sm leading-tight ${user.isCurrentUser ? "text-blue-700" : "text-gray-900"}`}>
                              {user.name}{user.isCurrentUser ? " (You)" : ""}
                            </span>
                            <span className="text-[10px] text-gray-400 flex items-center gap-1">
                              <Layers size={9} /> {user.totalSessions} sessions
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 pl-9 sm:pl-0">
                          <span className="flex items-center text-orange-500 font-bold text-xs">
                            <Zap size={12} className="mr-0.5" /> {user.streak}
                          </span>
                          <span className={`normal-case font-bold text-sm ${user.isCurrentUser ? "text-blue-700" : "text-gray-900"}`}>
                            {user.points.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Expandable detail row */}
                      <AnimatePresence>
                        {expandedRank === user.rank && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-3 px-2 bg-gray-50/60 rounded-xl mb-1 text-xs normal-case font-normal tracking-normal">
                              <div className="flex flex-col gap-0.5">
                                <span className="text-gray-400 text-[10px] uppercase font-semibold">Streak</span>
                                <span className="font-semibold text-orange-500">{user.streak} days</span>
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <span className="text-gray-400 text-[10px] uppercase font-semibold">Points</span>
                                <span className="font-semibold text-gray-700">{user.points.toLocaleString()}</span>
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <span className="text-gray-400 text-[10px] uppercase font-semibold">Sessions</span>
                                <span className="font-semibold text-gray-700">{user.totalSessions}</span>
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <span className="text-gray-400 text-[10px] uppercase font-semibold">Avg pts/session</span>
                                <span className="font-semibold text-gray-700">
                                  {user.totalSessions > 0 ? Math.round(user.points / user.totalSessions).toLocaleString() : "—"}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}

          {/*  Your Standing Section */}
          {!error && (
            <motion.div variants={sectionVariants} className="space-y-3 sm:space-y-4">
              <label className="flex items-center text-gray-900 border-b border-gray-50 pb-3 sm:pb-4">
                <TrendingUp size={18} className="mr-3 text-green-500 shrink-0" /> Your Standing
              </label>

              {loading ? (
                <div className="space-y-3 animate-pulse">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex justify-between py-2">
                      <div className="w-24 h-3 bg-gray-100 rounded" />
                      <div className="w-16 h-3 bg-gray-100 rounded" />
                    </div>
                  ))}
                </div>
              ) : currentUser ? (
                <>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 py-2">
                    <span className="text-gray-500">Current Rank</span>
                    <span className="text-gray-900">#{currentUserRank ?? currentUser.rank}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 py-2">
                    <span className="text-gray-500">Total Sessions</span>
                    <span className="text-blue-600 normal-case font-semibold">{currentUser.totalSessions} sessions</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 py-2">
                    <span className="text-gray-500">Current Streak</span>
                    <span className="text-orange-500 flex items-center gap-1">
                      <Zap size={13} /> {currentUser.streak} days
                    </span>
                  </div>
                  {pointsGap !== null && userAbove && (
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 py-2">
                      <span className="text-gray-500">To beat #{userAbove.rank} {userAbove.name}</span>
                      <span className="text-orange-500 normal-case font-medium sm:font-bold sm:uppercase">
                        {pointsGap.toLocaleString()} pts needed
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 py-2">
                    <div className="w-10 h-10 rounded-full border-2 border-blue-100 overflow-hidden shrink-0">
                      {avatar(currentUser.image, currentUser.name, "w-full h-full")}
                    </div>
                    <div className="flex flex-col normal-case font-normal tracking-normal">
                      <span className="font-semibold text-gray-900 text-sm">{currentUser.name}</span>
                      <span className="text-xs text-gray-400">That&apos;s you! · {currentUser.points.toLocaleString()} pts</span>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-gray-400 text-xs normal-case font-normal py-4 text-center">
                  You don&apos;t appear in the current leaderboard yet.
                </p>
              )}
            </motion.div>
          )}

        </div>
      </div>
    </motion.div>
  );
}