"use client";

import React from "react";
import Link from "next/link";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/ui/AnimateIn";

export default function MoreThanLessons() {
  return (
    <>
      <section className="mo-more" id="practice" aria-labelledby="mo-h">
        <AnimateIn direction="up" distance={20} duration={0.6}>
          <div className="mo-head">
            <h2 className="mo-h2" id="mo-h">
              More than <i>lessons</i>.
            </h2>
            <p className="mo-sub">Put what you read to work.</p>
          </div>
        </AnimateIn>

        <StaggerContainer stagger={0.12} delay={0.1} className="mo-cards">
          {/* ── CARD 1: DAILY PRACTICE ── */}
          <StaggerItem className="h-full">
            <li className="mo-card mo-card-practice h-full">
              <figure className="mo-field">
                <svg
                  className="mo-svg"
                  viewBox="0 0 340 300"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="A card file of practice questions. Today's set is at the front; dividers behind it say tomorrow, this week and next week. A card you missed, two dice and the question 4 or 9, is lifted out and goes back in behind tomorrow."
                >
                  <defs>
                    <filter id="mo-pa-blur" x="-20%" y="-300%" width="140%" height="700%">
                      <feGaussianBlur stdDeviation="3" />
                    </filter>
                    <filter id="mo-pa-soft" x="-10%" y="-20%" width="120%" height="160%">
                      <feGaussianBlur stdDeviation="3.5" />
                    </filter>
                  </defs>

                  {/* Centered Group (shifted +2px X, -24px Y to center in 340x300) */}
                  <g transform="translate(2, -24)">
                    <ellipse cx="206" cy="302" rx="124" ry="4.5" fill="rgb(60,48,30)" opacity=".2" filter="url(#mo-pa-blur)" />
                    <path d="M94 198 H318" fill="none" stroke="#1D1C1A" strokeWidth="1.5" />

                    {/* Back stack: Next week */}
                    <rect x="94" y="178.2" width="224" height="80" rx="1.5" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="0.85" />
                    <rect x="94" y="180.84" width="224" height="80" rx="1.5" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="0.85" />
                    <rect x="94" y="183.48" width="224" height="80" rx="1.5" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="0.85" />
                    <path d="M246 186.72 V172.12 Q 246 169.12 249 169.12 H315 Q 318 169.12 318 172.12 V186.72" fill="#EEE4CC" stroke="#1D1C1A" strokeWidth="1.1" strokeLinejoin="round" />
                    <text x="282" y="181.52" fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace" fontSize="11.2" fontWeight="600" fill="#1D1C1A" textAnchor="middle" letterSpacing="-.01em">
                      next week
                    </text>

                    {/* Mid stack: This week */}
                    <rect x="94" y="186.12" width="224" height="80" rx="1.5" fill="#EEE4CC" stroke="#1D1C1A" strokeWidth="1.1" />
                    <rect x="94" y="188.76" width="224" height="80" rx="1.5" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="0.85" />
                    <rect x="94" y="191.4" width="224" height="80" rx="1.5" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="0.85" />
                    <rect x="94" y="194.04" width="224" height="80" rx="1.5" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="0.85" />
                    <path d="M170 197.28 V182.68 Q 170 179.68 173 179.68 H239 Q 242 179.68 242 182.68 V197.28" fill="#EEE4CC" stroke="#1D1C1A" strokeWidth="1.1" strokeLinejoin="round" />
                    <text x="206" y="192.08" fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace" fontSize="11.2" fontWeight="600" fill="#1D1C1A" textAnchor="middle" letterSpacing="-.01em">
                      this week
                    </text>

                    {/* Front stack: Tomorrow */}
                    <rect x="94" y="196.68" width="224" height="80" rx="1.5" fill="#EEE4CC" stroke="#1D1C1A" strokeWidth="1.1" />
                    <rect x="94" y="199.32" width="224" height="80" rx="1.5" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="0.85" />
                    <rect x="94" y="201.96" width="224" height="80" rx="1.5" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="0.85" />
                    <rect x="94" y="204.6" width="224" height="80" rx="1.5" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="0.85" />
                    <path d="M94 207.84 V193.24 Q 94 190.24 97 190.24 H163 Q 166 190.24 166 193.24 V207.84" fill="#EEE4CC" stroke="#1D1C1A" strokeWidth="1.1" strokeLinejoin="round" />
                    <text x="130" y="202.64" fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace" fontSize="11.2" fontWeight="600" fill="#1D1C1A" textAnchor="middle" letterSpacing="-.01em">
                      tomorrow
                    </text>

                    {/* Today cards */}
                    <rect x="94" y="207.24" width="224" height="80" rx="1.5" fill="#EEE4CC" stroke="#1D1C1A" strokeWidth="1.1" />
                    <rect x="94" y="209.88" width="224" height="80" rx="1.5" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="0.85" />
                    <rect x="94" y="212.52" width="224" height="80" rx="1.5" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="0.85" />
                    <rect x="94" y="215.16" width="224" height="80" rx="1.5" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="0.85" />
                    <rect x="94" y="217.8" width="224" height="80" rx="1.5" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="0.85" />

                    {/* Index Box Front */}
                    <path d="M88 198 V248 M324 198 V248" fill="none" stroke="#1D1C1A" strokeWidth="1.5" />
                    <path d="M88 246 Q 88 242 92 242 H320 Q 324 242 324 246 V292 Q 324 300 316 300 H96 Q 88 300 88 292 Z" fill="#F3EFE6" stroke="#1D1C1A" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M91 247 H321" stroke="#1D1C1A" strokeWidth=".9" strokeOpacity=".5" />
                    <path d="M96 296.5 H316" stroke="#1D1C1A" strokeWidth=".8" strokeOpacity=".22" />

                    {/* Brass Label Plate */}
                    <g transform="translate(206 266)">
                      <rect x="-30" y="-11" width="60" height="22" rx="2.5" fill="#D9C08F" stroke="#1D1C1A" strokeWidth="1.2" />
                      <rect x="-25" y="-7" width="50" height="14" rx="1" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth=".8" />
                      <g transform="translate(-6 -6) scale(0.12)">
                        <path d="M52.2 50L52.2 9A20.5 20.5 0 0 1 52.2 50ZM50 52.2L91 52.2A20.5 20.5 0 0 1 50 52.2ZM47.8 50L47.8 91A20.5 20.5 0 0 1 47.8 50ZM50 47.8L9 47.8A20.5 20.5 0 0 1 50 47.8Z" fill="#1D1C1A" />
                      </g>
                      <circle cx="-27.5" cy="0" r="1.2" fill="#1D1C1A" />
                      <circle cx="27.5" cy="0" r="1.2" fill="#1D1C1A" />
                    </g>

                    {/* Drawer Pull */}
                    <g transform="translate(206 286)" fill="none" stroke="#1D1C1A">
                      <path d="M-7 0 h14" strokeWidth="2.6" strokeLinecap="round" />
                      <path d="M-9 1.5 A9 9 0 0 0 9 1.5" strokeWidth="1.6" />
                    </g>

                    {/* Floating Missed Card */}
                    <g transform="rotate(3.5 202 92)">
                      <rect x="92" y="57" width="224" height="80" rx="2" fill="rgb(60,48,30)" opacity=".18" filter="url(#mo-pa-soft)" />
                      <rect x="90" y="52" width="224" height="80" rx="2" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1.3" />
                      <path d="M100 64 H304" stroke="#FF5A1F" strokeWidth="1.5" />
                      <path d="M100 76 H304" stroke="#9FB7D1" strokeWidth=".8" strokeOpacity=".75" />
                      <path d="M100 88 H304" stroke="#9FB7D1" strokeWidth=".8" strokeOpacity=".75" />
                      <path d="M100 100 H304" stroke="#9FB7D1" strokeWidth=".8" strokeOpacity=".75" />
                      <path d="M100 112 H304" stroke="#9FB7D1" strokeWidth=".8" strokeOpacity=".75" />
                      <path d="M100 124 H304" stroke="#9FB7D1" strokeWidth=".8" strokeOpacity=".75" />

                      {/* Die 1 (3) */}
                      <g transform="translate(136 97) rotate(-9)">
                        <rect x="-13" y="-13" width="26" height="26" rx="5.2" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1.3" />
                        <circle cx="-7.02" cy="-7.02" r="1.95" fill="#1D1C1A" />
                        <circle cx="0" cy="0" r="1.95" fill="#1D1C1A" />
                        <circle cx="7.02" cy="7.02" r="1.95" fill="#1D1C1A" />
                      </g>

                      {/* Die 2 (5) */}
                      <g transform="translate(169 101) rotate(8)">
                        <rect x="-13" y="-13" width="26" height="26" rx="5.2" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1.3" />
                        <circle cx="-7.02" cy="-7.02" r="1.95" fill="#1D1C1A" />
                        <circle cx="7.02" cy="-7.02" r="1.95" fill="#1D1C1A" />
                        <circle cx="0" cy="0" r="1.95" fill="#1D1C1A" />
                        <circle cx="-7.02" cy="7.02" r="1.95" fill="#1D1C1A" />
                        <circle cx="7.02" cy="7.02" r="1.95" fill="#1D1C1A" />
                      </g>

                      <text
                        x="198"
                        y="109"
                        fontFamily="Fraunces, Georgia, serif"
                        fontSize="28"
                        fontWeight="360"
                        fill="#1D1C1A"
                        style={{ fontVariationSettings: "'opsz' 144" } as React.CSSProperties}
                        letterSpacing="-.02em"
                      >
                        4 <tspan>or</tspan> 9?
                      </text>
                    </g>

                    {/* Re-queue dashed arrow */}
                    <path d="M120 140 C 114 172, 170 165.24, 170 203.24" fill="none" stroke="#FF5A1F" strokeWidth="1.9" strokeDasharray="4 3.4" strokeLinecap="round" />
                    <path d="M165.4 197.24 L170 204.24 L174.6 197.24" fill="none" stroke="#FF5A1F" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />

                    {/* Callout: today */}
                    <g>
                      <path d="M110 224.68 L70 224.68" fill="none" stroke="#1D1C1A" strokeWidth="1" strokeOpacity=".62" />
                      <circle cx="110" cy="224.68" r="2.2" fill="#1D1C1A" />
                      <text
                        x="65"
                        y="228.58"
                        fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace"
                        fontSize="12"
                        fontWeight="500"
                        fill="#3E3B37"
                        textAnchor="end"
                        letterSpacing="-.01em"
                        stroke="#B4C9B5"
                        strokeWidth="4.5"
                        strokeLinejoin="round"
                        paintOrder="stroke"
                      >
                        today
                      </text>
                    </g>

                    {/* Callout: missed */}
                    <g>
                      <path d="M104 76 L70 76" fill="none" stroke="#1D1C1A" strokeWidth="1" strokeOpacity=".62" />
                      <circle cx="104" cy="76" r="2.2" fill="#1D1C1A" />
                      <text
                        x="65"
                        y="79.9"
                        fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace"
                        fontSize="12"
                        fontWeight="500"
                        fill="#3E3B37"
                        textAnchor="end"
                        letterSpacing="-.01em"
                        stroke="#B4C9B5"
                        strokeWidth="4.5"
                        strokeLinejoin="round"
                        paintOrder="stroke"
                      >
                        missed
                      </text>
                    </g>
                  </g>
                </svg>
              </figure>

              <div className="mo-paper">
                <h3 className="mo-h3">
                  Daily <i>practice</i>
                </h3>
                <p className="mo-line">A few questions a day, so what you read stays with you.</p>
                <Link className="mo-key" href="/dashboard/practice">
                  Start practising
                  <svg className="mo-arrow" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                    <path d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </li>
          </StaggerItem>

          {/* ── CARD 2: TRAIN YOUR VOICE ── */}
          <StaggerItem className="h-full">
            <li className="mo-card mo-card-build h-full">
              <figure className="mo-field">
                <svg
                  className="mo-svg"
                  viewBox="0 0 340 300"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="An acoustic speech analysis schematic: voice spectrogram, thought-group segmentation, filler suppression, and pitch contour."
                >
                  {/* Centered Group (shifted -10px X, -32px Y to fit cleanly inside 340x300) */}
                  <g transform="translate(-10, -32)">
                    {/* Base Strip */}
                    <g stroke="#1D1C1A" strokeWidth="1.3" strokeLinejoin="round">
                      <path d="M148.7 233.15 L301.47 321.35 L301.47 322.95 L148.7 234.75 Z" fill="#F1ECE2" />
                      <path d="M317.92 311.85 L301.47 321.35 L301.47 322.95 L317.92 313.45 Z" fill="#E4DED2" />
                      <path d="M165.16 223.65 L317.92 311.85 L301.47 321.35 L148.7 233.15 Z" fill="#FCFBF8" />
                    </g>

                    {/* Isometric Text: First Citizen: */}
                    <g transform="matrix(0.87 0.5 -0.87 0.5 150 224.4)">
                      <text x="14.3" y="4" textAnchor="middle" fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace" fontSize="12.4" fontWeight="600" fill="#1D1C1A">F</text>
                      <path d="M20.6 -9.5 V9.5" stroke="#1D1C1A" strokeWidth=".8" strokeOpacity=".4" />
                      <text x="26.9" y="4" textAnchor="middle" fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace" fontSize="12.4" fontWeight="600" fill="#1D1C1A">i</text>
                      <path d="M33.2 -9.5 V9.5" stroke="#1D1C1A" strokeWidth=".8" strokeOpacity=".4" />
                      <text x="39.5" y="4" textAnchor="middle" fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace" fontSize="12.4" fontWeight="600" fill="#1D1C1A">r</text>
                      <path d="M45.8 -9.5 V9.5" stroke="#1D1C1A" strokeWidth=".8" strokeOpacity=".4" />
                      <text x="52.1" y="4" textAnchor="middle" fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace" fontSize="12.4" fontWeight="600" fill="#1D1C1A">s</text>
                      <path d="M58.4 -9.5 V9.5" stroke="#1D1C1A" strokeWidth=".8" strokeOpacity=".4" />
                      <text x="64.7" y="4" textAnchor="middle" fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace" fontSize="12.4" fontWeight="600" fill="#1D1C1A">t</text>
                      <path d="M71 -9.5 V9.5" stroke="#1D1C1A" strokeWidth=".8" strokeOpacity=".4" />
                      <path d="M83.6 -9.5 V9.5" stroke="#1D1C1A" strokeWidth=".8" strokeOpacity=".4" />
                      <text x="89.9" y="4" textAnchor="middle" fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace" fontSize="12.4" fontWeight="600" fill="#1D1C1A">C</text>
                      <path d="M96.2 -9.5 V9.5" stroke="#1D1C1A" strokeWidth=".8" strokeOpacity=".4" />
                      <text x="102.5" y="4" textAnchor="middle" fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace" fontSize="12.4" fontWeight="600" fill="#1D1C1A">i</text>
                      <path d="M108.8 -9.5 V9.5" stroke="#1D1C1A" strokeWidth=".8" strokeOpacity=".4" />
                      <text x="115.1" y="4" textAnchor="middle" fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace" fontSize="12.4" fontWeight="600" fill="#1D1C1A">t</text>
                      <path d="M121.4 -9.5 V9.5" stroke="#1D1C1A" strokeWidth=".8" strokeOpacity=".4" />
                      <text x="127.7" y="4" textAnchor="middle" fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace" fontSize="12.4" fontWeight="600" fill="#1D1C1A">i</text>
                      <path d="M134 -9.5 V9.5" stroke="#1D1C1A" strokeWidth=".8" strokeOpacity=".4" />
                      <text x="140.3" y="4" textAnchor="middle" fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace" fontSize="12.4" fontWeight="600" fill="#1D1C1A">z</text>
                      <path d="M146.6 -9.5 V9.5" stroke="#1D1C1A" strokeWidth=".8" strokeOpacity=".4" />
                      <text x="152.9" y="4" textAnchor="middle" fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace" fontSize="12.4" fontWeight="600" fill="#1D1C1A">e</text>
                      <path d="M159.2 -9.5 V9.5" stroke="#1D1C1A" strokeWidth=".8" strokeOpacity=".4" />
                      <text x="165.5" y="4" textAnchor="middle" fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace" fontSize="12.4" fontWeight="600" fill="#1D1C1A">n</text>
                      <path d="M171.8 -9.5 V9.5" stroke="#1D1C1A" strokeWidth=".8" strokeOpacity=".4" />
                      <text x="178.1" y="4" textAnchor="middle" fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace" fontSize="12.4" fontWeight="600" fill="#1D1C1A">:</text>
                    </g>

                    {/* Vertical Axis Guide */}
                    <path d="M150 240 V198" stroke="#1D1C1A" strokeWidth="1" strokeDasharray="6 3 1.5 3" strokeOpacity=".5" />

                    {/* Layer 1: Grid Plate */}
                    <g stroke="#1D1C1A" strokeWidth="1.3" strokeLinejoin="round">
                      <path d="M91.11 192 L150 226 L150 232 L91.11 198 Z" fill="#EEE9DF" />
                      <path d="M208.89 192 L150 226 L150 232 L208.89 198 Z" fill="#DFD9CD" />
                      <path d="M150 158 L208.89 192 L150 226 L91.11 192 Z" fill="#FCFBF8" />
                    </g>
                    <g transform="matrix(0.87 0.5 -0.87 0.5 150 192)">
                      <path d="M-25.5 -34 V34 M-34 -25.5 H34" stroke="#1D1C1A" strokeWidth=".7" strokeOpacity=".28" />
                      <path d="M-17 -34 V34 M-34 -17 H34" stroke="#1D1C1A" strokeWidth=".7" strokeOpacity=".28" />
                      <path d="M-8.5 -34 V34 M-34 -8.5 H34" stroke="#1D1C1A" strokeWidth=".7" strokeOpacity=".28" />
                      <path d="M0 -34 V34 M-34 0 H34" stroke="#1D1C1A" strokeWidth=".7" strokeOpacity=".28" />
                      <path d="M8.5 -34 V34 M-34 8.5 H34" stroke="#1D1C1A" strokeWidth=".7" strokeOpacity=".28" />
                      <path d="M17 -34 V34 M-34 17 H34" stroke="#1D1C1A" strokeWidth=".7" strokeOpacity=".28" />
                      <path d="M25.5 -34 V34 M-34 25.5 H34" stroke="#1D1C1A" strokeWidth=".7" strokeOpacity=".28" />
                      <rect x="-34" y="17" width="68" height="8.5" fill="#1D1C1A" fillOpacity=".1" />
                    </g>

                    {/* Stacked Middle Plates */}
                    <path d="M150 192 V176" stroke="#1D1C1A" strokeWidth="1" strokeDasharray="6 3 1.5 3" strokeOpacity=".5" />
                    <g stroke="#1D1C1A" strokeWidth="1.3" strokeLinejoin="round">
                      <path d="M91.11 170 L150 204 L150 210 L91.11 176 Z" fill="#EEE9DF" />
                      <path d="M208.89 170 L150 204 L150 210 L208.89 176 Z" fill="#DFD9CD" />
                      <path d="M150 136 L208.89 170 L150 204 L91.11 170 Z" fill="#FCFBF8" />
                    </g>

                    <path d="M150 170 V165.6" stroke="#1D1C1A" strokeWidth="1" strokeDasharray="6 3 1.5 3" strokeOpacity=".5" />
                    <g stroke="#1D1C1A" strokeWidth="1.3" strokeLinejoin="round">
                      <path d="M91.11 159.6 L150 193.6 L150 199.6 L91.11 165.6 Z" fill="#EEE9DF" />
                      <path d="M208.89 159.6 L150 193.6 L150 199.6 L208.89 165.6 Z" fill="#DFD9CD" />
                      <path d="M150 125.6 L208.89 159.6 L150 193.6 L91.11 159.6 Z" fill="#FCFBF8" />
                    </g>

                    <path d="M150 159.6 V155.2" stroke="#1D1C1A" strokeWidth="1" strokeDasharray="6 3 1.5 3" strokeOpacity=".5" />
                    <g stroke="#1D1C1A" strokeWidth="1.3" strokeLinejoin="round">
                      <path d="M91.11 149.2 L150 183.2 L150 189.2 L91.11 155.2 Z" fill="#EEE9DF" />
                      <path d="M208.89 149.2 L150 183.2 L150 189.2 L208.89 155.2 Z" fill="#DFD9CD" />
                      <path d="M150 115.2 L208.89 149.2 L150 183.2 L91.11 149.2 Z" fill="#FCFBF8" />
                    </g>

                    {/* Attention Arcs Plate */}
                    <path d="M150 149.2 V144.8" stroke="#1D1C1A" strokeWidth="1" strokeDasharray="6 3 1.5 3" strokeOpacity=".5" />
                    <g stroke="#1D1C1A" strokeWidth="1.3" strokeLinejoin="round">
                      <path d="M91.11 138.8 L150 172.8 L150 178.8 L91.11 144.8 Z" fill="#EEE9DF" />
                      <path d="M208.89 138.8 L150 172.8 L150 178.8 L208.89 144.8 Z" fill="#DFD9CD" />
                      <path d="M150 104.8 L208.89 138.8 L150 172.8 L91.11 138.8 Z" fill="#FCFBF8" />
                    </g>
                    <g transform="matrix(0.87 0.5 -0.87 0.5 150 138.8)">
                      <path d="M26 24.5 C 26 2, -24 2, -24 24.5" fill="none" stroke="#1D1C1A" strokeWidth="0.6" strokeOpacity="0.5" />
                      <path d="M26 24.5 C 26 6.2, -14 6.2, -14 24.5" fill="none" stroke="#1D1C1A" strokeWidth="2" strokeOpacity="0.9" />
                      <path d="M26 24.5 C 26 10.4, -4 10.4, -4 24.5" fill="none" stroke="#1D1C1A" strokeWidth="0.7" strokeOpacity="0.5" />
                      <path d="M26 24.5 C 26 14.6, 6 14.6, 6 24.5" fill="none" stroke="#1D1C1A" strokeWidth="1.3" strokeOpacity="0.9" />
                      <path d="M26 24.5 C 26 18.8, 16 18.8, 16 24.5" fill="none" stroke="#1D1C1A" strokeWidth="0.8" strokeOpacity="0.5" />
                      <circle cx="-24" cy="27" r="2.3" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1" />
                      <circle cx="-14" cy="27" r="2.3" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1" />
                      <circle cx="-4" cy="27" r="2.3" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1" />
                      <circle cx="6" cy="27" r="2.3" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1" />
                      <circle cx="16" cy="27" r="2.3" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1" />
                      <circle cx="26" cy="27" r="2.3" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1" />
                    </g>

                    {/* Top Plate: Isometric Frequency Bars */}
                    <path d="M150 138.8 V114.8" stroke="#1D1C1A" strokeWidth="1" strokeDasharray="6 3 1.5 3" strokeOpacity=".5" />
                    <g stroke="#1D1C1A" strokeWidth="1.3" strokeLinejoin="round">
                      <path d="M91.11 109.8 L150 143.8 L150 148.8 L91.11 114.8 Z" fill="#EEE9DF" />
                      <path d="M208.89 109.8 L150 143.8 L150 148.8 L208.89 114.8 Z" fill="#DFD9CD" />
                      <path d="M150 75.8 L208.89 109.8 L150 143.8 L91.11 109.8 Z" fill="#FCFBF8" />
                    </g>

                    {/* Bar 1 */}
                    <g stroke="#1D1C1A" strokeWidth="1" strokeLinejoin="round">
                      <path d="M125.06 92.8 L129.22 95.2 L129.22 100.2 L125.06 97.8 Z" fill="#EEE9DF" />
                      <path d="M133.37 92.8 L129.22 95.2 L129.22 100.2 L133.37 97.8 Z" fill="#DFD9CD" />
                      <path d="M129.22 90.4 L133.37 92.8 L129.22 95.2 L125.06 92.8 Z" fill="#FCFBF8" />
                    </g>
                    {/* Bar 2 */}
                    <g stroke="#1D1C1A" strokeWidth="1" strokeLinejoin="round">
                      <path d="M131.99 92.8 L136.14 95.2 L136.14 104.2 L131.99 101.8 Z" fill="#EEE9DF" />
                      <path d="M140.3 92.8 L136.14 95.2 L136.14 104.2 L140.3 101.8 Z" fill="#DFD9CD" />
                      <path d="M136.14 90.4 L140.3 92.8 L136.14 95.2 L131.99 92.8 Z" fill="#FCFBF8" />
                    </g>
                    {/* Bar 3 */}
                    <g stroke="#1D1C1A" strokeWidth="1" strokeLinejoin="round">
                      <path d="M138.91 101.8 L143.07 104.2 L143.07 108.2 L138.91 105.8 Z" fill="#EEE9DF" />
                      <path d="M147.23 101.8 L143.07 104.2 L143.07 108.2 L147.23 105.8 Z" fill="#DFD9CD" />
                      <path d="M143.07 99.4 L147.23 101.8 L143.07 104.2 L138.91 101.8 Z" fill="#FCFBF8" />
                    </g>
                    {/* Bar 4 */}
                    <g stroke="#1D1C1A" strokeWidth="1" strokeLinejoin="round">
                      <path d="M145.84 102.8 L150 105.2 L150 112.2 L145.84 109.8 Z" fill="#EEE9DF" />
                      <path d="M154.16 102.8 L150 105.2 L150 112.2 L154.16 109.8 Z" fill="#DFD9CD" />
                      <path d="M150 100.4 L154.16 102.8 L150 105.2 L145.84 102.8 Z" fill="#FCFBF8" />
                    </g>
                    {/* Bar 5 (Highlight Orange) */}
                    <g stroke="#A8380C" strokeWidth="1" strokeLinejoin="round">
                      <path d="M152.77 90.8 L156.93 93.2 L156.93 116.2 L152.77 113.8 Z" fill="#FF5A1F" />
                      <path d="M161.09 90.8 L156.93 93.2 L156.93 116.2 L161.09 113.8 Z" fill="#D9480F" />
                      <path d="M156.93 88.4 L161.09 90.8 L156.93 93.2 L152.77 90.8 Z" fill="#FF8A5C" />
                    </g>
                    {/* Bar 6 */}
                    <g stroke="#1D1C1A" strokeWidth="1" strokeLinejoin="round">
                      <path d="M159.7 111.8 L163.86 114.2 L163.86 120.2 L159.7 117.8 Z" fill="#EEE9DF" />
                      <path d="M168.01 111.8 L163.86 114.2 L163.86 120.2 L168.01 117.8 Z" fill="#DFD9CD" />
                      <path d="M163.86 109.4 L168.01 111.8 L163.86 114.2 L159.7 111.8 Z" fill="#FCFBF8" />
                    </g>
                    {/* Bar 7 */}
                    <g stroke="#1D1C1A" strokeWidth="1" strokeLinejoin="round">
                      <path d="M166.63 118.8 L170.78 121.2 L170.78 124.2 L166.63 121.8 Z" fill="#EEE9DF" />
                      <path d="M174.94 118.8 L170.78 121.2 L170.78 124.2 L174.94 121.8 Z" fill="#DFD9CD" />
                      <path d="M170.78 116.4 L174.94 118.8 L170.78 121.2 L166.63 118.8 Z" fill="#FCFBF8" />
                    </g>

                    {/* Dimension Bracket: Acoustic Engine */}
                    <g stroke="#1D1C1A" strokeWidth="1" strokeOpacity=".62">
                      <path d="M212.89 182 H227.89 M212.89 138.8 H227.89 M222.89 182 V138.8" />
                      <path d="M219.89 177 L222.89 182 L225.89 177 M219.89 143.8 L222.89 138.8 L225.89 143.8" fill="none" />
                    </g>
                    <text
                      x="231"
                      y="164.2"
                      fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace"
                      fontSize="12"
                      fontWeight="500"
                      fill="#3E3B37"
                      textAnchor="start"
                      letterSpacing="-.02em"
                      stroke="#B3C2D6"
                      strokeWidth="4.5"
                      strokeLinejoin="round"
                      paintOrder="stroke"
                    >
                      Acoustic Engine
                    </text>

                    {/* Callout: Speech Audio Stream */}
                    <g>
                      <path d="M252.36 294.6 L236.36 310.6 L206.36 310.6" fill="none" stroke="#1D1C1A" strokeWidth="1" strokeOpacity=".62" />
                      <circle cx="252.36" cy="294.6" r="2.2" fill="#1D1C1A" />
                      <text
                        x="201.36"
                        y="314.5"
                        fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace"
                        fontSize="12"
                        fontWeight="500"
                        fill="#3E3B37"
                        textAnchor="end"
                        letterSpacing="-.01em"
                        stroke="#B3C2D6"
                        strokeWidth="4.5"
                        strokeLinejoin="round"
                        paintOrder="stroke"
                      >
                        Speech Audio Stream
                      </text>
                    </g>

                    {/* Callout: Cadence & Pacing */}
                    <g>
                      <path d="M156.93 90.8 L180.93 72.8 L226 72.8" fill="none" stroke="#1D1C1A" strokeWidth="1" strokeOpacity=".62" />
                      <circle cx="156.93" cy="90.8" r="2.2" fill="#1D1C1A" />
                      <text
                        x="230"
                        y="76.7"
                        fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace"
                        fontSize="12"
                        fontWeight="500"
                        fill="#3E3B37"
                        textAnchor="start"
                        letterSpacing="-.02em"
                        stroke="#B3C2D6"
                        strokeWidth="4.5"
                        strokeLinejoin="round"
                        paintOrder="stroke"
                      >
                        Cadence &amp; Pacing
                      </text>
                    </g>

                    {/* Top-Left Metric Badge */}
                    <path d="M91.11 112.3 L56 66" fill="none" stroke="#1D1C1A" strokeWidth="1" strokeOpacity=".62" />
                    <circle cx="91.11" cy="112.3" r="2.2" fill="#1D1C1A" />
                    <g>
                      <rect x="24" y="44" width="128" height="24" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1.1" />
                      <text x="62" y="60.2" textAnchor="middle" fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace" fontSize="12" fontWeight="500" fill="#1D1C1A">
                        Fluency
                      </text>
                      <text x="120" y="60.2" textAnchor="middle" fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace" fontSize="11" fontWeight="700" fill="#B4400F">
                        9.8 / 10
                      </text>
                    </g>
                  </g>
                </svg>
              </figure>

              <div className="mo-paper">
                <h3 className="mo-h3">
                  Train your <i>voice</i>
                </h3>
                <p className="mo-line">Real projects you build and run on your own machine.</p>
                <Link className="mo-key" href="/dashboard/aicoach">
                  Explore the speech lab
                  <svg className="mo-arrow" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                    <path d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </li>
          </StaggerItem>

          {/* ── CARD 3: INTERVIEW PREP ── */}
          <StaggerItem className="h-full">
            <li className="mo-card mo-card-interview h-full">
              <figure className="mo-field">
                <svg
                  className="mo-svg"
                  viewBox="0 0 340 300"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="A floor plan of a Tech & Behavioral Interview Journey. One room per round: Online test, Phone round, Making a market, Betting games and The final chat. An orange route runs in through the front door and through every room in order."
                >
                  <defs>
                    <pattern id="mo-pi-g" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M10 0 H0 V10" fill="none" stroke="#3B6EA8" strokeOpacity=".10" strokeWidth=".6" />
                    </pattern>
                    <filter id="mo-pi-sh" x="-10%" y="-10%" width="120%" height="130%">
                      <feGaussianBlur stdDeviation="4" />
                    </filter>
                  </defs>

                  {/* Centered Blueprint Sheet (shifted -10px X, -10px Y so 316x284 sits cleanly in 340x300) */}
                  <g transform="translate(-10, -10)">
                    <rect x="24" y="22" width="316" height="284" rx="3" fill="rgb(60,48,30)" opacity=".22" filter="url(#mo-pi-sh)" />
                    <rect x="22" y="18" width="316" height="284" rx="3" fill="#FCFBF8" />
                    <rect x="22" y="18" width="316" height="284" rx="3" fill="url(#mo-pi-g)" />

                    {/* Furniture & Icons */}
                    <rect x="52" y="168" width="12" height="44" rx="2" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1.1" strokeLinejoin="round" />
                    <g transform="translate(118 176)">
                      <circle r="7" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1.1" strokeLinejoin="round" />
                      <path d="M0 0 L9 0 M0 0 L4.5 7.79 M0 0 L-4.5 7.79 M0 0 L-9 0 M0 0 L-4.5 -7.79 M0 0 L4.5 -7.79" stroke="#1D1C1A" strokeWidth=".9" />
                    </g>

                    {/* Room 1: Online test desk */}
                    <rect x="52" y="72" width="52" height="26" rx="1.5" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1.1" strokeLinejoin="round" />
                    <rect x="61" y="77" width="30" height="17" rx="2" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1.1" strokeLinejoin="round" />
                    <path d="M61 80.5 H91" stroke="#1D1C1A" strokeWidth="1" />
                    <g transform="translate(78 110)">
                      <rect x="-6.5" y="-6" width="13" height="12" rx="3" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1.1" strokeLinejoin="round" />
                      <path d="M-6.5 -3.5 H6.5" stroke="#1D1C1A" strokeWidth="1.1" />
                    </g>
                    <g transform="translate(117 85)">
                      <circle r="9" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1.1" strokeLinejoin="round" />
                      <path d="M0 -6 V0 L4 3" fill="none" stroke="#1D1C1A" strokeWidth="1.2" strokeLinecap="round" />
                    </g>

                    {/* Room 2: Behavioral Screen */}
                    <g transform="translate(176 100)">
                      <rect x="-17" y="-14" width="34" height="30" rx="5" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1.1" strokeLinejoin="round" />
                      <rect x="-17" y="-14" width="34" height="8" rx="3" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1.1" strokeLinejoin="round" />
                      <rect x="-17" y="-8" width="6" height="24" rx="3" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1.1" strokeLinejoin="round" />
                      <rect x="11" y="-8" width="6" height="24" rx="3" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1.1" strokeLinejoin="round" />
                    </g>
                    <circle cx="198" cy="128" r="9" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1.1" strokeLinejoin="round" />
                    <rect x="194.5" y="122" width="7" height="12" rx="1.8" fill="#1D1C1A" />
                    <path d="M206 121 q4 7 0 14 M210 118 q7 10 0 20" fill="none" stroke="#1D1C1A" strokeWidth="1" strokeLinecap="round" />

                    {/* Room 3: System Design Defense */}
                    <rect x="252" y="88" width="56" height="30" rx="2" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1.1" strokeLinejoin="round" />
                    <rect x="255" y="93" width="50" height="20" rx="2" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1.1" strokeLinejoin="round" />
                    <path d="M280 93 V113" stroke="#1D1C1A" strokeWidth="1" />
                    <text x="267.5" y="107.2" textAnchor="middle" fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace" fontSize="11.6" fontWeight="700" fill="#1D1C1A">
                      4.5
                    </text>
                    <text x="292.5" y="107.2" textAnchor="middle" fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace" fontSize="11.6" fontWeight="700" fill="#1D1C1A">
                      5.5
                    </text>
                    <g transform="translate(280 81) rotate(180)">
                      <rect x="-6.5" y="-6" width="13" height="12" rx="3" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1.1" strokeLinejoin="round" />
                      <path d="M-6.5 -3.5 H6.5" stroke="#1D1C1A" strokeWidth="1.1" />
                    </g>
                    <g transform="translate(280 125)">
                      <rect x="-6.5" y="-6" width="13" height="12" rx="3" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1.1" strokeLinejoin="round" />
                      <path d="M-6.5 -3.5 H6.5" stroke="#1D1C1A" strokeWidth="1.1" />
                    </g>

                    {/* Room 4: Executive Debate */}
                    <rect x="260" y="198" width="36" height="36" rx="2" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1.1" strokeLinejoin="round" />
                    <g transform="translate(271 211) rotate(-10)">
                      <rect x="-6" y="-6" width="12" height="12" rx="2.4" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1" />
                      <circle cx="-3.24" cy="-3.24" r="0.9" fill="#1D1C1A" />
                      <circle cx="3.24" cy="-3.24" r="0.9" fill="#1D1C1A" />
                      <circle cx="0" cy="0" r="0.9" fill="#1D1C1A" />
                      <circle cx="-3.24" cy="3.24" r="0.9" fill="#1D1C1A" />
                      <circle cx="3.24" cy="3.24" r="0.9" fill="#1D1C1A" />
                    </g>
                    <g transform="translate(285 221) rotate(12)">
                      <rect x="-6" y="-6" width="12" height="12" rx="2.4" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1" />
                      <circle cx="-3.24" cy="-3.24" r="0.9" fill="#1D1C1A" />
                      <circle cx="3.24" cy="3.24" r="0.9" fill="#1D1C1A" />
                    </g>
                    <g transform="translate(252 216) rotate(90)">
                      <rect x="-6.5" y="-6" width="13" height="12" rx="3" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1.1" strokeLinejoin="round" />
                      <path d="M-6.5 -3.5 H6.5" stroke="#1D1C1A" strokeWidth="1.1" />
                    </g>
                    <g transform="translate(304 216) rotate(-90)">
                      <rect x="-6.5" y="-6" width="13" height="12" rx="3" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1.1" strokeLinejoin="round" />
                      <path d="M-6.5 -3.5 H6.5" stroke="#1D1C1A" strokeWidth="1.1" />
                    </g>

                    {/* Room 5: Partner Offer Round */}
                    <circle cx="178" cy="210" r="15" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1.1" strokeLinejoin="round" />
                    <g transform="translate(158 196) rotate(135)">
                      <rect x="-6.5" y="-6" width="13" height="12" rx="3" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1.1" strokeLinejoin="round" />
                      <path d="M-6.5 -3.5 H6.5" stroke="#1D1C1A" strokeWidth="1.1" />
                    </g>
                    <g transform="translate(198 224) rotate(-45)">
                      <rect x="-6.5" y="-6" width="13" height="12" rx="3" fill="#FCFBF8" stroke="#1D1C1A" strokeWidth="1.1" strokeLinejoin="round" />
                      <path d="M-6.5 -3.5 H6.5" stroke="#1D1C1A" strokeWidth="1.1" />
                    </g>

                    {/* Architectural Walls & Doors */}
                    <rect x="44" y="40" width="272" height="206" fill="none" stroke="#1D1C1A" strokeWidth="7" />
                    <path d="M132 40 V246 M222 40 V246 M44 146 H316" stroke="#1D1C1A" strokeWidth="3.6" />

                    {/* Door Gaps */}
                    <rect x="80" y="241.5" width="24" height="9" fill="#FCFBF8" />
                    <rect x="80" y="143.2" width="24" height="5.6" fill="#FCFBF8" />
                    <rect x="129.2" y="80" width="5.6" height="24" fill="#FCFBF8" />
                    <rect x="219.2" y="80" width="5.6" height="24" fill="#FCFBF8" />
                    <rect x="288" y="143.2" width="24" height="5.6" fill="#FCFBF8" />
                    <rect x="219.2" y="188" width="5.6" height="24" fill="#FCFBF8" />

                    {/* Door Swings */}
                    <path d="M80 246 V222" stroke="#1D1C1A" strokeWidth="1.2" />
                    <path d="M80 222 A24 24 0 0 1 104 246" fill="none" stroke="#1D1C1A" strokeWidth=".8" strokeOpacity=".55" />
                    <path d="M80 146 V122" stroke="#1D1C1A" strokeWidth="1.2" />
                    <path d="M80 122 A24 24 0 0 1 104 146" fill="none" stroke="#1D1C1A" strokeWidth=".8" strokeOpacity=".55" />
                    <path d="M132 80 H156" stroke="#1D1C1A" strokeWidth="1.2" />
                    <path d="M156 80 A24 24 0 0 1 132 104" fill="none" stroke="#1D1C1A" strokeWidth=".8" strokeOpacity=".55" />
                    <path d="M222 80 H246" stroke="#1D1C1A" strokeWidth="1.2" />
                    <path d="M246 80 A24 24 0 0 1 222 104" fill="none" stroke="#1D1C1A" strokeWidth=".8" strokeOpacity=".55" />
                    <path d="M288 146 V122" stroke="#1D1C1A" strokeWidth="1.2" />
                    <path d="M288 122 A24 24 0 0 1 312 146" fill="none" stroke="#1D1C1A" strokeWidth=".8" strokeOpacity=".55" />
                    <path d="M222 188 H246" stroke="#1D1C1A" strokeWidth="1.2" />
                    <path d="M246 188 A24 24 0 0 1 222 212" fill="none" stroke="#1D1C1A" strokeWidth=".8" strokeOpacity=".55" />

                    {/* Room Labels (Fitted cleanly inside column widths) */}
                    <text x="51" y="56" fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace" fontSize="11" fontWeight="600" fill="#1D1C1A" textAnchor="start" letterSpacing="-.03em">
                      Online test
                    </text>
                    <text x="139" y="56" fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace" fontSize="11" fontWeight="600" fill="#1D1C1A" textAnchor="start" letterSpacing="-.03em">
                      Behavioral
                    </text>
                    <text x="139" y="69" fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace" fontSize="11" fontWeight="600" fill="#1D1C1A" textAnchor="start" letterSpacing="-.03em">
                      Screen
                    </text>
                    <text x="229" y="56" fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace" fontSize="11" fontWeight="600" fill="#1D1C1A" textAnchor="start" letterSpacing="-.03em">
                      System Design
                    </text>
                    <text x="229" y="69" fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace" fontSize="11" fontWeight="600" fill="#1D1C1A" textAnchor="start" letterSpacing="-.03em">
                      Defense
                    </text>
                    <text x="229" y="162" fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace" fontSize="11" fontWeight="600" fill="#1D1C1A" textAnchor="start" letterSpacing="-.03em">
                      Executive
                    </text>
                    <text x="229" y="175" fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace" fontSize="11" fontWeight="600" fill="#1D1C1A" textAnchor="start" letterSpacing="-.03em">
                      Debate
                    </text>
                    <text x="139" y="162" fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace" fontSize="11" fontWeight="600" fill="#1D1C1A" textAnchor="start" letterSpacing="-.03em">
                      Partner
                    </text>
                    <text x="139" y="175" fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace" fontSize="11" fontWeight="600" fill="#1D1C1A" textAnchor="start" letterSpacing="-.03em">
                      Offer Round
                    </text>

                    {/* Path Route */}
                    <path
                      d="M92 288 Q 92 288 92 275 Q 92 262 92 242 Q 92 222 92 197 Q 92 172 92 154 Q 92 136 94 127 Q 96 118 104 108 Q 112 98 126 95 Q 140 92 145 86 Q 150 80 170 77 Q 190 74 206 83 Q 222 92 229 107 Q 236 122 247 128 Q 258 134 275 135 Q 292 136 296 141 Q 300 146 300 153 Q 300 160 295 169 Q 290 178 276 183.5 Q 262 189 251 191.5 Q 240 194 231 197 Q 222 200 214 203.5 L206 207"
                      fill="none"
                      stroke="#FF5A1F"
                      strokeWidth="2"
                      strokeDasharray="1 5"
                      strokeLinecap="round"
                    />
                    <circle cx="92" cy="292" r="3.4" fill="#FF5A1F" />
                    <circle cx="203" cy="207" r="3.4" fill="#FF5A1F" />

                    {/* Blueprint Stamp */}
                    <text
                      x="316"
                      y="284"
                      textAnchor="end"
                      fontFamily="Fraunces, Georgia, serif"
                      fontSize="19"
                      fontWeight="380"
                      fill="#1D1C1A"
                      style={{ fontVariationSettings: "'opsz' 144" } as React.CSSProperties}
                      letterSpacing="-.02em"
                    >
                      Tech <tspan>Trader</tspan>
                    </text>
                  </g>
                </svg>
              </figure>

              <div className="mo-paper">
                <h3 className="mo-h3">
                  Interview <i>prep</i>
                </h3>
                <p className="mo-line">Know every round, in order, before you walk in.</p>
                <Link className="mo-key" href="/dashboard/matchmaking">
                  Start peer practice
                  <svg className="mo-arrow" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                    <path d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </li>
          </StaggerItem>
        </StaggerContainer>
      </section>
    </>
  );
}