"use client";

import {
  Briefcase,
  Coffee,
  Swords,
  ArrowRight,
  Clock,
  Star,
  Lock,
  CheckCircle2,
  X,
  Sparkles,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import Link from "next/link";

const modes = [
  {
    id: "interview",
    title: "Job Interview",
    desc: "Simulate behavioral, situational, and executive interviews with focused AI prompts.",
    icon: Briefcase,
    accentBg: "bg-[#99c1bb]/25",
    accentBorder: "border-[#99c1bb]/60",
    iconBg: "bg-[#99c1bb]",
    stats: "150+ Questions",
    difficulty: "Advanced",
    duration: "15 MIN",
  },
  {
    id: "casual",
    title: "Casual Chit-chat",
    desc: "Practice everyday conversational English, travel stories, hobbies, and day-to-day dialogue.",
    icon: Coffee,
    accentBg: "bg-[#d9b3a9]/25",
    accentBorder: "border-[#d9b3a9]/60",
    iconBg: "bg-[#d9b3a9]",
    stats: "Endless Prompts",
    difficulty: "Beginner",
    duration: "10 MIN",
  },
  {
    id: "debate",
    title: "Debate & Nuance",
    desc: "Politely argue for or against contemporary topics to strengthen persuasive vocabulary.",
    icon: Swords,
    accentBg: "bg-[#c9bcd6]/25",
    accentBorder: "border-[#c9bcd6]/60",
    iconBg: "bg-[#c9bcd6]",
    stats: "Daily Topics",
    difficulty: "Expert",
    duration: "15 MIN",
  },
];

export default function PracticeMode() {
  const [active, setActive] = useState<any>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active]);

  return (
    <div className="space-y-10">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-[#6a625a]">
            Curated Speaking Arenas
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#1d1c1a] tracking-tight mt-1">
            Choose Your Practice Arena
          </h2>
          <p className="text-sm text-[#5e5b55] mt-1.5 max-w-xl leading-relaxed">
            Select a specialized simulation scenario to train vocabulary, pronunciation, and rapid mental translation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/matchmaking"
            className="px-3.5 py-2 rounded-[5px] bg-[#f1efea] border border-[#e8e6e1] text-xs font-mono font-medium text-[#1d1c1a] hover:bg-[#ffffff] transition-all"
          >
            Quick Match →
          </Link>
        </div>
      </div>

      {/* ── EXPANDED MODAL ── */}
      <AnimatePresence>
        {active && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#1d1c1a]/40 backdrop-blur-sm z-50"
            />

            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <motion.div
                layoutId={`card-${active.id}-${id}`}
                ref={ref}
                className="w-full max-w-xl bg-[#fcfbf8] rounded-[22px] shadow-2xl border border-[#e8e6e1] overflow-hidden"
              >
                <div className="p-8">
                  {/* TOP HEADER */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-[12px] flex items-center justify-center text-[#1d1c1a] shadow-sm ${active.iconBg}`}>
                        <active.icon size={26} />
                      </div>
                      <div>
                        <motion.h3
                          layoutId={`title-${active.id}-${id}`}
                          className="font-display text-3xl font-normal text-[#1d1c1a]"
                        >
                          {active.title}
                        </motion.h3>
                        <span className="font-mono text-xs text-[#6a625a]">
                          {active.difficulty} · {active.duration}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setActive(null)}
                      className="w-8 h-8 rounded-[5px] bg-[#f1efea] hover:bg-[#e8e6e1] border border-[#e8e6e1] flex items-center justify-center text-[#1d1c1a] cursor-pointer"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <motion.p
                    layoutId={`desc-${active.id}-${id}`}
                    className="text-sm text-[#5e5b55] leading-relaxed mb-6"
                  >
                    {active.desc}
                  </motion.p>

                  {/* METRIC PILLS */}
                  <div className="grid grid-cols-2 gap-3 mb-6 font-mono text-xs">
                    <div className="p-3.5 rounded-[8px] bg-[#f5f3ee] border border-[#e8e6e1]">
                      <span className="text-[#6a625a] block mb-1">Question Bank</span>
                      <span className="text-[#1d1c1a] font-semibold text-sm">{active.stats}</span>
                    </div>
                    <div className="p-3.5 rounded-[8px] bg-[#f5f3ee] border border-[#e8e6e1]">
                      <span className="text-[#6a625a] block mb-1">Recommended Level</span>
                      <span className="text-[#1d1c1a] font-semibold text-sm">{active.difficulty}</span>
                    </div>
                  </div>

                  {/* HIGHLIGHTS */}
                  <div className="p-4 rounded-[10px] bg-[#f1efea] border border-[#e8e6e1] space-y-2 mb-8 text-xs text-[#1d1c1a]">
                    <p className="font-semibold font-mono uppercase tracking-wider text-[#6a625a] text-[10px]">
                      Session Outline
                    </p>
                    <ul className="space-y-1.5 font-sans">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-[#1e5d36]" />
                        <span>Instant prompt generation tailored to chosen topic</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-[#1e5d36]" />
                        <span>Real-time grammar & pronunciation monitoring</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-[#1e5d36]" />
                        <span>Comprehensive post-session breakdown score</span>
                      </li>
                    </ul>
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/dashboard/matchmaking?topic=${encodeURIComponent(active.id)}`}
                    className="w-full py-3.5 rounded-[5px] bg-[#1d1c1a] text-[#fbfaf7] text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#2e2c28] transition-all cursor-pointer shadow-md active:translate-y-[1px]"
                  >
                    <span>Launch This Arena</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* ── THREE MAIN SCENARIO CARDS ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modes.map((mode, i) => (
          <motion.div
            key={mode.id}
            layoutId={`card-${mode.id}-${id}`}
            onClick={() => setActive(mode)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-[22px] border ${mode.accentBg} ${mode.accentBorder} p-7 sm:p-8 flex flex-col justify-between shadow-[0_1px_2px_rgba(60,48,30,.07),0_4px_8px_rgba(60,48,30,.07)] hover:-translate-y-1.5 transition-all duration-200 cursor-pointer`}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className={`w-12 h-12 rounded-[10px] ${mode.iconBg} text-[#1d1c1a] flex items-center justify-center shadow-sm`}>
                  <mode.icon size={22} />
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-1 rounded-[5px] bg-[#fcfbf8] border border-[#e8e6e1] text-[#1d1c1a]">
                  <Clock size={11} className="text-[#6a625a]" />
                  <span>{mode.duration}</span>
                </div>
              </div>

              <motion.h3
                layoutId={`title-${mode.id}-${id}`}
                className="font-display text-2xl font-normal text-[#1d1c1a] mb-2"
              >
                {mode.title}
              </motion.h3>

              <motion.p
                layoutId={`desc-${mode.id}-${id}`}
                className="text-xs sm:text-sm text-[#5e5b55] leading-relaxed mb-6"
              >
                {mode.desc}
              </motion.p>
            </div>

            <div className="pt-4 border-t border-[rgba(29,28,26,0.10)] flex items-center justify-between text-xs font-mono">
              <span className="text-[#6a625a]">{mode.stats}</span>
              <span className="inline-flex items-center gap-1 font-semibold text-[#1d1c1a]">
                <span>Explore</span>
                <ArrowRight size={13} />
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── UPCOMING ARENA: PRESENTATION PRACTICE ── */}
      <div className="rounded-[22px] bg-[#fcfbf8] border border-[#e8e6e1] p-8 sm:p-10 shadow-[0_1px_2px_rgba(60,48,30,.07),0_4px_8px_rgba(60,48,30,.07)] flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-[#d9b3a9]/30 border border-[#d9b3a9] font-mono text-xs text-[#1d1c1a]">
            <Star size={13} className="text-[#b4400f]" />
            <span>Coming Next · Studio Lab</span>
          </div>

          <h3 className="font-display text-3xl font-normal text-[#1d1c1a]">
            Presentation & Pitch Rehearsal
          </h3>

          <p className="text-sm text-[#5e5b55] leading-relaxed">
            Upload your slide deck bullet points or key talking points. Rehearse out loud while AI tracks pacing, slide transitions, vocal clarity, and filler phrases.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button className="px-5 py-2.5 rounded-[5px] bg-[#1d1c1a] text-[#fbfaf7] text-xs font-mono font-medium shadow-sm hover:bg-[#2c2a26] transition-all cursor-pointer">
              Join Early Access Waitlist
            </button>
            <span className="font-mono text-xs text-[#a39a8e]">Expected Q2</span>
          </div>
        </div>

        {/* Visual Graphic Representation */}
        <div className="w-full md:w-72 rounded-[16px] bg-[#f5f3ee] border border-[#e8e6e1] p-6 space-y-3 font-mono text-xs">
          <div className="flex justify-between text-[#6a625a]">
            <span>Slide 1 / 8</span>
            <span>02:45 / 10:00</span>
          </div>
          <div className="h-2 w-full bg-[#f1efea] rounded-full overflow-hidden border border-[#e8e6e1]">
            <div className="h-full bg-[#d9b3a9] w-1/3 rounded-full" />
          </div>
          <div className="p-3 rounded-[6px] bg-[#fcfbf8] border border-[#e8e6e1] text-[11px] text-[#1d1c1a]">
            💡 <span className="font-semibold">Pacing hint:</span> Slow down slightly during data disclosures.
          </div>
        </div>
      </div>
    </div>
  );
}
