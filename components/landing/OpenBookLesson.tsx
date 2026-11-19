"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimateIn from "@/components/ui/AnimateIn";

export default function OpenBookLesson() {
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);

  return (
    <section className="ls-start relative py-12 md:py-20" id="how" aria-labelledby="ls-h">
      {/* ── SECTION HEADER ── */}
      <AnimateIn direction="up" distance={20} duration={0.6}>
        <div className="ls-head text-center max-w-2xl mx-auto mb-10 px-4">
          <h2 className="ls-h2 font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#1D1C1A]" id="ls-h">
            See a speaking lesson from the <i className="italic font-normal">inside</i>.
          </h2>
          <p className="ls-sub text-base sm:text-lg text-[#5E5B55] mt-4 leading-relaxed font-body">
            Why your mind goes blank under conversational pressure, and how to recover, step by step.
          </p>
        </div>
      </AnimateIn>

      {/* ── OPEN BOOK SPREAD PLATE ── */}
      <AnimateIn direction="up" distance={30} duration={0.8} delay={0.15}>
        <figure
          className="ls-plate max-w-[1200px] mx-auto px-2 sm:px-6 relative select-none"
          aria-label="An open book lesson on breaking the internal translation loop and speaking in fluid thought-groups."
        >
          <div className="ls-frame ls-wide w-full relative">
            <div
              className="ls-stage w-full relative rounded-[28px] overflow-hidden"
              style={{ aspectRatio: "1180 / 762" } as React.CSSProperties}
              data-w="1180"
            >
              {/* ── REALISTIC OPEN BOOK SVG ILLUSTRATION (CLOTH COVER, 3D PAGE BLOCK, SPUR GUTTER) ── */}
              <svg
                className="ls-book absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 1180 762"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                <defs>
                  {/* Soft Ambient Book Desk Shadow */}
                  <filter id="book-shadow" x="-8%" y="-6%" width="116%" height="118%" colorInterpolationFilters="sRGB">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="16" result="blur1" />
                    <feOffset in="blur1" dx="0" dy="24" result="offset1" />
                    <feComponentTransfer in="offset1" result="shadow1">
                      <feFuncA type="linear" slope="0.22" />
                    </feComponentTransfer>

                    <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur2" />
                    <feOffset in="blur2" dx="0" dy="8" result="offset2" />
                    <feComponentTransfer in="offset2" result="shadow2">
                      <feFuncA type="linear" slope="0.18" />
                    </feComponentTransfer>

                    <feMerge>
                      <feMergeNode in="shadow1" />
                      <feMergeNode in="shadow2" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Magnifying Glass Drop Shadow */}
                  <filter id="glass-cast-shadow" x="-30%" y="-30%" width="180%" height="180%" colorInterpolationFilters="sRGB">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="9" result="blur" />
                    <feOffset in="blur" dx="14" dy="22" result="offset" />
                    <feComponentTransfer in="offset" result="shadow">
                      <feFuncA type="linear" slope="0.32" />
                    </feComponentTransfer>
                    <feMerge>
                      <feMergeNode in="shadow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Cloth Cover Texture Pattern */}
                  <pattern id="cloth-weave" width="6" height="6" patternUnits="userSpaceOnUse">
                    <rect width="6" height="6" fill="#8F6876" />
                    <path d="M0 3 L3 0 L6 3 L3 6 Z" fill="#99707F" fillOpacity="0.5" />
                    <circle cx="3" cy="3" r="0.75" fill="#7D5764" fillOpacity="0.6" />
                    <circle cx="0" cy="0" r="0.75" fill="#A57D8C" fillOpacity="0.35" />
                    <circle cx="6" cy="6" r="0.75" fill="#A57D8C" fillOpacity="0.35" />
                  </pattern>

                  {/* Fine Paper Texture Pattern */}
                  <pattern id="paper-grain" width="4" height="4" patternUnits="userSpaceOnUse">
                    <rect width="4" height="4" fill="#FCFBF8" />
                    <circle cx="1" cy="1" r="0.6" fill="#1D1C1A" fillOpacity="0.025" />
                    <circle cx="3" cy="3" r="0.5" fill="#1D1C1A" fillOpacity="0.02" />
                  </pattern>

                  {/* Spine Crease Shadow Gradient */}
                  <linearGradient id="spine-gutter-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2A241C" stopOpacity="0" />
                    <stop offset="35%" stopColor="#3E3427" stopOpacity="0.07" />
                    <stop offset="48%" stopColor="#1E1912" stopOpacity="0.38" />
                    <stop offset="50%" stopColor="#120F0B" stopOpacity="0.65" />
                    <stop offset="52%" stopColor="#1E1912" stopOpacity="0.38" />
                    <stop offset="65%" stopColor="#3E3427" stopOpacity="0.07" />
                    <stop offset="100%" stopColor="#2A241C" stopOpacity="0" />
                  </linearGradient>

                  {/* Left Page Curvature Light Gradient */}
                  <linearGradient id="page-curve-left" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#EDE7DB" stopOpacity="0.9" />
                    <stop offset="6%" stopColor="#F7F5EE" stopOpacity="0.95" />
                    <stop offset="15%" stopColor="#FCFBF8" />
                    <stop offset="85%" stopColor="#FCFBF8" />
                    <stop offset="96%" stopColor="#F2EDE2" />
                    <stop offset="100%" stopColor="#DFD8C7" />
                  </linearGradient>

                  {/* Right Page Curvature Light Gradient */}
                  <linearGradient id="page-curve-right" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#DFD8C7" />
                    <stop offset="4%" stopColor="#F2EDE2" />
                    <stop offset="15%" stopColor="#FCFBF8" />
                    <stop offset="85%" stopColor="#FCFBF8" />
                    <stop offset="94%" stopColor="#F7F5EE" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#EDE7DB" stopOpacity="0.9" />
                  </linearGradient>

                  {/* Brass Rim Gradients */}
                  <linearGradient id="brass-rim" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F7E6AC" />
                    <stop offset="20%" stopColor="#D9B250" />
                    <stop offset="45%" stopColor="#9C6F1E" />
                    <stop offset="70%" stopColor="#ECCF7D" />
                    <stop offset="88%" stopColor="#B6892E" />
                    <stop offset="100%" stopColor="#755010" />
                  </linearGradient>

                  {/* Wood Handle Gradient */}
                  <linearGradient id="wood-handle" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4A2F1D" />
                    <stop offset="25%" stopColor="#6E442A" />
                    <stop offset="50%" stopColor="#8A5737" />
                    <stop offset="75%" stopColor="#55341E" />
                    <stop offset="100%" stopColor="#301A0E" />
                  </linearGradient>

                  {/* Headband Fabric Pattern (Striped Spine Protector) */}
                  <pattern id="headband-stripes" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                    <rect width="3" height="6" fill="#E8DEC8" />
                    <rect x="3" width="3" height="6" fill="#8F6876" />
                  </pattern>
                </defs>

                {/* ── 1. OUTSIDE BOOK COVER (MAUVE / DUSTY PLUM CLOTH HARDBACK) ── */}
                <g filter="url(#book-shadow)">
                  {/* Outer Hardcover Board Base */}
                  <rect
                    x="56"
                    y="32"
                    width="1068"
                    height="698"
                    rx="18"
                    fill="url(#cloth-weave)"
                    stroke="#6D4855"
                    strokeWidth="1.5"
                  />

                  {/* Cover Edge Highlights & Shadow Insets */}
                  <rect
                    x="57.5"
                    y="33.5"
                    width="1065"
                    height="695"
                    rx="16.5"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.22)"
                    strokeWidth="1"
                  />
                  <rect
                    x="56"
                    y="32"
                    width="1068"
                    height="698"
                    rx="18"
                    fill="none"
                    stroke="rgba(40, 24, 30, 0.4)"
                    strokeWidth="2.5"
                  />

                  {/* Center Spine Ridge / Hinge Indentations */}
                  <line x1="586" y1="32" x2="586" y2="730" stroke="rgba(40, 24, 30, 0.55)" strokeWidth="2.5" />
                  <line x1="594" y1="32" x2="594" y2="730" stroke="rgba(40, 24, 30, 0.55)" strokeWidth="2.5" />
                  <line x1="590" y1="32" x2="590" y2="730" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
                </g>

                {/* ── 2. HEADBAND TABS AT TOP AND BOTTOM OF SPINE ── */}
                <rect x="581" y="36" width="18" height="12" rx="2" fill="url(#headband-stripes)" stroke="#5A3A45" strokeWidth="0.8" />
                <rect x="581" y="714" width="18" height="12" rx="2" fill="url(#headband-stripes)" stroke="#5A3A45" strokeWidth="0.8" />

                {/* ── 3. 3D PAGE BLOCK EDGES (STACKED PAGES THICKNESS) ── */}
                {/* Left Page Block (Outer Edge Thickness) */}
                <g opacity="0.92">
                  <path
                    d="M68 52 C74 50, 78 50, 84 50 L84 712 C78 712, 74 712, 68 710 Z"
                    fill="#E7DFD1"
                    stroke="#A49987"
                    strokeWidth="0.75"
                  />
                  {/* Layered page edge lines */}
                  <line x1="72" y1="53" x2="72" y2="709" stroke="#BEB39E" strokeWidth="0.7" />
                  <line x1="76" y1="52" x2="76" y2="710" stroke="#FAF8F2" strokeWidth="0.7" />
                  <line x1="80" y1="51" x2="80" y2="711" stroke="#C4B9A5" strokeWidth="0.7" />
                </g>

                {/* Right Page Block (Outer Edge Thickness) */}
                <g opacity="0.92">
                  <path
                    d="M1096 50 C1102 50, 1106 50, 1112 52 L1112 710 C1106 712, 1102 712, 1096 712 Z"
                    fill="#E7DFD1"
                    stroke="#A49987"
                    strokeWidth="0.75"
                  />
                  <line x1="1108" y1="53" x2="1108" y2="709" stroke="#BEB39E" strokeWidth="0.7" />
                  <line x1="1104" y1="52" x2="1104" y2="710" stroke="#FAF8F2" strokeWidth="0.7" />
                  <line x1="1100" y1="51" x2="1100" y2="711" stroke="#C4B9A5" strokeWidth="0.7" />
                </g>

                {/* Bottom Page Block Thickness */}
                <g opacity="0.9">
                  <path
                    d="M84 712 C280 718, 480 720, 584 716 L584 722 C480 726, 280 724, 80 716 Z"
                    fill="#DCD3C3"
                  />
                  <path
                    d="M596 716 C700 720, 900 718, 1096 712 L1100 716 C900 724, 700 726, 596 722 Z"
                    fill="#DCD3C3"
                  />
                </g>

                {/* ── 4. OPEN PAGES (VERSO & RECTO SPREAD) ── */}
                {/* Left Page (Verso) */}
                <path
                  d="M84 50 Q 82 50 82 54 L82 708 Q 82 712 86 712 L588 715 L588 47 L86 47 Q 84 47 84 50 Z"
                  fill="url(#page-curve-left)"
                  stroke="#D3C9B6"
                  strokeWidth="0.8"
                />
                <path
                  d="M84 50 Q 82 50 82 54 L82 708 Q 82 712 86 712 L588 715 L588 47 L86 47 Q 84 47 84 50 Z"
                  fill="url(#paper-grain)"
                  opacity="0.85"
                />

                {/* Right Page (Recto) */}
                <path
                  d="M592 47 L1094 47 Q 1098 47 1098 51 L1098 708 Q 1098 712 1094 712 L592 715 Z"
                  fill="url(#page-curve-right)"
                  stroke="#D3C9B6"
                  strokeWidth="0.8"
                />
                <path
                  d="M592 47 L1094 47 Q 1098 47 1098 51 L1098 708 Q 1098 712 1094 712 L592 715 Z"
                  fill="url(#paper-grain)"
                  opacity="0.85"
                />

                {/* ── 5. CENTER GUTTER & SPARK SEWING HOLES ── */}
                {/* Deep Spine Crease Shadow Overlay */}
                <rect x="548" y="46" width="84" height="670" fill="url(#spine-gutter-grad)" pointerEvents="none" />

                {/* Spine Center Line */}
                <line x1="590" y1="46" x2="590" y2="716" stroke="#261E15" strokeWidth="1.2" strokeOpacity="0.45" />

                {/* Book Sewing Stitch Holes Along Center Valley */}
                {[90, 160, 240, 320, 400, 480, 560, 640].map((y) => (
                  <g key={y} opacity="0.6">
                    <circle cx="590" cy={y} r="1.4" fill="#1A150F" />
                    <path d={`M588 ${y - 4} L592 ${y + 4}`} stroke="#9B8A72" strokeWidth="0.8" />
                  </g>
                ))}

                {/* Subtle Bookmark Ribbon Tail at bottom center */}
                <path
                  d="M587 714 Q 589 744, 574 756 L588 749 L602 756 Q 593 744, 591 714 Z"
                  fill="#B4400F"
                  stroke="#7A2805"
                  strokeWidth="0.8"
                  opacity="0.9"
                />
              </svg>

              {/* ── 6. LEFT PAGE (VERSO): THE WORKED EXAMPLE CONTENT ── */}
              <div
                className="ls-pg absolute z-10"
                style={{ left: "14.2%", top: "7.8%", width: "32.2%" } as React.CSSProperties}
              >
                {/* Header Running Folio */}
                <div className="ls-tb ls-verso-tb flex items-center justify-between pb-2 mb-3 border-b border-[#1D1C1A]/10 text-xs text-[#5E5B55] font-serif">
                  <span className="ls-num font-mono font-bold text-[#1D1C1A]">03</span>
                  <span className="ls-title italic tracking-wide">Spoken Fluency · Thought Groups</span>
                </div>

                <div className="ls-flow space-y-3">
                  <h3 className="ls-sec font-display text-xl sm:text-2xl font-normal tracking-tight text-[#1D1C1A] leading-snug">
                    Breaking the internal <i className="italic font-light">translation loop</i>
                  </h3>
                  <p className="ls-body text-xs sm:text-[13px] leading-relaxed text-[#2A2622] font-serif text-justify">
                    When you feel nervous in an English discussion, your brain attempts to translate complete sentences from your native language before speaking. This cognitive bottleneck causes vocal freezes and mental blanks. Native speakers do something simpler: they chunk speech into small, rhythmic thought-groups.
                  </p>

                  {/* Worked Example Box */}
                  <div className="ls-ex relative p-3 rounded-lg bg-[#FAF8F3] border-l-2 border-[#FF5A1F] border-t border-r border-b border-[#1D1C1A]/10 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                    <div className="flex items-center justify-between">
                      <p className="ls-ex-k text-[10px] font-mono font-bold text-[#FF5A1F] uppercase tracking-wider">
                        Worked Example 1.1
                      </p>
                      <span className="text-[10px] text-[#6A625A] font-mono">Cadence Flow</span>
                    </div>
                    <p className="ls-ex-t font-serif text-xs font-semibold text-[#1D1C1A] mt-0.5">
                      Deconstructing a spontaneous thought
                    </p>

                    <ol className="ls-steps text-[11px] font-serif mt-2 space-y-1.5 list-none pl-0">
                      <li className="pb-1 border-b border-dashed border-[#1D1C1A]/12">
                        <b className="font-sans block text-[10px] text-[#5E5B55] uppercase">1. Raw sentence in mind</b>
                        <span className="text-[#1D1C1A] italic">&ldquo;I think we should redesign our caching layer because latency is high.&rdquo;</span>
                      </li>
                      <li className="pb-1 border-b border-dashed border-[#1D1C1A]/12">
                        <b className="font-sans block text-[10px] text-[#2F6BD8] uppercase">2. Chunk into 3 thought-groups</b>
                        <span className="font-mono text-[10px] text-[#1D1C1A] block mt-0.5 font-medium bg-[#ECE7DC]/60 px-1.5 py-0.5 rounded">
                          [1. I think we should] → [2. redesign the caching layer] → [3. because latency is high.]
                        </span>
                      </li>
                      <li>
                        <b className="font-sans block text-[10px] text-[#23885A] uppercase">3. The 200ms micro-pause</b>
                        <span className="text-[#5E5B55] text-[10.5px] block leading-tight">
                          A calm 200ms silent breath between chunks eliminates the urge to use verbal fillers like &ldquo;um&rdquo; or &ldquo;like&rdquo;.
                        </span>
                      </li>
                    </ol>

                    {/* Acoustic Waveform Box */}
                    <div className="mt-2.5 p-2 rounded bg-[#F2EDE2]/70 border border-[#1D1C1A]/10 text-[10px] font-mono">
                      <div className="flex items-center justify-between text-[#6A625A] uppercase text-[9px] mb-1">
                        <span>Acoustic Cadence Flow</span>
                        <span className="text-[#23885A] font-bold">0 fillers</span>
                      </div>
                      <div className="text-[#1D1C1A] font-medium text-[10.5px]">
                        Chunk 1 <span className="text-[#23885A] font-bold">[200ms breath]</span> Chunk 2 <span className="text-[#23885A] font-bold">[150ms breath]</span> Chunk 3
                      </div>
                    </div>
                  </div>

                  <div className="ls-rule p-2 rounded bg-[#FAF8F3] border-l-2 border-[#1D1C1A] text-[11px] font-serif text-[#2A2622]">
                    <p className="font-sans font-bold text-[10px] uppercase text-[#1D1C1A]">The Golden Rule</p>
                    <p className="text-[10.5px] text-[#5E5B55] leading-tight mt-0.5">
                      Embrace deliberate silent pauses. Listeners perceive confident silence as thoughtful authority.
                    </p>
                  </div>
                </div>
              </div>

              {/* ── 7. RIGHT PAGE (RECTO): INTERACTIVE FLUENCY DIAGNOSTIC EXERCISE ── */}
              <div
                className="ls-pg absolute z-10"
                style={{ left: "53.4%", top: "7.8%", width: "32.2%" } as React.CSSProperties}
              >
                {/* Header Running Folio */}
                <div className="ls-tb ls-recto-tb flex items-center justify-between pb-2 mb-3 border-b border-[#1D1C1A]/10 text-xs text-[#5E5B55] font-serif">
                  <span className="ls-title italic tracking-wide">Fluency Diagnostic · Scenario</span>
                  <span className="ls-num font-mono font-bold text-[#1D1C1A]">33</span>
                </div>

                <div className="ls-flow space-y-3">
                  <h3 className="ls-sec font-display text-xl sm:text-2xl font-normal tracking-tight text-[#1D1C1A] leading-snug">
                    Your <i className="italic font-light">turn</i>
                  </h3>
                  <p className="ls-body text-xs sm:text-[13px] leading-relaxed text-[#2A2622] font-serif">
                    An interviewer or teammate asks an unexpected question: <em className="italic font-serif">&ldquo;What was the most difficult architectural conflict you resolved?&rdquo;</em>
                  </p>

                  <div className="ls-ex p-3 rounded-lg bg-[#FAF8F3] border border-[#1D1C1A]/12 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                    <p className="ls-ex-k text-[10px] font-mono font-bold text-[#FF5A1F] uppercase tracking-wider">
                      Interactive Scenario
                    </p>
                    <p className="ls-ex-t font-serif text-xs font-semibold text-[#1D1C1A] mt-0.5 mb-2.5">
                      What is the most effective way to begin your answer?
                    </p>

                    <ol className="ls-opts space-y-1.5 list-none pl-0" role="radiogroup" aria-label="Question options">
                      {[
                        {
                          id: 0,
                          text: "Start talking immediately at maximum speed so they know you are fast.",
                          correct: false,
                        },
                        {
                          id: 1,
                          text: "Take a 2-second silent breath, anchor your first thought-group, and begin with calm composure.",
                          correct: true,
                        },
                        {
                          id: 2,
                          text: "Recite a memorized script word-for-word from memory.",
                          correct: false,
                        },
                        {
                          id: 3,
                          text: "Repeat 'um, um, so basically...' while trying to remember details.",
                          correct: false,
                        },
                      ].map((opt) => (
                        <li
                          key={opt.id}
                          className={`p-2 rounded-md border text-[11px] cursor-pointer transition-all flex items-start gap-2 ${
                            selectedOpt === opt.id
                              ? opt.correct
                                ? "bg-[#23885A]/10 border-[#23885A] text-[#1D1C1A]"
                                : "bg-[#D23F2A]/10 border-[#D23F2A] text-[#1D1C1A]"
                              : "bg-[#FFFFFF] border-[#1D1C1A]/15 hover:border-[#1D1C1A]/40 text-[#2A2622]"
                          }`}
                          onClick={() => setSelectedOpt(opt.id)}
                        >
                          <span className="font-mono font-bold text-[10px] text-[#5E5B55] mt-0.5">
                            {String.fromCharCode(65 + opt.id)}.
                          </span>
                          <span className="leading-tight">{opt.text}</span>
                        </li>
                      ))}
                    </ol>

                    {selectedOpt !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2.5 p-2.5 rounded bg-[#FCFBF8] border border-[#1D1C1A]/15 text-[11px] shadow-sm"
                      >
                        <p className="font-bold font-serif text-[#1D1C1A]">
                          {selectedOpt === 1 ? "✓ Correct!" : "✗ Think again:"}
                        </p>
                        <p className="text-[#5E5B55] font-serif mt-0.5 text-[10.5px] leading-relaxed">
                          Top speakers pause up to 3 seconds before answering difficult questions. A silent pause gives your brain time to form clean thought-groups without cognitive panic.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              {/* ── 8. REALISTIC READING MAGNIFYING GLASS HOVERING OVER WORKED EXAMPLE ── */}
              <motion.div
                className="ls-glass-container absolute pointer-events-none z-20"
                style={{
                  left: "17%",
                  top: "33%",
                  width: "220px",
                  height: "220px",
                }}
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <svg
                  viewBox="0 0 260 260"
                  className="w-full h-full overflow-visible drop-shadow-[14px_24px_18px_rgba(40,28,14,0.36)]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="mg-brass" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFF2B8" />
                      <stop offset="20%" stopColor="#E0B64C" />
                      <stop offset="40%" stopColor="#A47720" />
                      <stop offset="65%" stopColor="#F5DF8C" />
                      <stop offset="85%" stopColor="#BD8F2A" />
                      <stop offset="100%" stopColor="#755012" />
                    </linearGradient>

                    <linearGradient id="mg-wood" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B2213" />
                      <stop offset="25%" stopColor="#5C361F" />
                      <stop offset="50%" stopColor="#7A4B2C" />
                      <stop offset="75%" stopColor="#4A2A17" />
                      <stop offset="100%" stopColor="#2A160A" />
                    </linearGradient>

                    <radialGradient id="mg-lens-specular" cx="35%" cy="30%" r="65%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
                      <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.1" />
                      <stop offset="75%" stopColor="#FAF7EE" stopOpacity="0" />
                      <stop offset="100%" stopColor="#3C2A18" stopOpacity="0.15" />
                    </radialGradient>

                    {/* Lens Clip Area */}
                    <clipPath id="mg-lens-clip">
                      <circle cx="110" cy="110" r="74" />
                    </clipPath>
                  </defs>

                  {/* ── TURNED WOODEN HANDLE WITH BRASS FERRULE ── */}
                  <g transform="rotate(42 110 110)">
                    {/* Brass Mount Neck on Rim */}
                    <rect x="104" y="184" width="12" height="14" rx="2" fill="url(#mg-brass)" stroke="#664610" strokeWidth="0.8" />
                    <line x1="104" y1="188" x2="116" y2="188" stroke="#FFE9A0" strokeWidth="0.8" />

                    {/* Brass Ferrule (Collar connecting wood to metal) */}
                    <rect x="102" y="196" width="16" height="12" rx="2" fill="url(#mg-brass)" stroke="#664610" strokeWidth="0.8" />
                    <line x1="102" y1="202" x2="118" y2="202" stroke="#FFF2B8" strokeWidth="1" />

                    {/* Lathe-Turned Walnut Handle */}
                    <path
                      d="M103 208 C100 220, 98 238, 102 250 C104 256, 107 260, 110 260 C113 260, 116 256, 118 250 C122 238, 120 220, 117 208 Z"
                      fill="url(#mg-wood)"
                      stroke="#221107"
                      strokeWidth="1.2"
                    />

                    {/* Handle Turned Grips Highlights */}
                    <ellipse cx="110" cy="226" rx="9" ry="3" fill="#8E5734" fillOpacity="0.6" />
                    <ellipse cx="110" cy="242" rx="10" ry="3.5" fill="#8E5734" fillOpacity="0.6" />
                    <circle cx="110" cy="257" r="4.5" fill="url(#mg-brass)" stroke="#664610" strokeWidth="0.6" />
                  </g>

                  {/* ── LENS CIRCLE WITH MAGNIFIED WORKED PREVIEW ── */}
                  <g clipPath="url(#mg-lens-clip)">
                    {/* Magnified paper background */}
                    <rect x="30" y="30" width="160" height="160" fill="#FCFAF4" />

                    {/* Magnified View of the Spoken Thought-Group Architecture */}
                    <g transform="translate(38, 54)">
                      <text x="0" y="12" fontFamily="JetBrains Mono Variable, monospace" fontSize="8.5" fontWeight="700" fill="#FF5A1F" letterSpacing="0.06em">
                        ACOUSTIC CADENCE
                      </text>
                      <text x="0" y="30" fontFamily="Fraunces, Georgia, serif" fontSize="13" fontWeight="600" fill="#1D1C1A">
                        &ldquo;I think we should&rdquo;
                      </text>
                      <g transform="translate(0, 38)">
                        <rect x="0" y="0" width="138" height="20" rx="4" fill="#23885A" fillOpacity="0.12" stroke="#23885A" strokeWidth="0.8" />
                        <text x="6" y="13" fontFamily="JetBrains Mono Variable, monospace" fontSize="9" fontWeight="700" fill="#23885A">
                          [200ms silent breath]
                        </text>
                      </g>
                      <text x="0" y="74" fontFamily="JetBrains Mono Variable, monospace" fontSize="8" fontWeight="600" fill="#2F6BD8">
                        → chunk 2: &ldquo;redesign layer&rdquo;
                      </text>
                      <text x="0" y="88" fontFamily="JetBrains Mono Variable, monospace" fontSize="7.5" fill="#6A625A">
                        ● Zero fillers · High authority
                      </text>
                    </g>

                    {/* Glass Specular Glare & Soft Curvature Reflection */}
                    <circle cx="110" cy="110" r="74" fill="url(#mg-lens-specular)" />

                    {/* Crescent Glass Edge Glare Arc */}
                    <path
                      d="M50 78 A 72 72 0 0 1 146 44"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="3"
                      strokeLinecap="round"
                      opacity="0.75"
                    />
                    <path
                      d="M56 86 A 68 68 0 0 1 138 52"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      opacity="0.45"
                    />

                    {/* Bottom-right glass bounce ring */}
                    <path
                      d="M148 152 A 72 72 0 0 1 84 176"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      opacity="0.4"
                    />
                  </g>

                  {/* ── BRASS CIRCULAR RIM ── */}
                  {/* Outer Bevel Rim */}
                  <circle
                    cx="110"
                    cy="110"
                    r="81"
                    stroke="url(#mg-brass)"
                    strokeWidth="14"
                    fill="none"
                  />
                  {/* Outer Brass Lip */}
                  <circle
                    cx="110"
                    cy="110"
                    r="88"
                    stroke="#5A3A0A"
                    strokeWidth="1.2"
                    fill="none"
                  />
                  {/* Inner Brass Lip */}
                  <circle
                    cx="110"
                    cy="110"
                    r="74"
                    stroke="#382203"
                    strokeWidth="1.4"
                    fill="none"
                  />
                  {/* Specular Highlight on Brass Rim */}
                  <path
                    d="M50 64 A 81 81 0 0 1 146 36"
                    stroke="#FFF6D1"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.85"
                  />
                </svg>
              </motion.div>
            </div>
          </div>
        </figure>
      </AnimateIn>

      {/* ── BOTTOM CALL TO ACTION LINK ── */}
      <AnimateIn direction="up" distance={16} duration={0.6} delay={0.25}>
        <p className="ls-more text-center mt-8">
          <Link
            className="ls-link inline-flex items-center gap-2 font-body font-medium text-base text-[#1D1C1A] pb-0.5 border-b-2 border-[#1D1C1A]/30 hover:border-[#1D1C1A] transition-colors"
            href="/dashboard/practice"
          >
            Explore all spoken fluency modules
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </p>
      </AnimateIn>
    </section>
  );
}
