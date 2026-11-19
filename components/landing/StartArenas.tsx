"use client";

import React from "react";
import Link from "next/link";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/ui/AnimateIn";

export default function StartArenas() {
  return (
    <section className="sc-start" id="arenas" aria-labelledby="sc-start-h">
      <AnimateIn direction="up" distance={20} duration={0.6}>
        <div className="sc-head">
          <h2 className="sc-h2" id="sc-start-h">
            Choose your speaking <i>arena</i>.
          </h2>
          <p className="sc-sub">
            Three deliberate practice arenas, designed to eliminate conversational hesitation.
          </p>
        </div>
      </AnimateIn>

      <StaggerContainer stagger={0.12} delay={0.1} className="sc-cards sc-three">
        {/* ── CARD 1: CONVERSATIONAL FLUENCY (PEACH) ── */}
        <StaggerItem className="h-full">
          <li className="sc-subj sc-fluency h-full">
            <figure className="sc-art">
              <svg
                className="sc-svg sc-wide"
                viewBox="0 0 640 444"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Conversational Fluency: speech cadence waveform, thought-group flow, and natural pacing analysis."
              >
                <defs>
                  <pattern id="grain-fluency" width="4" height="4" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r=".8" fill="rgba(29, 28, 26, .08)" />
                  </pattern>
                  <linearGradient id="wave-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2F6BD8" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#7B4FD3" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#FF5A1F" stopOpacity="0.85" />
                  </linearGradient>
                </defs>

                {/* Outer Background Plate (592x396 centered in 640x444 -> 24px margin) */}
                <rect x="24" y="24" width="592" height="396" rx="20" fill="#FCFBF8" />
                <rect x="24" y="24" width="592" height="396" rx="20" fill="url(#grain-fluency)" />
                <rect x="24" y="24" width="592" height="396" rx="20" fill="none" stroke="#1D1C1A" strokeWidth="1.6" strokeOpacity="0.15" />

                {/* Safe Content Grid: x=56 to x=584 (Width: 528px) */}
                <g transform="translate(56, 56)">
                  <rect x="0" y="0" width="168" height="26" rx="6" fill="#F1EFEA" stroke="#1D1C1A" strokeWidth="1" strokeOpacity="0.12" />
                  <circle cx="14" cy="13" r="4" fill="#23885A" />
                  <text x="26" y="17" fontFamily="JetBrains Mono Variable, monospace" fontSize="10.5" fontWeight="600" fill="#1D1C1A">
                    LIVE SPOKEN PROMPT
                  </text>

                  <text x="0" y="56" fontFamily="Fraunces, Georgia, serif" fontSize="21.5" fontStyle="italic" fill="#1D1C1A" letterSpacing="-0.02em">
                    &ldquo;How do you handle technical pushback in a team?&rdquo;
                  </text>
                </g>

                {/* Thought Group Chunks Container (Total width = 528px: 156 + 26 + 164 + 26 + 156) */}
                <g transform="translate(56, 142)">
                  {/* Chunk 1 */}
                  <g transform="translate(0, 0)">
                    <rect x="0" y="0" width="156" height="76" rx="10" fill="#F3F1EC" stroke="#1D1C1A" strokeWidth="1.2" strokeOpacity="0.18" />
                    <text x="14" y="25" fontFamily="JetBrains Mono Variable, monospace" fontSize="9" fill="#6A625A">
                      CHUNK 1 · 180ms PAUSE
                    </text>
                    <text x="14" y="52" fontFamily="Satoshi, sans-serif" fontSize="13.5" fontWeight="600" fill="#1D1C1A">
                      &ldquo;I listen actively first,&rdquo;
                    </text>
                  </g>

                  {/* Arrow 1 (x: 156 -> 182) */}
                  <path d="M160 38 L174 38" stroke="#1D1C1A" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 3" />
                  <polygon points="178,38 172,34 172,42" fill="#1D1C1A" />

                  {/* Chunk 2 */}
                  <g transform="translate(182, 0)">
                    <rect x="0" y="0" width="164" height="76" rx="10" fill="#F3F1EC" stroke="#1D1C1A" strokeWidth="1.2" strokeOpacity="0.18" />
                    <text x="14" y="25" fontFamily="JetBrains Mono Variable, monospace" fontSize="9" fill="#6A625A">
                      CHUNK 2 · STEADY PACE
                    </text>
                    <text x="14" y="52" fontFamily="Satoshi, sans-serif" fontSize="13.5" fontWeight="600" fill="#1D1C1A">
                      &ldquo;find shared priorities,&rdquo;
                    </text>
                  </g>

                  {/* Arrow 2 (x: 346 -> 372) */}
                  <path d="M350 38 L364 38" stroke="#1D1C1A" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 3" />
                  <polygon points="368,38 362,34 362,42" fill="#1D1C1A" />

                  {/* Chunk 3 (ends at 372 + 156 = 528px) */}
                  <g transform="translate(372, 0)">
                    <rect x="0" y="0" width="156" height="76" rx="10" fill="#1D1C1A" />
                    <text x="14" y="25" fontFamily="JetBrains Mono Variable, monospace" fontSize="9" fill="#A9CBC6">
                      CHUNK 3 · CONCLUSION
                    </text>
                    <text x="14" y="52" fontFamily="Satoshi, sans-serif" fontSize="13.5" fontWeight="600" fill="#FCFBF8">
                      &ldquo;then run an A/B test.&rdquo;
                    </text>
                  </g>
                </g>

                {/* Dynamic Waveform & Metric Bar (Width: 528px, Bottom aligned at y=388) */}
                <g transform="translate(56, 242)">
                  <rect x="0" y="0" width="528" height="146" rx="12" fill="#FFFFFF" stroke="#1D1C1A" strokeWidth="1.2" strokeOpacity="0.14" />

                  {/* Live Metrics evenly spaced */}
                  <g transform="translate(20, 26)">
                    <text x="0" y="0" fontFamily="JetBrains Mono Variable, monospace" fontSize="10" fontWeight="600" fill="#23885A">
                      ● PACING: 138 WPM
                    </text>
                    <text x="176" y="0" fontFamily="JetBrains Mono Variable, monospace" fontSize="10" fontWeight="600" fill="#2F6BD8">
                      ● FILLER WORDS: 0
                    </text>
                    <text x="344" y="0" fontFamily="JetBrains Mono Variable, monospace" fontSize="10" fontWeight="600" fill="#7B4FD3">
                      ● ARTICULATION: 98%
                    </text>
                  </g>

                  <line x1="20" y1="82" x2="508" y2="82" stroke="#1D1C1A" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="4 4" />

                  <path
                    d="M20 82 Q 54 34, 94 82 T 174 82 T 254 48 T 334 96 T 414 58 T 508 82"
                    fill="none"
                    stroke="url(#wave-grad-1)"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />

                  <text x="20" y="128" fontFamily="JetBrains Mono Variable, monospace" fontSize="9.5" fill="#97938B">
                    SPEECH ENGINE: Acoustic cadence smooth · Zero cognitive translation delay
                  </text>
                </g>
              </svg>
            </figure>

            <div className="sc-foot">
              <div className="sc-words">
                <h3 className="sc-h3">
                  Conversational <i>fluency</i>
                </h3>
                <p className="sc-line">
                  Master spontaneous speech, connect thoughts into fluid groups, and speak without hesitating.
                </p>
              </div>
              <Link
                className="sc-key"
                href="/dashboard/practice"
                aria-label="Start with Conversational Fluency"
              >
                Enter fluency arena
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </li>
        </StaggerItem>

        {/* ── CARD 2: PRONUNCIATION & CLARITY (LAVENDER) ── */}
        <StaggerItem className="h-full">
          <li className="sc-subj sc-phonetics h-full">
            <figure className="sc-art">
              <svg
                className="sc-svg sc-wide"
                viewBox="0 0 640 444"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Pronunciation & Clarity: phonetic formants, vowel stress, and acoustic resonance analysis."
              >
                <defs>
                  <pattern id="grain-phonetics" width="4" height="4" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r=".8" fill="rgba(29, 28, 26, .08)" />
                  </pattern>
                </defs>

                <rect x="24" y="24" width="592" height="396" rx="20" fill="#FCFBF8" />
                <rect x="24" y="24" width="592" height="396" rx="20" fill="url(#grain-phonetics)" />
                <rect x="24" y="24" width="592" height="396" rx="20" fill="none" stroke="#1D1C1A" strokeWidth="1.6" strokeOpacity="0.15" />

                {/* Safe Content Grid: x=56 to x=584 (Width: 528px) */}
                <g transform="translate(56, 56)">
                  <rect x="0" y="0" width="168" height="26" rx="6" fill="#F1EFEA" stroke="#1D1C1A" strokeWidth="1" strokeOpacity="0.12" />
                  <circle cx="14" cy="13" r="4" fill="#7B4FD3" />
                  <text x="26" y="17" fontFamily="JetBrains Mono Variable, monospace" fontSize="10.5" fontWeight="600" fill="#1D1C1A">
                    ACOUSTIC PHONETICS
                  </text>

                  <text x="0" y="56" fontFamily="Fraunces, Georgia, serif" fontSize="21.5" fontStyle="italic" fill="#1D1C1A" letterSpacing="-0.02em">
                    Precision vowel resonance &amp; syllable stress curves
                  </text>
                </g>

                {/* Three Phonetic Word Cards (Total width = 528px: 165 + 16.5 + 165 + 16.5 + 165) */}
                <g transform="translate(56, 142)">
                  {/* Word 1 */}
                  <g transform="translate(0, 0)">
                    <rect x="0" y="0" width="165" height="114" rx="12" fill="#FFFFFF" stroke="#1D1C1A" strokeWidth="1.2" strokeOpacity="0.16" />
                    <text x="16" y="30" fontFamily="Satoshi, sans-serif" fontSize="15" fontWeight="700" fill="#1D1C1A">
                      Articulate
                    </text>
                    <text x="16" y="50" fontFamily="JetBrains Mono Variable, monospace" fontSize="11" fill="#7B4FD3">
                      /ɑːˈtɪk.jə.lət/
                    </text>
                    <line x1="16" y1="66" x2="149" y2="66" stroke="#1D1C1A" strokeWidth="1" strokeOpacity="0.08" />
                    <text x="16" y="83" fontFamily="JetBrains Mono Variable, monospace" fontSize="9" fill="#6A625A">
                      STRESS: 2nd syllable
                    </text>
                    <text x="16" y="99" fontFamily="JetBrains Mono Variable, monospace" fontSize="9" fontWeight="600" fill="#23885A">
                      CLARITY: 99.1%
                    </text>
                  </g>

                  {/* Word 2 */}
                  <g transform="translate(181.5, 0)">
                    <rect x="0" y="0" width="165" height="114" rx="12" fill="#FFFFFF" stroke="#1D1C1A" strokeWidth="1.2" strokeOpacity="0.16" />
                    <text x="16" y="30" fontFamily="Satoshi, sans-serif" fontSize="15" fontWeight="700" fill="#1D1C1A">
                      Deliberate
                    </text>
                    <text x="16" y="50" fontFamily="JetBrains Mono Variable, monospace" fontSize="11" fill="#7B4FD3">
                      /dɪˈlɪb.ər.ət/
                    </text>
                    <line x1="16" y1="66" x2="149" y2="66" stroke="#1D1C1A" strokeWidth="1" strokeOpacity="0.08" />
                    <text x="16" y="83" fontFamily="JetBrains Mono Variable, monospace" fontSize="9" fill="#6A625A">
                      VOWEL: Short /ɪ/
                    </text>
                    <text x="16" y="99" fontFamily="JetBrains Mono Variable, monospace" fontSize="9" fontWeight="600" fill="#23885A">
                      CLARITY: 97.8%
                    </text>
                  </g>

                  {/* Word 3 (ends at 363 + 165 = 528px) */}
                  <g transform="translate(363, 0)">
                    <rect x="0" y="0" width="165" height="114" rx="12" fill="#1D1C1A" />
                    <text x="16" y="30" fontFamily="Satoshi, sans-serif" fontSize="15" fontWeight="700" fill="#FCFBF8">
                      Hierarchy
                    </text>
                    <text x="16" y="50" fontFamily="JetBrains Mono Variable, monospace" fontSize="11" fill="#C9BCD6">
                      /ˈhaɪə.rɑː.ki/
                    </text>
                    <line x1="16" y1="66" x2="149" y2="66" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.15" />
                    <text x="16" y="83" fontFamily="JetBrains Mono Variable, monospace" fontSize="9" fill="#97938B">
                      DIPHTHONG: /aɪə/
                    </text>
                    <text x="16" y="99" fontFamily="JetBrains Mono Variable, monospace" fontSize="9" fontWeight="600" fill="#A9CBC6">
                      CLARITY: 98.4%
                    </text>
                  </g>
                </g>

                {/* Formant Frequency Contour (Width: 528px, Bottom aligned at y=388) */}
                <g transform="translate(56, 276)">
                  <rect x="0" y="0" width="528" height="112" rx="12" fill="#FFFFFF" stroke="#1D1C1A" strokeWidth="1.2" strokeOpacity="0.14" />

                  <text x="24" y="26" fontFamily="JetBrains Mono Variable, monospace" fontSize="10" fontWeight="600" fill="#1D1C1A">
                    FORMANT SPECTRUM F1 / F2 · ZERO MUMBLE DETECTED
                  </text>

                  {/* 31 Formant bars centered from x=24 to x=504 (span 480px, step 16px) */}
                  {Array.from({ length: 31 }, (_, i) => {
                    const x = 24 + i * 16;
                    const h = 20 + Math.sin(i * 0.45) * 16 + (i % 3 === 0 ? 12 : 0);
                    return (
                      <line
                        key={x}
                        x1={x}
                        y1={92}
                        x2={x}
                        y2={92 - h}
                        stroke={i % 2 === 0 ? "#7B4FD3" : "#C9BCD6"}
                        strokeWidth="3.2"
                        strokeLinecap="round"
                      />
                    );
                  })}
                </g>
              </svg>
            </figure>

            <div className="sc-foot">
              <div className="sc-words">
                <h3 className="sc-h3">
                  Pronunciation &amp; <i>clarity</i>
                </h3>
                <p className="sc-line">
                  Train vocal muscle memory for crisp diction, accent confidence, and natural syllable stress.
                </p>
              </div>
              <Link
                className="sc-key"
                href="/dashboard/practice"
                aria-label="Start with Pronunciation & Clarity"
              >
                Enter phonetics lab
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </li>
        </StaggerItem>

        {/* ── CARD 3: BEHAVIORAL & TECH INTERVIEWS (PARCHMENT / SAGE) ── */}
        <StaggerItem className="h-full">
          <li className="sc-subj sc-interviews h-full">
            <figure className="sc-art">
              <svg
                className="sc-svg sc-wide"
                viewBox="0 0 640 444"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Behavioral & Executive Interviews: STAR response framework, composure matrix, and live evaluation."
              >
                <defs>
                  <pattern id="grain-interviews" width="4" height="4" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r=".8" fill="rgba(29, 28, 26, .08)" />
                  </pattern>
                  <clipPath id="star-window-clip">
                    <rect x="0" y="0" width="364" height="246" rx="14" />
                  </clipPath>
                </defs>

                <rect x="24" y="24" width="592" height="396" rx="20" fill="#FCFBF8" />
                <rect x="24" y="24" width="592" height="396" rx="20" fill="url(#grain-interviews)" />
                <rect x="24" y="24" width="592" height="396" rx="20" fill="none" stroke="#1D1C1A" strokeWidth="1.6" strokeOpacity="0.15" />

                {/* Safe Content Grid: x=56 to x=584 (Width: 528px) */}
                <g transform="translate(56, 56)">
                  <rect x="0" y="0" width="186" height="26" rx="6" fill="#F1EFEA" stroke="#1D1C1A" strokeWidth="1" strokeOpacity="0.12" />
                  <circle cx="14" cy="13" r="4" fill="#FF5A1F" />
                  <text x="26" y="17" fontFamily="JetBrains Mono Variable, monospace" fontSize="10.5" fontWeight="600" fill="#1D1C1A">
                    HIGH-STAKES INTERVIEW
                  </text>

                  <text x="0" y="56" fontFamily="Fraunces, Georgia, serif" fontSize="21.5" fontStyle="italic" fill="#1D1C1A" letterSpacing="-0.02em">
                    Executive storytelling &amp; composure under pressure
                  </text>
                </g>

                {/* STAR Framework Response Architecture (Width: 364px, Bottom aligned at y=388) */}
                <g transform="translate(56, 142)">
                  <g clipPath="url(#star-window-clip)">
                    <rect x="0" y="0" width="364" height="246" fill="#FFFFFF" />
                    {/* Window header */}
                    <rect x="0" y="0" width="364" height="34" fill="#F3F1EC" />
                    <line x1="0" y1="34" x2="364" y2="34" stroke="#1D1C1A" strokeWidth="1" strokeOpacity="0.1" />
                    <circle cx="16" cy="17" r="4" fill="#D23F2A" />
                    <circle cx="28" cy="17" r="4" fill="#FF5A1F" />
                    <circle cx="40" cy="17" r="4" fill="#23885A" />
                    <text x="58" y="21" fontFamily="JetBrains Mono Variable, monospace" fontSize="10" fontWeight="600" fill="#1D1C1A">
                      STAR FRAMEWORK CANVAS
                    </text>

                    {/* Steps */}
                    <g transform="translate(16, 50)">
                      {/* Step S */}
                      <g transform="translate(0, 0)">
                        <rect x="0" y="0" width="22" height="22" rx="4" fill="#1D1C1A" />
                        <text x="7.5" y="15" fontFamily="JetBrains Mono Variable, monospace" fontSize="11" fontWeight="700" fill="#FCFBF8">S</text>
                        <text x="30" y="15" fontFamily="Satoshi, sans-serif" fontSize="11.5" fontWeight="600" fill="#1D1C1A">
                          Situation: Distributed DB deadlock under peak load
                        </text>
                      </g>

                      {/* Step T */}
                      <g transform="translate(0, 38)">
                        <rect x="0" y="0" width="22" height="22" rx="4" fill="#1D1C1A" />
                        <text x="7.5" y="15" fontFamily="JetBrains Mono Variable, monospace" fontSize="11" fontWeight="700" fill="#FCFBF8">T</text>
                        <text x="30" y="15" fontFamily="Satoshi, sans-serif" fontSize="11.5" fontWeight="600" fill="#1D1C1A">
                          Task: Prevent corruption without dropping queries
                        </text>
                      </g>

                      {/* Step A */}
                      <g transform="translate(0, 76)">
                        <rect x="0" y="0" width="22" height="22" rx="4" fill="#1D1C1A" />
                        <text x="7.5" y="15" fontFamily="JetBrains Mono Variable, monospace" fontSize="11" fontWeight="700" fill="#FCFBF8">A</text>
                        <text x="30" y="15" fontFamily="Satoshi, sans-serif" fontSize="11.5" fontWeight="600" fill="#1D1C1A">
                          Action: Isolated hot keys &amp; applied jitter backoff
                        </text>
                      </g>

                      {/* Step R */}
                      <g transform="translate(0, 114)">
                        <rect x="0" y="0" width="22" height="22" rx="4" fill="#23885A" />
                        <text x="7.5" y="15" fontFamily="JetBrains Mono Variable, monospace" fontSize="11" fontWeight="700" fill="#FCFBF8">R</text>
                        <text x="30" y="15" fontFamily="Satoshi, sans-serif" fontSize="11.5" fontWeight="600" fill="#23885A">
                          Result: Zero timeouts; p99 latency dropped 74%
                        </text>
                      </g>

                      <line x1="0" y1="154" x2="332" y2="154" stroke="#1D1C1A" strokeWidth="1" strokeOpacity="0.1" />

                      <text x="0" y="176" fontFamily="JetBrains Mono Variable, monospace" fontSize="9.5" fill="#6A625A">
                        VERDICT: High authority · Concisely answered in 72s
                      </text>
                    </g>
                  </g>
                  <rect x="0" y="0" width="364" height="246" rx="14" fill="none" stroke="#1D1C1A" strokeWidth="1.2" strokeOpacity="0.16" />
                </g>

                {/* Composure Quadrant Box (x = 56 + 364 + 16 = 436, Width: 148px -> ends at 584px) */}
                <g transform="translate(436, 142)">
                  <rect x="0" y="0" width="148" height="246" rx="14" fill="#FFFFFF" stroke="#1D1C1A" strokeWidth="1.2" strokeOpacity="0.16" />

                  <text x="14" y="25" fontFamily="JetBrains Mono Variable, monospace" fontSize="10" fontWeight="700" fill="#1D1C1A">
                    COMPOSURE GRID
                  </text>

                  {/* 2x2 Grid (120x120 centered horizontally at x=14) */}
                  <rect x="14" y="42" width="120" height="120" rx="8" fill="#F3F1EC" stroke="#1D1C1A" strokeWidth="1" strokeOpacity="0.12" />
                  <line x1="74" y1="42" x2="74" y2="162" stroke="#1D1C1A" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="3 3" />
                  <line x1="14" y1="102" x2="134" y2="102" stroke="#1D1C1A" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="3 3" />

                  {/* Target quadrant dot */}
                  <circle cx="104" cy="72" r="10" fill="#23885A" fillOpacity="0.2" />
                  <circle cx="104" cy="72" r="5" fill="#23885A" />

                  <text x="14" y="186" fontFamily="JetBrains Mono Variable, monospace" fontSize="9" fill="#23885A" fontWeight="600">
                    TOP-RIGHT: POISED
                  </text>
                  <text x="14" y="206" fontFamily="JetBrains Mono Variable, monospace" fontSize="8.5" fill="#6A625A">
                    Confidence: 9.6 / 10
                  </text>
                  <text x="14" y="224" fontFamily="JetBrains Mono Variable, monospace" fontSize="8.5" fill="#6A625A">
                    Tone: Executive
                  </text>
                </g>
              </svg>
            </figure>

            <div className="sc-foot">
              <div className="sc-words">
                <h3 className="sc-h3">
                  Behavioral &amp; <i>interviews</i>
                  <span className="sc-pro">Pro</span>
                </h3>
                <p className="sc-line">
                  Field tough questions with structure, executive composure, and zero judgment.
                </p>
              </div>
              <Link
                className="sc-key"
                href="/dashboard/matchmaking"
                aria-label="Start with Behavioral Interviews"
              >
                Start mock session
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </li>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}