"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Users,
  GraduationCap,
  MessageSquare,
  Trophy,
  ShieldAlert,
  Settings,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/matchmaking", label: "Find Partner", icon: Users },
  { href: "/dashboard/practice", label: "Practice Mode", icon: GraduationCap },
  { href: "/dashboard/aicoach", label: "AI Coach", icon: MessageSquare },
  { href: "/dashboard/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/dashboard/reports", label: "Reports & Safety", icon: ShieldAlert },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

function NavLinks({
  pathname,
  onClick,
}: {
  pathname: string;
  onClick?: () => void;
}) {
  return (
    <nav className="flex-1 px-4 space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClick}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${isActive
              ? "bg-[#EAF1FF] text-[#2563EB]"
              : "text-gray-500 hover:bg-[#F3F4F6] hover:text-gray-900"
              }`}
          >
            <Icon
              size={20}
              className={
                isActive
                  ? "text-[#2563EB]"
                  : "text-gray-400 group-hover:text-gray-900"
              }
            />

            <span className="font-medium">
              {item.label}
            </span>

            {isActive && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 rounded-2xl bg-[#2563EB] -z-10"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);



  return (
    <>
      {/* 🔹 MOBILE TOP BAR (fixed, no layout shift) */}
      <div className="md:hidden fixed top-0 left-0 right-0 flex items-center justify-between px-4 py-4 border-b bg-white z-40">
        <h1 className="text-xl font-extrabold bg-gradient-to-r from-[#FFA133] to-[#A5BBFC] bg-clip-text text-transparent">
          NoJudgment
        </h1>
        <button onClick={() => setOpen(true)}>
          <Menu />
        </button>
      </div>

      {/* 🔹 DESKTOP SIDEBAR (ONLY on md+) */}
      <aside className="hidden md:flex md:w-[280px] h-screen sticky top-0 p-4">
        <div className="flex flex-col h-full rounded-[2rem] bg-white/70 backdrop-blur-2xl border border-black/[0.04] shadow-[0_8px_40px_rgba(0,0,0,0.06)] overflow-hidden">
          {/* LOGO */}
          <div className="px-6 pt-8 pb-6">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#FFA133] to-[#A5BBFC] bg-clip-text text-transparent">
              NoJudgment
            </h1>
          </div>

          <NavLinks pathname={pathname} />

          {/* PRO CARD */}
          <div className="p-6">
            <div className="bg-gradient-to-br from-[#FFA133]/10 to-[#A5BBFC]/10 p-4 rounded-2xl border border-[var(--color-border)]">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                PRO PLAN
              </p>
              <p className="text-sm text-gray-700 font-medium mb-3">
                Get unlimited AI feedback & matches.
              </p>
              <button className="w-full py-2 bg-white text-gray-900 rounded-lg text-sm font-bold shadow-sm hover:shadow-md transition">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* 🔹 MOBILE DRAWER */}
      <AnimatePresence>
        {open && (
          <>
            {/* OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />

            {/* DRAWER */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 18,
              }}
              className="fixed top-0 left-0 w-[85%] max-w-[320px] h-full bg-white/90 backdrop-blur-2xl z-50 flex flex-col shadow-[0_10px_50px_rgba(0,0,0,0.12)]"
            >
              {/* HEADER */}
              <div className="flex items-center justify-between p-6 border-b">
                <h1 className="text-lg font-bold bg-gradient-to-r from-[#FFA133] to-[#A5BBFC] bg-clip-text text-transparent">
                  NoJudgment
                </h1>
                <button onClick={() => setOpen(false)}>
                  <X />
                </button>
              </div>

              <NavLinks
                pathname={pathname}
                onClick={() => setOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}