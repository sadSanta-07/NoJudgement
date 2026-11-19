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
  Sparkles,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/matchmaking", label: "Find Partner", icon: Users },
  { href: "/dashboard/practice", label: "Practice Modes", icon: GraduationCap },
  { href: "/dashboard/aicoach", label: "AI Coach", icon: MessageSquare },
  { href: "/dashboard/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/dashboard/reports", label: "Safety & Reports", icon: ShieldAlert },
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
    <nav className="flex-1 px-3 space-y-1.5">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClick}
            className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-[6px] text-sm font-medium transition-all duration-150 group relative ${
              isActive
                ? "bg-[#f1efea] text-[#1d1c1a] border border-[#e8e6e1] shadow-[0_1px_1px_rgba(60,48,30,.04)]"
                : "text-[#5e5b55] hover:bg-[#f5f3ee] hover:text-[#1d1c1a] border border-transparent"
            }`}
          >
            <Icon
              size={18}
              className={
                isActive
                  ? "text-[#b4400f]"
                  : "text-[#6a625a] group-hover:text-[#1d1c1a]"
              }
            />

            <span className="tracking-tight">{item.label}</span>

            {isActive && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#b4400f]" />
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
      {/* ── MOBILE TOP BAR ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 flex items-center justify-between px-5 py-4 border-b border-[#e8e6e1] bg-[#fcfbf8]/95 backdrop-blur-md z-40">
        <Link href="/dashboard" className="flex items-center gap-2">
          <svg className="pw-mark" viewBox="4 4 92 92" aria-hidden="true" focusable="false" style={{ width: "20px", height: "20px" }}>
            <g className="pw-spin">
              <path
                d="M52.2 50L52.2 9A20.5 20.5 0 0 1 52.2 50ZM50 52.2L91 52.2A20.5 20.5 0 0 1 50 52.2ZM47.8 50L47.8 91A20.5 20.5 0 0 1 47.8 50ZM50 47.8L9 47.8A20.5 20.5 0 0 1 50 47.8Z"
                fill="currentColor"
              />
            </g>
          </svg>
          <span className="font-display text-xl tracking-tight text-[#1d1c1a]">
            no<i className="italic">judgment</i>
          </span>
        </Link>
        <button
          onClick={() => setOpen(true)}
          className="p-1.5 rounded-[5px] bg-[#f1efea] border border-[#e8e6e1] text-[#1d1c1a]"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="hidden md:flex md:w-[260px] h-screen sticky top-0 p-4 shrink-0 bg-[#f6f5f1]">
        <div className="flex flex-col h-full w-full rounded-[22px] bg-[#fcfbf8] border border-[#e8e6e1] shadow-[0_1px_2px_rgba(60,48,30,.07),0_4px_8px_rgba(60,48,30,.07)] overflow-hidden">
          {/* LOGO */}
          <div className="p-6 pb-5">
            <Link href="/" className="flex items-center gap-2.5">
              <svg className="pw-mark" viewBox="4 4 92 92" aria-hidden="true" focusable="false" style={{ width: "26px", height: "26px" }}>
                <g className="pw-spin">
                  <path
                    d="M52.2 50L52.2 9A20.5 20.5 0 0 1 52.2 50ZM50 52.2L91 52.2A20.5 20.5 0 0 1 50 52.2ZM47.8 50L47.8 91A20.5 20.5 0 0 1 47.8 50ZM50 47.8L9 47.8A20.5 20.5 0 0 1 50 47.8Z"
                    fill="currentColor"
                  />
                </g>
              </svg>
              <div>
                <span className="font-display text-xl font-normal tracking-tight text-[#1d1c1a] block leading-none">
                  no<i className="italic">judgment</i>
                </span>
                <span className="font-mono text-[10px] text-[#6a625a] tracking-wider uppercase block mt-1">
                  Speaking Studio
                </span>
              </div>
            </Link>
          </div>

          {/* NAVIGATION LINKS */}
          <NavLinks pathname={pathname} />

          {/* nojudgment TACTILE PRO/STUDIO CARD */}
          <div className="p-4 mt-auto">
            <div className="rounded-[12px] bg-[#f5f3ee] border border-[#e8e6e1] p-4 text-left">
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-[#b4400f] uppercase tracking-wider mb-1.5">
                <Sparkles size={13} />
                <span>Fluency Studio</span>
              </div>
              <p className="text-xs text-[#5e5b55] leading-relaxed mb-3">
                Full AI speech analysis, audio recordings & streak protection.
              </p>
              <button className="w-full py-2 px-3 rounded-[5px] bg-[#1d1c1a] text-[#fbfaf7] text-xs font-mono font-medium shadow-sm hover:bg-[#2c2a26] transition-all cursor-pointer active:translate-y-[1px]">
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-[#1d1c1a]/40 backdrop-blur-sm z-50 md:hidden"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="fixed top-0 left-0 w-[82%] max-w-[300px] h-full bg-[#fcfbf8] border-r border-[#e8e6e1] z-50 flex flex-col shadow-2xl md:hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-[#e8e6e1]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-[5px] bg-[#1d1c1a] text-[#fbfaf7] flex items-center justify-center font-display text-sm font-normal">
                    N
                  </div>
                  <span className="font-display text-lg font-normal tracking-tight text-[#1d1c1a]">
                    NoJudgment
                  </span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 rounded-[5px] bg-[#f1efea] text-[#1d1c1a]"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-3 flex-1 overflow-y-auto">
                <NavLinks pathname={pathname} onClick={() => setOpen(false)} />
              </div>

              <div className="p-4 border-t border-[#e8e6e1]">
                <div className="rounded-[8px] bg-[#f5f3ee] border border-[#e8e6e1] p-3 text-xs text-[#6a625a]">
                  Logged in as active speaker
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
