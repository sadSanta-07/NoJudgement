"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const words = ["clearly", "freely", "fluently", "boldly", "openly"];

export default function HeroTactileObjects() {
  const [wordIndex, setWordIndex] = useState(0);
  const [wordOpacity, setWordOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordOpacity(0);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % words.length);
        setWordOpacity(1);
      }, 280);
    }, 3400);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hx-hero" id="top" aria-labelledby="hx-title">
      <div className="hx-grid" aria-hidden="true"></div>
      <div className="hx-in">
        <div className="hx-glow" aria-hidden="true"></div>
        <div className="hx-arts" aria-hidden="true">
          <svg className="hx-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs>
            <filter id="hx-lift" x="-30%" y="-30%" width="160%" height="175%" colorInterpolationFilters="sRGB">
              <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="a1" /><feOffset in="a1" dy="1" result="b1" />
              <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="a2" /><feOffset in="a2" dy="4" result="b2" />
              <feGaussianBlur in="SourceAlpha" stdDeviation="10" result="a3" /><feOffset in="a3" dy="10" result="b3" />
              <feMorphology in="SourceAlpha" operator="erode" radius="18" result="e4" /><feGaussianBlur in="e4" stdDeviation="22" result="a4" /><feOffset in="a4" dy="22" result="b4" />
              <feComponentTransfer in="b1" result="c1"><feFuncA type="linear" slope=".09" /></feComponentTransfer>
              <feComponentTransfer in="b2" result="c2"><feFuncA type="linear" slope=".09" /></feComponentTransfer>
              <feComponentTransfer in="b3" result="c3"><feFuncA type="linear" slope=".10" /></feComponentTransfer>
              <feComponentTransfer in="b4" result="c4"><feFuncA type="linear" slope=".22" /></feComponentTransfer>
              <feMerge result="m"><feMergeNode in="c4" /><feMergeNode in="c3" /><feMergeNode in="c2" /><feMergeNode in="c1" /></feMerge>
              <feFlood floodColor="rgb(60,48,30)" /><feComposite in2="m" operator="in" result="sh" />
              <feMerge><feMergeNode in="sh" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="hx-cut" x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
              <feGaussianBlur in="SourceAlpha" stdDeviation="6.5" result="b" />
              <feComponentTransfer in="b" result="blob"><feFuncA type="linear" slope="48" intercept="-1.05" /></feComponentTransfer>
              <feMorphology in="blob" operator="erode" radius="1.3" result="inner" />
              <feComposite in="blob" in2="inner" operator="out" result="ring" />
              <feFlood floodColor="#FFFEFB" /><feComposite in2="blob" operator="in" result="white" />
              <feFlood floodColor="rgb(96,78,50)" floodOpacity=".20" /><feComposite in2="ring" operator="in" result="edge" />
              <feGaussianBlur in="blob" stdDeviation="1.6" /><feOffset dy="1.8" result="s1a" />
              <feFlood floodColor="rgb(60,48,30)" floodOpacity=".26" /><feComposite in2="s1a" operator="in" result="s1" />
              <feGaussianBlur in="blob" stdDeviation="6" /><feOffset dy="6" result="s2a" />
              <feFlood floodColor="rgb(60,48,30)" floodOpacity=".12" /><feComposite in2="s2a" operator="in" result="s2" />
              <feMerge><feMergeNode in="s2" /><feMergeNode in="s1" /><feMergeNode in="white" /><feMergeNode in="edge" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="hx-cut-mask" x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
              <feGaussianBlur in="SourceAlpha" stdDeviation="6.5" result="b" />
              <feComponentTransfer in="b" result="blob"><feFuncA type="linear" slope="48" intercept="-1.05" /></feComponentTransfer>
              <feFlood floodColor="#FFFFFF" /><feComposite in2="blob" operator="in" />
            </filter>
          </defs></svg>
          <div className="hx-grp hx-tl">
            <span className="hx-folder hx-f1" style={{ "--fold": "#A9CBC6", "--fold-2": "#99C1BB" } as React.CSSProperties}><span className="hx-folder-tab"></span><span className="hx-folder-face"><svg viewBox="0 0 240 300"><text x="22" y="36" fontFamily="Doto, monospace" fontWeight="800" fontSize="15" fill="#1D1C1A">SPEECH FLOW</text><text x="22" y="52" fontFamily="JetBrains Mono Variable, monospace" fontSize="7.5" fill="#5E5B55">rhythm, pacing & inflection</text>
              <g fill="none" stroke="#1D1C1A" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
                <path d="M120 84 C100 78 52 76 28 82 V250 C52 244 100 246 120 252 Z" fill="#FCFBF8" />
                <path d="M120 84 C140 78 188 76 212 82 V250 C188 244 140 246 120 252 Z" fill="#FCFBF8" />
                <path d="M120 84 V252" strokeOpacity=".5" />
                <path d="M36 92 V240 H114" strokeOpacity=".6" />
                <path d="M72 92 V240 M72 160 H114 M36 186 H72" strokeWidth="1.8" />
                <circle cx="42" cy="104" r="3" fill="#1D1C1A" /><circle cx="50" cy="122" r="3" fill="#1D1C1A" /><circle cx="58" cy="98" r="3" fill="#1D1C1A" /><circle cx="46" cy="146" r="3" fill="#1D1C1A" /><circle cx="61" cy="136" r="3" fill="#FCFBF8" /><circle cx="55" cy="204" r="3" fill="#FCFBF8" /><circle cx="44" cy="196" r="3" fill="#FCFBF8" /><circle cx="60" cy="214" r="3" fill="#FCFBF8" /><circle cx="52" cy="228" r="3" fill="#FCFBF8" /><circle cx="80" cy="108" r="3" fill="#FCFBF8" /><circle cx="92" cy="126" r="3" fill="#FCFBF8" /><circle cx="104" cy="100" r="3" fill="#FCFBF8" /><circle cx="86" cy="150" r="3" fill="#FCFBF8" /><circle cx="100" cy="138" r="3" fill="#FCFBF8" /><circle cx="82" cy="178" r="3" fill="#1D1C1A" /><circle cx="96" cy="196" r="3" fill="#1D1C1A" /><circle cx="106" cy="168" r="3" fill="#1D1C1A" /><circle cx="88" cy="222" r="3" fill="#1D1C1A" /><circle cx="102" cy="230" r="3" fill="#1D1C1A" />
                <path d="M166 112 L142 150 M166 112 L190 150 M142 166 L130 196 M142 166 L154 196 M190 166 L178 196 M190 166 L202 196" strokeOpacity=".8" />
                <rect x="149" y="96" width="34" height="16" rx="3" fill="#FCFBF8" /><text x="166" y="106.5" textAnchor="middle" stroke="none" fill="#5E5B55" fontFamily="JetBrains Mono Variable, monospace" fontSize="6.5">Pacing?</text><rect x="127" y="150" width="30" height="16" rx="3" fill="#FCFBF8" /><text x="142" y="160.5" textAnchor="middle" stroke="none" fill="#5E5B55" fontFamily="JetBrains Mono Variable, monospace" fontSize="6.5">Breathe?</text><rect x="175" y="150" width="30" height="16" rx="3" fill="#FCFBF8" /><text x="190" y="160.5" textAnchor="middle" stroke="none" fill="#5E5B55" fontFamily="JetBrains Mono Variable, monospace" fontSize="6.5">Articulate?</text>
                <rect x="122" y="196" width="17" height="12" rx="6" fill="#1D1C1A" /><rect x="145" y="196" width="18" height="12" rx="6" fill="#FCFBF8" />
                <rect x="169" y="196" width="18" height="12" rx="6" fill="#FCFBF8" />
              </g>
              <g fontFamily="JetBrains Mono Variable, monospace" fontSize="6.5" fill="#5E5B55"><text x="149" y="132" textAnchor="end">yes</text><text x="184" y="132">no</text></g>
              <g className="hx-hot"><rect x="193" y="196" width="18" height="12" rx="6" fill="#FF5A1F" /></g></svg></span></span>
            <span className="hx-folder hx-f2" style={{ "--fold": "#C9BCD6", "--fold-2": "#BDAECD" } as React.CSSProperties}><span className="hx-folder-tab"></span><span className="hx-folder-face"><svg viewBox="0 0 240 300"><text x="22" y="36" fontFamily="Doto, monospace" fontWeight="800" fontSize="15" fill="#1D1C1A">PHONETICS</text><text x="22" y="52" fontFamily="JetBrains Mono Variable, monospace" fontSize="7.5" fill="#5E5B55">vowels, plosives & stress</text>
              <g fill="none" stroke="#1D1C1A" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
                <path d="M100 78 H56 a8 8 0 0 0 -8 8 V246 a8 8 0 0 0 8 8 H184 a8 8 0 0 0 8 -8 V86 a8 8 0 0 0 -8 -8 H140" fill="#FCFBF8" />
                <path d="M100 78 L114 92 M140 78 L126 92" />
                <circle cx="120" cy="102" r="1.8" fill="#1D1C1A" /><circle cx="112" cy="115" r="1.8" fill="#1D1C1A" /><circle cx="128" cy="115" r="1.8" fill="#1D1C1A" /><circle cx="104" cy="128" r="1.8" fill="#1D1C1A" /><circle cx="120" cy="128" r="1.8" fill="#1D1C1A" /><circle cx="136" cy="128" r="1.8" fill="#1D1C1A" /><circle cx="96" cy="141" r="1.8" fill="#1D1C1A" /><circle cx="112" cy="141" r="1.8" fill="#1D1C1A" /><circle cx="128" cy="141" r="1.8" fill="#1D1C1A" /><circle cx="144" cy="141" r="1.8" fill="#1D1C1A" /><circle cx="88" cy="154" r="1.8" fill="#1D1C1A" /><circle cx="104" cy="154" r="1.8" fill="#1D1C1A" /><circle cx="120" cy="154" r="1.8" fill="#1D1C1A" /><circle cx="136" cy="154" r="1.8" fill="#1D1C1A" /><circle cx="152" cy="154" r="1.8" fill="#1D1C1A" /><circle cx="80" cy="167" r="1.8" fill="#1D1C1A" /><circle cx="96" cy="167" r="1.8" fill="#1D1C1A" /><circle cx="112" cy="167" r="1.8" fill="#1D1C1A" /><circle cx="128" cy="167" r="1.8" fill="#1D1C1A" /><circle cx="144" cy="167" r="1.8" fill="#1D1C1A" /><circle cx="160" cy="167" r="1.8" fill="#1D1C1A" /><circle cx="72" cy="180" r="1.8" fill="#1D1C1A" /><circle cx="88" cy="180" r="1.8" fill="#1D1C1A" /><circle cx="104" cy="180" r="1.8" fill="#1D1C1A" /><circle cx="120" cy="180" r="1.8" fill="#1D1C1A" /><circle cx="136" cy="180" r="1.8" fill="#1D1C1A" /><circle cx="152" cy="180" r="1.8" fill="#1D1C1A" /><circle cx="168" cy="180" r="1.8" fill="#1D1C1A" />
                <path d="M56 198 V248 M72 198 V248 M88 198 V248 M104 198 V248 M120 198 V248 M136 198 V248 M152 198 V248 M168 198 V248 M184 198 V248" />
                <path d="M56 248 H184" />
                <path d="M64 254 v12 M176 254 v12 M52 266 H188" strokeOpacity=".6" />
              </g>
              <g fill="#1D1C1A" fillOpacity=".8"><circle cx="64" cy="243" r="3.2" /><circle cx="80" cy="243" r="3.2" /><circle cx="96" cy="243" r="3.2" /><circle cx="96" cy="236" r="3.2" /><circle cx="96" cy="229" r="3.2" /><circle cx="96" cy="222" r="3.2" /><circle cx="112" cy="243" r="3.2" /><circle cx="112" cy="236" r="3.2" /><circle cx="112" cy="229" r="3.2" /><circle cx="112" cy="222" r="3.2" /><circle cx="112" cy="215" r="3.2" /><circle cx="112" cy="208" r="3.2" /><circle cx="128" cy="243" r="3.2" /><circle cx="128" cy="236" r="3.2" /><circle cx="128" cy="229" r="3.2" /><circle cx="128" cy="222" r="3.2" /><circle cx="128" cy="215" r="3.2" /><circle cx="128" cy="208" r="3.2" /><circle cx="144" cy="243" r="3.2" /><circle cx="144" cy="236" r="3.2" /><circle cx="144" cy="229" r="3.2" /><circle cx="144" cy="222" r="3.2" /><circle cx="160" cy="243" r="3.2" /><circle cx="176" cy="243" r="3.2" /></g>
              <g fontFamily="JetBrains Mono Variable, monospace" fontSize="6.5" fill="#5E5B55" textAnchor="middle"><text x="64" y="277">1</text><text x="80" y="277">7</text><text x="96" y="277">21</text><text x="112" y="277">35</text><text x="128" y="277">35</text><text x="144" y="277">21</text><text x="160" y="277">7</text><text x="176" y="277">1</text></g>
              <g className="hx-hot"><circle cx="128" cy="150" r="4" fill="#FF5A1F" /></g></svg></span></span>
            <span className="hx-folder hx-f3" style={{ "--fold": "#D9B3A9", "--fold-2": "#CFA498" } as React.CSSProperties}><span className="hx-folder-tab"></span><span className="hx-folder-face"><svg viewBox="0 0 240 300"><text x="22" y="36" fontFamily="Doto, monospace" fontWeight="800" fontSize="15" fill="#1D1C1A">CONFIDENCE</text><text x="22" y="52" fontFamily="JetBrains Mono Variable, monospace" fontSize="7.5" fill="#5E5B55">instant feedback, zero judgment</text>
              <g fill="none" stroke="#1D1C1A" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
                <rect x="30" y="86" width="180" height="128" rx="8" fill="#FCFBF8" />
                <path d="M30 100 h180" strokeOpacity=".3" />
                <path d="M59 124 C 82 124, 78 108, 102 108" strokeOpacity=".55" /><path d="M59 124 C 82 124, 78 136, 102 136" strokeOpacity=".55" /><path d="M59 124 C 82 124, 78 164, 102 164" strokeOpacity=".55" /><path d="M59 124 C 82 124, 78 192, 102 192" strokeOpacity=".55" /><path d="M59 180 C 82 180, 78 108, 102 108" strokeOpacity=".55" /><path d="M59 180 C 82 180, 78 136, 102 136" strokeOpacity=".55" /><path d="M59 180 C 82 180, 78 164, 102 164" strokeOpacity=".55" /><path d="M59 180 C 82 180, 78 192, 102 192" strokeOpacity=".55" /><path d="M122 108 C 148 108, 140 150, 166 150" /><path d="M122 136 C 148 136, 140 150, 166 150" /><path d="M122 164 C 148 164, 140 150, 166 150" /><path d="M122 192 C 148 192, 140 150, 166 150" />
                <circle cx="52" cy="124" r="7" fill="#FCFBF8" /><circle cx="52" cy="124" r="2.5" /><circle cx="52" cy="180" r="7" fill="#FCFBF8" /><circle cx="52" cy="180" r="2.5" />
                <circle cx="112" cy="108" r="9.5" fill="#FCFBF8" /><path d="M112 108 L105.9 104.5" /><circle cx="112" cy="136" r="9.5" fill="#FCFBF8" /><path d="M112 136 L115.5 129.9" /><circle cx="112" cy="164" r="9.5" fill="#FCFBF8" /><path d="M112 164 L109.6 157.4" /><circle cx="112" cy="192" r="9.5" fill="#FCFBF8" /><path d="M112 192 L118.1 188.5" />
                <path d="M172 164 h16 v8 h-16 z" fill="#FCFBF8" />
                <path d="M174 172 v4 h12 v-4" />
                <path d="M64 214 v24 M176 214 v24 M36 240 h168" />
                <path d="M40 256 C 90 250, 150 260, 204 252" strokeOpacity=".5" />
              </g>
              <g fontFamily="JetBrains Mono Variable, monospace" fontSize="7" fill="#5E5B55"><text x="44" y="206">Listen Speak</text><text x="100" y="224">Cadence</text></g>
              <g className="hx-hot"><circle cx="180" cy="150" r="13" fill="#FF5A1F" />
                <g stroke="#FF5A1F" strokeWidth="1.6" strokeLinecap="round"><path d="M180 124 v-8 M198 132 l6 -6 M162 132 l-6 -6 M204 150 h8" /></g></g></svg></span></span>
          </div>
          <div className="hx-grp hx-tr">
            <div className="hx-obj hx-sheet"><div className="hx-turn"><svg className="hx-sheet-svg" viewBox="0 0 220 262" width="220" height="262" overflow="visible">
              <defs>
                <filter id="hx-flap-blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="4" /></filter>
                <pattern id="hx-grain-sheet" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".8" fill="rgba(29,28,26,.07)" /></pattern>
                <linearGradient id="hx-sheet-sheen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".22" /><stop offset=".4" stopColor="#fff" stopOpacity="0" /></linearGradient>
              </defs>
              <rect width="220" height="262" rx="9" fill="#E5D0AA" />
              <rect width="220" height="262" rx="9" fill="url(#hx-grain-sheet)" />
              <rect width="220" height="262" rx="9" fill="url(#hx-sheet-sheen)" />
              <rect x=".5" y=".5" width="219" height="261" rx="8.5" fill="none" stroke="rgba(29,28,26,.10)" />
              <g transform="translate(18 231) scale(0.16)"><path d="M52.2 50L52.2 9A20.5 20.5 0 0 1 52.2 50ZM50 52.2L91 52.2A20.5 20.5 0 0 1 50 52.2ZM47.8 50L47.8 91A20.5 20.5 0 0 1 47.8 50ZM50 47.8L9 47.8A20.5 20.5 0 0 1 50 47.8Z" fill="#1D1C1A" /></g>
              <g transform="translate(63.6 60.4) rotate(-4) scale(0.6) translate(-120 -148)"><g filter="url(#hx-cut)"><g id="hx-st-0">
                <g fill="none" stroke="#1D1C1A" strokeWidth="2.1" strokeLinejoin="round" strokeLinecap="round">
                  <circle cx="120" cy="126" r="46" fill="#FFFEFB" />
                  <path d="M160 126 L166 126 M154.6 146 L158.1 148 M140 160.6 L142 164.1 M120 166 L120 172 M100 160.6 L98 164.1 M85.4 146 L81.9 148 M80 126 L74 126 M85.4 106 L81.9 104 M100 91.4 L98 87.9 M120 86 L120 80 M140 91.4 L142 87.9 M154.6 106 L158.1 104" />
                  <path d="M120 126 L140.6 101.5" strokeWidth="2" />
                  <path d="M120 126 L130 143.3" />
                  <circle cx="120" cy="126" r="3" fill="#1D1C1A" />
                  <rect x="113" y="68" width="14" height="10" rx="2" fill="#FFFEFB" /><path d="M120 78 v2" />
                  <path d="M152 88 l8 -8 l5 5 l-8 8" />
                  <rect x="26" y="212" width="188" height="16" rx="8" fill="#FFFEFB" />
                  <circle cx="34" cy="220" r="5" /><circle cx="206" cy="220" r="5" />
                  <path d="M46 216 h148 M46 224 h148" strokeOpacity=".3" />
                  <rect x="44" y="194" width="18" height="16" rx="2" fill="#FFFEFB" /><rect x="72" y="194" width="18" height="16" rx="2" fill="#FFFEFB" /><rect x="100" y="194" width="18" height="16" rx="2" fill="#FFFEFB" /><rect x="128" y="194" width="18" height="16" rx="2" fill="#FFFEFB" /><rect x="156" y="194" width="18" height="16" rx="2" fill="#FFFEFB" />
                  <path d="M40 244 h160" strokeOpacity=".35" />
                </g>
                <g fontFamily="JetBrains Mono Variable, monospace" fontSize="7" fill="#5E5B55"></g>
                <g><rect x="184" y="194" width="18" height="16" rx="2" fill="#FF5A1F" /></g></g></g></g>
              <g transform="translate(165 69) rotate(5) scale(0.5) translate(-120 -172)">
                <defs>
                  <clipPath id="hx-st-1-keep"><polygon points="-292.26,-356.26 556.26,492.26 132,916.53 -716.53,68" /></clipPath>
                  <clipPath id="hx-st-1-off"><polygon points="-292.26,-356.26 556.26,492.26 980.53,68 132,-780.53" /></clipPath>
                  <linearGradient id="hx-st-1-back" gradientUnits="userSpaceOnUse" x1="132" y1="68" x2="95.23" y2="104.77">
                    <stop offset="0" stopColor="#CFC8BB" /><stop offset=".12" stopColor="#F4F1EA" /><stop offset=".34" stopColor="#FBFAF6" /><stop offset="1" stopColor="#E6E1D7" />
                  </linearGradient>
                  <mask id="hx-st-1-flap" maskUnits="userSpaceOnUse" x="-400" y="-400" width="1200" height="1200"><g transform="matrix(0.05 0.95 0.95 0.05 60.8 -60.8)"><use href="#hx-st-1" filter="url(#hx-cut-mask)" /></g></mask>
                  <mask id="hx-st-1-ghost" maskUnits="userSpaceOnUse" x="-400" y="-400" width="1200" height="1200"><use href="#hx-st-1" filter="url(#hx-cut-mask)" /></mask>
                </defs>
                <g clipPath="url(#hx-st-1-off)"><rect x="-200" y="-200" width="800" height="800" fill="#FFFFFF" fillOpacity=".22" mask="url(#hx-st-1-ghost)" /></g>
                <g clipPath="url(#hx-st-1-keep)"><g filter="url(#hx-cut)"><g id="hx-st-1">
                  <g fill="none" stroke="#1D1C1A" strokeWidth="2.1" strokeLinejoin="round" strokeLinecap="round">
                    <path d="M100 78 H56 a8 8 0 0 0 -8 8 V246 a8 8 0 0 0 8 8 H184 a8 8 0 0 0 8 -8 V86 a8 8 0 0 0 -8 -8 H140" fill="#FFFEFB" />
                    <path d="M100 78 L114 92 M140 78 L126 92" />
                    <circle cx="120" cy="102" r="1.8" fill="#1D1C1A" /><circle cx="112" cy="115" r="1.8" fill="#1D1C1A" /><circle cx="128" cy="115" r="1.8" fill="#1D1C1A" /><circle cx="104" cy="128" r="1.8" fill="#1D1C1A" /><circle cx="120" cy="128" r="1.8" fill="#1D1C1A" /><circle cx="136" cy="128" r="1.8" fill="#1D1C1A" /><circle cx="96" cy="141" r="1.8" fill="#1D1C1A" /><circle cx="112" cy="141" r="1.8" fill="#1D1C1A" /><circle cx="128" cy="141" r="1.8" fill="#1D1C1A" /><circle cx="144" cy="141" r="1.8" fill="#1D1C1A" /><circle cx="88" cy="154" r="1.8" fill="#1D1C1A" /><circle cx="104" cy="154" r="1.8" fill="#1D1C1A" /><circle cx="120" cy="154" r="1.8" fill="#1D1C1A" /><circle cx="136" cy="154" r="1.8" fill="#1D1C1A" /><circle cx="152" cy="154" r="1.8" fill="#1D1C1A" /><circle cx="80" cy="167" r="1.8" fill="#1D1C1A" /><circle cx="96" cy="167" r="1.8" fill="#1D1C1A" /><circle cx="112" cy="167" r="1.8" fill="#1D1C1A" /><circle cx="128" cy="167" r="1.8" fill="#1D1C1A" /><circle cx="144" cy="167" r="1.8" fill="#1D1C1A" /><circle cx="160" cy="167" r="1.8" fill="#1D1C1A" /><circle cx="72" cy="180" r="1.8" fill="#1D1C1A" /><circle cx="88" cy="180" r="1.8" fill="#1D1C1A" /><circle cx="104" cy="180" r="1.8" fill="#1D1C1A" /><circle cx="120" cy="180" r="1.8" fill="#1D1C1A" /><circle cx="136" cy="180" r="1.8" fill="#1D1C1A" /><circle cx="152" cy="180" r="1.8" fill="#1D1C1A" /><circle cx="168" cy="180" r="1.8" fill="#1D1C1A" />
                    <path d="M56 198 V248 M72 198 V248 M88 198 V248 M104 198 V248 M120 198 V248 M136 198 V248 M152 198 V248 M168 198 V248 M184 198 V248" />
                    <path d="M56 248 H184" />
                    <path d="M64 254 v12 M176 254 v12 M52 266 H188" strokeOpacity=".6" />
                  </g>
                  <g fill="#1D1C1A" fillOpacity=".8"><circle cx="64" cy="243" r="3.2" /><circle cx="80" cy="243" r="3.2" /><circle cx="96" cy="243" r="3.2" /><circle cx="96" cy="236" r="3.2" /><circle cx="96" cy="229" r="3.2" /><circle cx="96" cy="222" r="3.2" /><circle cx="112" cy="243" r="3.2" /><circle cx="112" cy="236" r="3.2" /><circle cx="112" cy="229" r="3.2" /><circle cx="112" cy="222" r="3.2" /><circle cx="112" cy="215" r="3.2" /><circle cx="112" cy="208" r="3.2" /><circle cx="128" cy="243" r="3.2" /><circle cx="128" cy="236" r="3.2" /><circle cx="128" cy="229" r="3.2" /><circle cx="128" cy="222" r="3.2" /><circle cx="128" cy="215" r="3.2" /><circle cx="128" cy="208" r="3.2" /><circle cx="144" cy="243" r="3.2" /><circle cx="144" cy="236" r="3.2" /><circle cx="144" cy="229" r="3.2" /><circle cx="144" cy="222" r="3.2" /><circle cx="160" cy="243" r="3.2" /><circle cx="176" cy="243" r="3.2" /></g>
                  <g fontFamily="JetBrains Mono Variable, monospace" fontSize="6.5" fill="#5E5B55" textAnchor="middle"></g>
                  <g><circle cx="128" cy="150" r="4" fill="#FF5A1F" /></g></g></g></g>
                <g clipPath="url(#hx-st-1-keep)">
                  <g transform="translate(0 7)" opacity=".30" filter="url(#hx-flap-blur)"><rect x="-200" y="-200" width="800" height="800" fill="rgb(60,48,30)" mask="url(#hx-st-1-flap)" /></g>
                  <rect x="-200" y="-200" width="800" height="800" fill="url(#hx-st-1-back)" mask="url(#hx-st-1-flap)" />
                </g>
              </g>
              <g transform="translate(47 174.5) rotate(-3) scale(0.5) translate(-120 -163)"><g filter="url(#hx-cut)"><g id="hx-st-2">
                <g fill="none" stroke="#1D1C1A" strokeWidth="2.1" strokeLinejoin="round" strokeLinecap="round">
                  <circle cx="120" cy="106" r="34" strokeDasharray="5 5" strokeOpacity=".7" />
                  <path d="M143.7 91.2 L151.9 94.4 L153.9 84.8 M121 134 L114.1 139.5 L121.4 146 M95.3 92.9 L94 84.1 L84.7 87.2" />
                  <circle cx="149.4" cy="123" r="6" fill="#FFFEFB" /><circle cx="90.6" cy="123" r="6" fill="#FFFEFB" />
                  <path d="M120 146 v24" strokeDasharray="3 4" strokeOpacity=".6" />
                  <path d="M70 196 l-14 64 h128 l-14 -64 z" fill="#FFFEFB" />
                  <path d="M58 196 h124 v14 h-124 z" fill="#FFFEFB" />
                  <path d="M102 196 v-10 a6 6 0 0 1 6 -6 h24 a6 6 0 0 1 6 6 v10" />
                  <path d="M78 196 l-8 -26 M74 170 l-6 -4 l4 -6 l6 4 z" />
                  <path d="M150 196 l10 -30 m-3 -6 a7 7 0 1 0 10 6 l-4 -2 l-2 4 z" />
                  <path d="M170 196 l6 -20 l3 -4 l1 5 l-6 19" />
                  <path d="M110 226 h20" />
                </g>
                <g fontFamily="JetBrains Mono Variable, monospace" fontSize="7" fill="#5E5B55"></g>
                <g><circle cx="120" cy="72" r="7" fill="#FF5A1F" /></g></g></g></g>
              <g transform="translate(140.15 197.31) rotate(3) scale(0.57) translate(-121 -165)"><g filter="url(#hx-cut)"><g id="hx-st-3">
                <g fill="none" stroke="#1D1C1A" strokeWidth="2.1" strokeLinejoin="round" strokeLinecap="round">
                  <path d="M168 120 H34 V208 H168" fill="#FFFEFB" />
                  <path d="M36 132 H168 M36 196 H168" strokeOpacity=".5" />
                  <path d="M36 148 H168 M36 164 H168 M36 180 H168" strokeOpacity=".22" />
                  <path d="M56 132 V196 M78 132 V196 M100 132 V196 M122 132 V196 M144 132 V196" strokeOpacity=".16" />
                  <circle cx="40" cy="126" r="1.6" /><circle cx="40" cy="202" r="1.6" /><circle cx="52" cy="126" r="1.6" /><circle cx="52" cy="202" r="1.6" /><circle cx="64" cy="126" r="1.6" /><circle cx="64" cy="202" r="1.6" /><circle cx="76" cy="126" r="1.6" /><circle cx="76" cy="202" r="1.6" /><circle cx="88" cy="126" r="1.6" /><circle cx="88" cy="202" r="1.6" /><circle cx="100" cy="126" r="1.6" /><circle cx="100" cy="202" r="1.6" /><circle cx="112" cy="126" r="1.6" /><circle cx="112" cy="202" r="1.6" /><circle cx="124" cy="126" r="1.6" /><circle cx="124" cy="202" r="1.6" /><circle cx="136" cy="126" r="1.6" /><circle cx="136" cy="202" r="1.6" /><circle cx="160" cy="126" r="1.6" /><circle cx="160" cy="202" r="1.6" />
                  <path d="M38 168 L42 166 L46 169 L50 167 L54 165 L58 167 L62 164 L66 166 L70 163 L74 172 L78 152 L82 175 L86 149 L90 170 L94 146 L98 168 L102 155 L106 158 L110 160 L114 157 L118 159 L122 156 L126 158 L130 155 L134 157 L138 154 L142 156 L146 153 L150 155" strokeWidth="1.6" />
                  <rect x="166" y="86" width="44" height="150" rx="6" fill="#FFFEFB" />
                  <circle cx="188" cy="110" r="13" fill="#FFFEFB" /><circle cx="188" cy="110" r="3.5" />
                  <path d="M166 120 V208" strokeWidth="2.4" />
                  <path d="M150 110 V218 M150 110 H166 M150 218 H166" strokeOpacity=".7" />
                  <rect x="145.5" y="147" width="9" height="16" rx="2" fill="#FFFEFB" />
                  <circle cx="188" cy="214" r="7" fill="#FFFEFB" /><path d="M188 214 L192 209" />
                  <path d="M28 236 H214" />
                  <path d="M40 236 v8 M200 236 v8" strokeOpacity=".6" />
                </g>
                <g fontFamily="JetBrains Mono Variable, monospace" fontSize="7" fill="#5E5B55"></g>
                <g><path d="M142 156 L146 153 L150 155" stroke="#FF5A1F" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /><circle cx="150" cy="155" r="3.2" fill="#FF5A1F" /></g></g></g></g>
            </svg></div></div>
          </div>
          <div className="hx-grp hx-bl">
            <div className="hx-obj hx-tin"><svg className="hx-tin-svg" viewBox="0 0 316 266" width="316" height="266" overflow="visible">
              <defs>
                <pattern id="hx-tin-grain" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".8" fill="rgba(29,28,26,.07)" /></pattern>
                <linearGradient id="hx-tin-sink" x1="0" y1="119" x2="0" y2="204" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#3C301E" stopOpacity="0" /><stop offset=".55" stopColor="#3C301E" stopOpacity=".05" /><stop offset="1" stopColor="#2A2416" stopOpacity=".26" /></linearGradient>
                <linearGradient id="hx-tin-cardsheen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".2" /><stop offset=".3" stopColor="#fff" stopOpacity="0" /></linearGradient>
                <filter id="hx-tin-cardsh" x="-10%" y="-30%" width="120%" height="160%" colorInterpolationFilters="sRGB">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="2.2" /><feOffset dy="-.4" result="b" />
                  <feFlood floodColor="rgb(40,34,24)" floodOpacity=".26" /><feComposite in2="b" operator="in" result="s" />
                  <feMerge><feMergeNode in="s" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <linearGradient id="hx-tin-lidtop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4F8870" /><stop offset=".55" stopColor="#33624D" /><stop offset="1" stopColor="#244B3B" /></linearGradient>
                <linearGradient id="hx-tin-lidstreak" x1="0" y1="0" x2="1" y2=".25"><stop offset=".04" stopColor="#fff" stopOpacity="0" /><stop offset=".1" stopColor="#fff" stopOpacity=".26" /><stop offset=".14" stopColor="#fff" stopOpacity=".06" /><stop offset=".3" stopColor="#fff" stopOpacity=".1" /><stop offset=".46" stopColor="#fff" stopOpacity="0" /></linearGradient>
                <linearGradient id="hx-tin-inside" x1="0" y1="125" x2="0" y2="200" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#FAF7F0" /><stop offset=".55" stopColor="#F1ECE0" /><stop offset="1" stopColor="#CFC6B3" /></linearGradient>
                <linearGradient id="hx-tin-wall-x" x1="58" y1="0" x2="294" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#183829" /><stop offset=".03" stopColor="#244B3B" /><stop offset=".085" stopColor="#33624D" />
                  <stop offset=".93" stopColor="#33624D" /><stop offset=".972" stopColor="#244B3B" /><stop offset="1" stopColor="#183829" />
                </linearGradient>
                <linearGradient id="hx-tin-wall-y" x1="0" y1="189" x2="0" y2="248" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#fff" stopOpacity=".12" /><stop offset=".3" stopColor="#fff" stopOpacity="0" /><stop offset=".62" stopColor="#000" stopOpacity=".06" />
                  <stop offset=".8" stopColor="#F6F5F1" stopOpacity=".02" /><stop offset=".9" stopColor="#F6F5F1" stopOpacity=".13" /><stop offset=".965" stopColor="#F6F5F1" stopOpacity=".04" /><stop offset="1" stopColor="#000" stopOpacity=".2" />
                </linearGradient>
                <linearGradient id="hx-tin-spec" x1="58" y1="0" x2="294" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset=".035" stopColor="#fff" stopOpacity="0" /><stop offset=".062" stopColor="#fff" stopOpacity=".5" /><stop offset=".085" stopColor="#fff" stopOpacity=".1" />
                  <stop offset=".13" stopColor="#fff" stopOpacity=".04" /><stop offset=".26" stopColor="#fff" stopOpacity=".09" /><stop offset=".44" stopColor="#fff" stopOpacity="0" />
                  <stop offset=".958" stopColor="#fff" stopOpacity="0" /><stop offset=".972" stopColor="#fff" stopOpacity=".22" /><stop offset=".988" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
                <filter id="hx-tin-soft" x="-5%" y="-20%" width="110%" height="140%"><feGaussianBlur stdDeviation="1.3" /></filter>
                <filter id="hx-tin-soft2" x="-5%" y="-20%" width="110%" height="140%"><feGaussianBlur stdDeviation="2.2" /></filter>
                <clipPath id="hx-tin-wallclip"><path d="M58 189 A22 11 0 0 0 80 200 H272 A22 11 0 0 0 294 189
  V237 A22 11 0 0 1 272 248 H80 A22 11 0 0 1 58 237 Z"/></clipPath>
              </defs>

              <rect className="hx-tin-edge" x="54.5" y="121.5" width="243" height="126.5" fill="none" />
              <g className="hx-tin-lid" transform="rotate(-7.5 142 131)">
                <path d="M41 40.55 H243 A20 16 0 0 1 263 56.55 V110.05 A20 16 0 0 1 243 126.05 H41 A20 16 0 0 1 21 110.05 V56.55 A20 16 0 0 1 41 40.55 Z" fill="#4F8870" />
                <path d="M41 40.55 H243 A20 16 0 0 1 263 56.55 V110.05 A20 16 0 0 1 243 126.05 H41 A20 16 0 0 1 21 110.05 V56.55 A20 16 0 0 1 41 40.55 Z" fill="none" stroke="#10271B" strokeOpacity=".4" strokeWidth="1" />
                <path d="M41 45.5 H243 A20 16 0 0 1 263 61.5 V115 A20 16 0 0 1 243 131 H41 A20 16 0 0 1 21 115 V61.5 A20 16 0 0 1 41 45.5 Z" fill="url(#hx-tin-lidtop)" />
                <path d="M46 56.5 H238 A11 9 0 0 1 249 65.5 V111 A11 9 0 0 1 238 120 H46 A11 9 0 0 1 35 111 V65.5 A11 9 0 0 1 46 56.5 Z" fill="none" stroke="#10271B" strokeOpacity=".35" strokeWidth="1.4" transform="translate(0 -.7)" />
                <path d="M46 56.5 H238 A11 9 0 0 1 249 65.5 V111 A11 9 0 0 1 238 120 H46 A11 9 0 0 1 35 111 V65.5 A11 9 0 0 1 46 56.5 Z" fill="none" stroke="#80B49A" strokeOpacity=".55" strokeWidth="1.1" transform="translate(0 .8)" />
                <path d="M41 45.5 H243 A20 16 0 0 1 263 61.5 V115 A20 16 0 0 1 243 131 H41 A20 16 0 0 1 21 115 V61.5 A20 16 0 0 1 41 45.5 Z" fill="url(#hx-tin-lidstreak)" />
                <path d="M41 46 H243 A19.5 15.5 0 0 1 262.5 61.5 V115 A19.5 15.5 0 0 1 243 130.5 H41 A19.5 15.5 0 0 1 21.5 115 V61.5 A19.5 15.5 0 0 1 41 46 Z" fill="none" stroke="#10271B" strokeOpacity=".5" strokeWidth="1" />
                <path d="M43 41.75 H241" stroke="#fff" strokeOpacity=".45" strokeWidth="1" />
                <g transform="translate(203 42.5) scale(1)"><path d="M0 .4 l2.1 -1.1 l1.6 .3 l1.9 -.2 l.9 1.2 l-.8 1.3 l-2.3 .4 l-2.4 -.3 z" fill="#CFD8CF" fillOpacity=".85" /><path d="M.6 1.6 l2.4 .3 l2.3 -.4" fill="none" stroke="#10271B" strokeOpacity=".5" strokeWidth=".6" /></g>
              </g>
              <path d="M80 125 H272 A22 11 0 0 1 294 136 V189 A22 11 0 0 1 272 200 H80 A22 11 0 0 1 58 189 V136 A22 11 0 0 1 80 125 Z" fill="url(#hx-tin-inside)" />
              <path d="M80 125 H272 A22 11 0 0 1 294 136 V189 A22 11 0 0 1 272 200 H80 A22 11 0 0 1 58 189 V136 A22 11 0 0 1 80 125 Z" fill="none" stroke="#244B3B" strokeWidth="6.6" />
              <path d="M80 125 H272 A22 11 0 0 1 294 136 V189 A22 11 0 0 1 272 200 H80 A22 11 0 0 1 58 189 V136 A22 11 0 0 1 80 125 Z" fill="none" stroke="#4F8870" strokeWidth="3.8" transform="translate(0 -.8)" />
              <path d="M80 125 H272 A22 11 0 0 1 294 136 V189 A22 11 0 0 1 272 200 H80 A22 11 0 0 1 58 189 V136 A22 11 0 0 1 80 125 Z" fill="none" stroke="#fff" strokeOpacity=".38" strokeWidth="1" transform="translate(0 -1.7)" />
              <g className="hx-tin-cards"><g transform="rotate(-3.4 172 225.5)">
                <path d="M67 210 V86 Q67 83.5 69.5 83.5 H274.5 Q277 83.5 277 86 V210 Z" fill="#FDFBF6" filter="url(#hx-tin-cardsh)" />

                <path d="M67 210 V86 Q67 83.5 69.5 83.5 H274.5 Q277 83.5 277 86 V210 Z" fill="url(#hx-tin-cardsheen)" />

                <path d="M67 210 V86 Q67 83.5 69.5 83.5 H274.5 Q277 83.5 277 86 V210 Z" fill="url(#hx-tin-sink)" />
                <path d="M67 210 V86 Q67 83.5 69.5 83.5 H274.5 Q277 83.5 277 86 V210 Z" fill="none" stroke="rgba(29,28,26,.17)" strokeWidth=".8" />
                <path d="M69.5 84.2 H274.5" stroke="#fff" strokeOpacity=".8" strokeWidth="1" />

              </g><g transform="rotate(-2.6 173 230)">
                  <path d="M68 210 V88.5 Q68 86 70.5 86 H275.5 Q278 86 278 88.5 V210 Z M66 86.5 L75 67 Q76.5 62 82 62 H180 Q185.5 62 187 67 L196 86.5 Z" fill="#C9BCD6" filter="url(#hx-tin-cardsh)" />
                  <path d="M68 210 V88.5 Q68 86 70.5 86 H275.5 Q278 86 278 88.5 V210 Z M66 86.5 L75 67 Q76.5 62 82 62 H180 Q185.5 62 187 67 L196 86.5 Z" fill="url(#hx-tin-grain)" />
                  <path d="M68 210 V88.5 Q68 86 70.5 86 H275.5 Q278 86 278 88.5 V210 Z M66 86.5 L75 67 Q76.5 62 82 62 H180 Q185.5 62 187 67 L196 86.5 Z" fill="url(#hx-tin-cardsheen)" />

                  <path d="M68 210 V88.5 Q68 86 70.5 86 H275.5 Q278 86 278 88.5 V210 Z M66 86.5 L75 67 Q76.5 62 82 62 H180 Q185.5 62 187 67 L196 86.5 Z" fill="url(#hx-tin-sink)" />
                  <path d="M68 210 V88.5 Q68 86 70.5 86 H275.5 Q278 86 278 88.5 V210 Z M66 86.5 L75 67 Q76.5 62 82 62 H180 Q185.5 62 187 67 L196 86.5 Z" fill="none" stroke="rgba(29,28,26,.17)" strokeWidth=".8" />
                  <path d="M70.5 86.7 H275.5" stroke="#fff" strokeOpacity=".8" strokeWidth="1" />
                  <text x="131" y="79.4" textAnchor="middle" fontFamily="Doto, monospace" fontWeight="900" fontSize="16" letterSpacing="-.3" fill="#1D1C1A" fillOpacity=".88">Small Talk</text>
                </g><g transform="rotate(-1.4 177 236)">
                  <path d="M72 210 V96.5 Q72 94 74.5 94 H279.5 Q282 94 282 96.5 V210 Z" fill="#FDFBF6" filter="url(#hx-tin-cardsh)" />

                  <path d="M72 210 V96.5 Q72 94 74.5 94 H279.5 Q282 94 282 96.5 V210 Z" fill="url(#hx-tin-cardsheen)" />

                  <path d="M72 210 V96.5 Q72 94 74.5 94 H279.5 Q282 94 282 96.5 V210 Z" fill="url(#hx-tin-sink)" />
                  <path d="M72 210 V96.5 Q72 94 74.5 94 H279.5 Q282 94 282 96.5 V210 Z" fill="none" stroke="rgba(29,28,26,.17)" strokeWidth=".8" />
                  <path d="M74.5 94.7 H279.5" stroke="#fff" strokeOpacity=".8" strokeWidth="1" />

                </g><g transform="rotate(-0.4 175 240.5)">
                  <path d="M70 210 V100 Q70 97.5 72.5 97.5 H277.5 Q280 97.5 280 100 V210 Z" fill="#FBF8F0" filter="url(#hx-tin-cardsh)" />

                  <path d="M70 210 V100 Q70 97.5 72.5 97.5 H277.5 Q280 97.5 280 100 V210 Z" fill="url(#hx-tin-cardsheen)" />

                  <path d="M70 210 V100 Q70 97.5 72.5 97.5 H277.5 Q280 97.5 280 100 V210 Z" fill="url(#hx-tin-sink)" />
                  <path d="M70 210 V100 Q70 97.5 72.5 97.5 H277.5 Q280 97.5 280 100 V210 Z" fill="none" stroke="rgba(29,28,26,.17)" strokeWidth=".8" />
                  <path d="M72.5 98.2 H277.5" stroke="#fff" strokeOpacity=".8" strokeWidth="1" />

                </g><g transform="rotate(1.5 179 247.25)">
                  <path d="M74 210 V105.75 Q74 103.25 76.5 103.25 H281.5 Q284 103.25 284 105.75 V210 Z M195.9 103.75 L204.9 84.25 Q206.4 79.25 211.9 79.25 H267.9 Q273.4 79.25 274.9 84.25 L283.9 103.75 Z" fill="#D3B5C1" filter="url(#hx-tin-cardsh)" />
                  <path d="M74 210 V105.75 Q74 103.25 76.5 103.25 H281.5 Q284 103.25 284 105.75 V210 Z M195.9 103.75 L204.9 84.25 Q206.4 79.25 211.9 79.25 H267.9 Q273.4 79.25 274.9 84.25 L283.9 103.75 Z" fill="url(#hx-tin-grain)" />
                  <path d="M74 210 V105.75 Q74 103.25 76.5 103.25 H281.5 Q284 103.25 284 105.75 V210 Z M195.9 103.75 L204.9 84.25 Q206.4 79.25 211.9 79.25 H267.9 Q273.4 79.25 274.9 84.25 L283.9 103.75 Z" fill="url(#hx-tin-cardsheen)" />

                  <path d="M74 210 V105.75 Q74 103.25 76.5 103.25 H281.5 Q284 103.25 284 105.75 V210 Z M195.9 103.75 L204.9 84.25 Q206.4 79.25 211.9 79.25 H267.9 Q273.4 79.25 274.9 84.25 L283.9 103.75 Z" fill="url(#hx-tin-sink)" />
                  <path d="M74 210 V105.75 Q74 103.25 76.5 103.25 H281.5 Q284 103.25 284 105.75 V210 Z M195.9 103.75 L204.9 84.25 Q206.4 79.25 211.9 79.25 H267.9 Q273.4 79.25 274.9 84.25 L283.9 103.75 Z" fill="none" stroke="rgba(29,28,26,.17)" strokeWidth=".8" />
                  <path d="M76.5 103.95 H281.5" stroke="#fff" strokeOpacity=".8" strokeWidth="1" />
                  <text x="239.9" y="96.65" textAnchor="middle" fontFamily="Doto, monospace" fontWeight="900" fontSize="16" letterSpacing="-.3" fill="#1D1C1A" fillOpacity=".88">Idioms</text>
                </g><g transform="rotate(0.6 176 254)">
                  <path d="M71 210 V114.5 Q71 112 73.5 112 H278.5 Q281 112 281 114.5 V210 Z" fill="#FDFBF6" filter="url(#hx-tin-cardsh)" />

                  <path d="M71 210 V114.5 Q71 112 73.5 112 H278.5 Q281 112 281 114.5 V210 Z" fill="url(#hx-tin-cardsheen)" />

                  <path d="M71 210 V114.5 Q71 112 73.5 112 H278.5 Q281 112 281 114.5 V210 Z" fill="url(#hx-tin-sink)" />
                  <path d="M71 210 V114.5 Q71 112 73.5 112 H278.5 Q281 112 281 114.5 V210 Z" fill="none" stroke="rgba(29,28,26,.17)" strokeWidth=".8" />
                  <path d="M73.5 112.7 H278.5" stroke="#fff" strokeOpacity=".8" strokeWidth="1" />

                </g><g transform="rotate(-0.6 175 259.25)">
                  <path d="M70 210 V119.75 Q70 117.25 72.5 117.25 H277.5 Q280 117.25 280 119.75 V210 Z" fill="#FBF8F0" filter="url(#hx-tin-cardsh)" />

                  <path d="M70 210 V119.75 Q70 117.25 72.5 117.25 H277.5 Q280 117.25 280 119.75 V210 Z" fill="url(#hx-tin-cardsheen)" />

                  <path d="M70 210 V119.75 Q70 117.25 72.5 117.25 H277.5 Q280 117.25 280 119.75 V210 Z" fill="url(#hx-tin-sink)" />
                  <path d="M70 210 V119.75 Q70 117.25 72.5 117.25 H277.5 Q280 117.25 280 119.75 V210 Z" fill="none" stroke="rgba(29,28,26,.17)" strokeWidth=".8" />
                  <path d="M72.5 117.95 H277.5" stroke="#fff" strokeOpacity=".8" strokeWidth="1" />

                </g><g transform="rotate(-1.8 174 266)">
                  <path d="M69 210 V125.5 Q69 123 71.5 123 H276.5 Q279 123 279 125.5 V210 Z M106 123.5 L115 104 Q116.5 99 122 99 H226 Q231.5 99 233 104 L242 123.5 Z" fill="#A9CBC6" filter="url(#hx-tin-cardsh)" />
                  <path d="M69 210 V125.5 Q69 123 71.5 123 H276.5 Q279 123 279 125.5 V210 Z M106 123.5 L115 104 Q116.5 99 122 99 H226 Q231.5 99 233 104 L242 123.5 Z" fill="url(#hx-tin-grain)" />
                  <path d="M69 210 V125.5 Q69 123 71.5 123 H276.5 Q279 123 279 125.5 V210 Z M106 123.5 L115 104 Q116.5 99 122 99 H226 Q231.5 99 233 104 L242 123.5 Z" fill="url(#hx-tin-cardsheen)" />

                  <path d="M69 210 V125.5 Q69 123 71.5 123 H276.5 Q279 123 279 125.5 V210 Z M106 123.5 L115 104 Q116.5 99 122 99 H226 Q231.5 99 233 104 L242 123.5 Z" fill="url(#hx-tin-sink)" />
                  <path d="M69 210 V125.5 Q69 123 71.5 123 H276.5 Q279 123 279 125.5 V210 Z M106 123.5 L115 104 Q116.5 99 122 99 H226 Q231.5 99 233 104 L242 123.5 Z" fill="none" stroke="rgba(29,28,26,.17)" strokeWidth=".8" />
                  <path d="M71.5 123.7 H276.5" stroke="#fff" strokeOpacity=".8" strokeWidth="1" />
                  <text x="174" y="116.4" textAnchor="middle" fontFamily="Doto, monospace" fontWeight="900" fontSize="16" letterSpacing="-.3" fill="#1D1C1A" fillOpacity=".88">Fillers</text>
                </g><g transform="rotate(0.7 177 280.25)">
                  <path d="M72 210 V146.75 Q72 144.25 74.5 144.25 H279.5 Q282 144.25 282 146.75 V210 Z" fill="#FDFBF6" filter="url(#hx-tin-cardsh)" />

                  <path d="M72 210 V146.75 Q72 144.25 74.5 144.25 H279.5 Q282 144.25 282 146.75 V210 Z" fill="url(#hx-tin-cardsheen)" />
                  <path d="M73 157.25 H281" stroke="#FF5A1F" strokeOpacity=".8" strokeWidth="1.3" />
                  <path d="M73 167.25 H281 M73 176.85 H281 M73 186.45 H281 M73 196.05 H281 M73 205.65 H281" stroke="#86A6D8" strokeOpacity=".5" strokeWidth=".9" />
                  <path d="M72 210 V146.75 Q72 144.25 74.5 144.25 H279.5 Q282 144.25 282 146.75 V210 Z" fill="url(#hx-tin-sink)" />
                  <path d="M72 210 V146.75 Q72 144.25 74.5 144.25 H279.5 Q282 144.25 282 146.75 V210 Z" fill="none" stroke="rgba(29,28,26,.17)" strokeWidth=".8" />
                  <path d="M74.5 144.95 H279.5" stroke="#fff" strokeOpacity=".8" strokeWidth="1" />

                </g></g>
              <path className="hx-tin-wall" d="M58 189 A22 11 0 0 0 80 200 H272 A22 11 0 0 0 294 189
  V237 A22 11 0 0 1 272 248 H80 A22 11 0 0 1 58 237 Z" fill="url(#hx-tin-wall-x)" />
              <path d="M58 189 A22 11 0 0 0 80 200 H272 A22 11 0 0 0 294 189
  V237 A22 11 0 0 1 272 248 H80 A22 11 0 0 1 58 237 Z" fill="url(#hx-tin-wall-y)" />
              <g clipPath="url(#hx-tin-wallclip)">
                <rect x="58" y="189" width="236" height="59" fill="url(#hx-tin-spec)" filter="url(#hx-tin-soft2)" />
                <path d="M58 193.6 A22 11 0 0 0 80 204.6 H272 A22 11 0 0 0 294 193.6" fill="none" stroke="#10271B" strokeOpacity=".3" strokeWidth="3" filter="url(#hx-tin-soft)" />
                <path d="M58 231.6 A22 11 0 0 0 80 242.6 H272 A22 11 0 0 0 294 231.6" fill="none" stroke="#fff" strokeOpacity=".12" strokeWidth="1.1" />
                <path d="M58 235 A22 11 0 0 0 80 246 H272 A22 11 0 0 0 294 235" fill="none" stroke="#10271B" strokeOpacity=".45" strokeWidth="2.6" />
              </g>
              <path d="M58 189 A22 11 0 0 0 80 200 H272 A22 11 0 0 0 294 189
  V237 A22 11 0 0 1 272 248 H80 A22 11 0 0 1 58 237 Z" fill="none" stroke="#10271B" strokeOpacity=".5" strokeWidth="1" />
              <path d="M58 189.7 A22 11 0 0 0 80 200.7 H272 A22 11 0 0 0 294 189.7" fill="none" stroke="#244B3B" strokeWidth="7" />
              <path d="M58 188.5 A22 11 0 0 0 80 199.5 H272 A22 11 0 0 0 294 188.5" fill="none" stroke="#4F8870" strokeWidth="4.4" />
              <path d="M58 187.3 A22 11 0 0 0 80 198.3 H272 A22 11 0 0 0 294 187.3" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="1.1" />
              <g transform="translate(108 197.6) scale(1)"><path d="M0 .4 l2.1 -1.1 l1.6 .3 l1.9 -.2 l.9 1.2 l-.8 1.3 l-2.3 .4 l-2.4 -.3 z" fill="#CFD8CF" fillOpacity=".85" /><path d="M.6 1.6 l2.4 .3 l2.3 -.4" fill="none" stroke="#10271B" strokeOpacity=".5" strokeWidth=".6" /></g>
              <g transform="translate(286.4 203) scale(0.7)"><path d="M0 .4 l2.1 -1.1 l1.6 .3 l1.9 -.2 l.9 1.2 l-.8 1.3 l-2.3 .4 l-2.4 -.3 z" fill="#CFD8CF" fillOpacity=".85" /><path d="M.6 1.6 l2.4 .3 l2.3 -.4" fill="none" stroke="#10271B" strokeOpacity=".5" strokeWidth=".6" /></g>
            </svg></div>
          </div>
          <div className="hx-grp hx-br">
            <div className="hx-obj hx-strap"><svg className="hx-lanyard-svg" viewBox="0 0 180 240" width="180" height="240" overflow="visible">
              <defs>
                <filter id="hx-bd-lift-thin" x="-10%" y="-20%" width="120%" height="160%" colorInterpolationFilters="sRGB">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="a1" /><feOffset in="a1" dy="1.2" result="b1" />
                  <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="a2" /><feOffset in="a2" dy="5" result="b2" />
                  <feComponentTransfer in="b1" result="c1"><feFuncA type="linear" slope=".16" /></feComponentTransfer>
                  <feComponentTransfer in="b2" result="c2"><feFuncA type="linear" slope=".12" /></feComponentTransfer>
                  <feMerge result="m"><feMergeNode in="c2" /><feMergeNode in="c1" /></feMerge>
                  <feFlood floodColor="rgb(60,48,30)" /><feComposite in2="m" operator="in" result="sh" />
                  <feMerge><feMergeNode in="sh" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <linearGradient id="hx-bd-metal" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#B9B4AA" /><stop offset=".35" stopColor="#F2F0EB" /><stop offset=".55" stopColor="#D3CFC7" /><stop offset="1" stopColor="#A7A196" /></linearGradient>
                <linearGradient id="hx-bd-metal-v" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ECE9E3" /><stop offset=".5" stopColor="#CFCAC1" /><stop offset="1" stopColor="#A9A398" /></linearGradient>
              </defs>
              <g filter="url(#hx-bd-lift-thin)">
                <path d="M90 -46 C 90 -57, 103 -61, 146 -61 C 226 -61, 298 -36, 392 -40 C 510 -44, 648 -108, 1300 -120" fill="none" stroke="#1D1C1A" strokeWidth="18.2" strokeLinecap="butt" />
                <path d="M90 -46 C 90 -57, 103 -61, 146 -61 C 226 -61, 298 -36, 392 -40 C 510 -44, 648 -108, 1300 -120" fill="none" stroke="#3E5C9A" strokeWidth="15" strokeLinecap="butt" />
                <path d="M90 -46 C 90 -57, 103 -61, 146 -61 C 226 -61, 298 -36, 392 -40 C 510 -44, 648 -108, 1300 -120" fill="none" stroke="#2C4475" strokeWidth="15" strokeDasharray=".8 1.6" strokeLinecap="butt" opacity=".35" />
                <path d="M90 -46 C 90 -57, 103 -61, 146 -61 C 226 -61, 298 -36, 392 -40 C 510 -44, 648 -108, 1300 -120" fill="none" stroke="#8FA6D0" strokeWidth="7" strokeLinecap="butt" opacity=".45" />
                <path d="M90 -46 C 90 -57, 103 -61, 146 -61 C 226 -61, 298 -36, 392 -40 C 510 -44, 648 -108, 1300 -120" fill="none" stroke="#3E5C9A" strokeWidth="5" strokeLinecap="butt" />
                <path d="M90 -46 C 90 -57, 103 -61, 146 -61 C 226 -61, 298 -36, 392 -40 C 510 -44, 648 -108, 1300 -120" fill="none" stroke="#2C4475" strokeWidth="5" strokeDasharray=".8 1.6" strokeLinecap="butt" opacity=".35" />
              </g>
              <g filter="url(#hx-bd-lift-thin)" stroke="#1D1C1A" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
                <rect x="77" y="-52" width="26" height="16" rx="3" fill="url(#hx-bd-metal)" />
                <path d="M80 -44 h20" strokeOpacity=".28" />
                <rect x="86.5" y="-36" width="7" height="8" rx="1.5" fill="url(#hx-bd-metal)" />
                <path d="M87 -28 H93 C 97 -23, 100 -12, 100 -1 C 100 10, 95 17, 89 17 C 83 17, 79 10, 79 0 C 79 -12, 83 -23, 87 -28 Z" fill="url(#hx-bd-metal-v)" />
                <path d="M89 -15 C 94 -15, 95 -6, 95 1 C 95 8, 92 11, 89 11 C 86 11, 84 7, 84 1 C 84 -7, 86 -15, 89 -15 Z" fill="#F6F5F1" fillOpacity=".9" />
                <path d="M84 1 C 84 -7, 86 -15, 89 -15" fill="none" strokeWidth="2.2" />
                <path d="M99 -9 l5 -3 l1.5 3 l-5 2.6" fill="url(#hx-bd-metal)" strokeWidth="1.2" />
                <path d="M83 -18 C 82 -12, 81 -6, 81 0" fill="none" stroke="#fff" strokeOpacity=".85" strokeWidth="1.1" />
              </g>
            </svg></div>
            <div className="hx-obj hx-badge"><div className="hx-turn"><svg className="hx-badge-svg" viewBox="0 0 180 240" width="180" height="240" overflow="visible">
              <defs>
                <pattern id="hx-bd-grain" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".8" fill="rgba(29,28,26,.08)" /></pattern>
                <linearGradient id="hx-bd-glare" x1="0" y1="0" x2="1" y2="1"><stop offset=".54" stopColor="#fff" stopOpacity="0" /><stop offset=".63" stopColor="#fff" stopOpacity=".18" /><stop offset=".69" stopColor="#fff" stopOpacity=".04" /><stop offset=".8" stopColor="#fff" stopOpacity="0" /></linearGradient>
                <clipPath id="hx-bd-clip"><path d="M12 0 H168 A12 12 0 0 1 180 12 V228 A12 12 0 0 1 168 240 H12 A12 12 0 0 1 0 228 V12 A12 12 0 0 1 12 0 Z
    M72 11 H108 A5 5 0 0 1 108 21 H72 A5 5 0 0 1 72 11 Z" clipRule="evenodd" /></clipPath>
                <filter id="hx-bd-soft" x="-20%" y="-30%" width="140%" height="160%"><feGaussianBlur stdDeviation="2.2" /></filter>
                <clipPath id="hx-bd-card"><rect x="0" y="0" width="162" height="196" rx="5" /></clipPath>
                <linearGradient id="hx-bd-fu-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#45423E" /><stop offset=".07" stopColor="#2A2826" /><stop offset=".55" stopColor="#1D1C1A" /><stop offset="1" stopColor="#141312" /></linearGradient>
                <linearGradient id="hx-bd-fu-face" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1A1918" /><stop offset="1" stopColor="#222120" /></linearGradient>
                <linearGradient id="hx-bd-fu-top" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4D4A45" /><stop offset=".75" stopColor="#3B3935" /><stop offset="1" stopColor="#302E2B" /></linearGradient>
                <linearGradient id="hx-bd-fu-bot" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1E1D1B" /><stop offset=".3" stopColor="#252321" /><stop offset="1" stopColor="#2A2826" /></linearGradient>
                <linearGradient id="hx-bd-fu-well" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopOpacity=".62" /><stop offset=".22" stopOpacity="0" /><stop offset=".8" stopOpacity="0" /><stop offset="1" stopOpacity=".25" /></linearGradient>
                <linearGradient id="hx-bd-fu-pin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#B3ADA2" /><stop offset=".45" stopColor="#77726A" /><stop offset="1" stopColor="#3A3734" /></linearGradient>
                <filter id="hx-bd-fu-tight" x="-10%" y="-20%" width="120%" height="140%"><feGaussianBlur stdDeviation=".7" /></filter><clipPath id="hx-bd-fu-t0"><rect x="24.9" y="137.5" width="20.7" height="15.6" /></clipPath><clipPath id="hx-bd-fu-b0"><rect x="24.9" y="153.9" width="20.7" height="17.1" /></clipPath><clipPath id="hx-bd-fu-t2"><rect x="53.9" y="137.5" width="20.7" height="15.6" /></clipPath><clipPath id="hx-bd-fu-b2"><rect x="53.9" y="153.9" width="20.7" height="17.1" /></clipPath><clipPath id="hx-bd-fu-t4"><rect x="87.4" y="137.5" width="20.7" height="15.6" /></clipPath><clipPath id="hx-bd-fu-b4"><rect x="87.4" y="153.9" width="20.7" height="17.1" /></clipPath><clipPath id="hx-bd-fu-t6"><rect x="116.4" y="137.5" width="20.7" height="15.6" /></clipPath><clipPath id="hx-bd-fu-b6"><rect x="116.4" y="153.9" width="20.7" height="17.1" /></clipPath>
              </defs>
              <g className="hx-badge-body">
                <path d="M12 0 H168 A12 12 0 0 1 180 12 V228 A12 12 0 0 1 168 240 H12 A12 12 0 0 1 0 228 V12 A12 12 0 0 1 12 0 Z
    M72 11 H108 A5 5 0 0 1 108 21 H72 A5 5 0 0 1 72 11 Z" fillRule="evenodd" fill="rgba(250,249,245,.52)" />
                <g transform="translate(9 34)">
                  <g clipPath="url(#hx-bd-card)">
                    <rect width="162" height="196" fill="#FCFBF8" />
                    <rect y="110" width="162" height="86" fill="#D1B190" />
                    <rect y="110" width="162" height="86" fill="url(#hx-bd-grain)" />
                    <rect x="18" y="133.5" width="126" height="48" rx="6" fill="rgb(60,40,22)" opacity=".26" filter="url(#hx-bd-soft)" />
                    <rect x="17.5" y="130.8" width="127" height="48" rx="5.6" fill="rgb(40,28,16)" opacity=".42" filter="url(#hx-bd-fu-tight)" />
                    <rect x="17" y="129.5" width="128" height="48" rx="5.5" fill="url(#hx-bd-fu-body)" />
                    <path d="M21 130.05 H141" stroke="#fff" strokeOpacity=".28" strokeWidth=".7" strokeLinecap="round" />
                    <rect x="19.4" y="131.9" width="123.2" height="43.2" rx="3.6" fill="url(#hx-bd-fu-face)" />
                    <path d="M19.8 135.5 Q19.8 132.4 23 132.4 H139 Q142.2 132.4 142.2 135.5" fill="none" stroke="#000" strokeOpacity=".6" strokeWidth=".9" />
                    <path d="M22.4 174.75 H139.6" stroke="#fff" strokeOpacity=".12" strokeWidth=".6" strokeLinecap="round" />
                    <g stroke="#fff" strokeLinecap="round" fill="none"><path d="M26 130.4 h3.2" strokeOpacity=".14" strokeWidth=".45" /><path d="M130 130.3 h1.6" strokeOpacity=".12" strokeWidth=".4" /><path d="M18 170.5 v2.2" strokeOpacity=".12" strokeWidth=".45" /><path d="M144 138.5 v1.6" strokeOpacity=".1" strokeWidth=".45" /></g>
                    <g>
                      <rect x="24" y="136" width="22.5" height="35" rx="1.7" fill="#0C0B0A" />
                      <path d="M25.9 137.05 H44.6" stroke="#4A4743" strokeWidth=".6" />
                      <path d="M24.9 153.1 V138.7 Q24.9 137.5 26.1 137.5 H44.4 Q45.6 137.5 45.6 138.7 V153.1 Z" fill="url(#hx-bd-fu-top)" /><rect x="24.9" y="137.5" width="20.7" height="15.6" rx="1.2" fill="#fff" fillOpacity="0.025" />
                      <text className="hx-bd-ch" x="35.25" y="163.65" textAnchor="middle" fontSize="29" fill="#F3EFE7" clipPath="url(#hx-bd-fu-t0)">4</text>
                      <g><path d="M24.9 153.9 V169.4 Q24.9 170.6 26.1 170.6 H44.4 Q45.6 170.6 45.6 169.4 V153.9 Z" fill="url(#hx-bd-fu-bot)" /><text className="hx-bd-ch" x="35.53" y="163.65" textAnchor="middle" fontSize="29" fill="#E4DFD5" clipPath="url(#hx-bd-fu-b0)">4</text><path d="M24.9 154.2 H45.6" stroke="#fff" strokeOpacity=".08" strokeWidth=".5" /></g>
                      <path d="M24.9 152.8 H45.6" stroke="#000" strokeOpacity=".3" strokeWidth=".5" />
                      <rect x="24.1" y="152.5" width=".75" height="2" rx=".35" fill="url(#hx-bd-fu-pin)" /><rect x="45.65" y="152.5" width=".75" height="2" rx=".35" fill="url(#hx-bd-fu-pin)" />
                      <rect x="24" y="136" width="22.5" height="35" rx="1.7" fill="url(#hx-bd-fu-well)" />
                      <path d="M25.4 171.35 H45.1" stroke="#fff" strokeOpacity=".06" strokeWidth=".5" /></g><g>
                      <rect x="53" y="136" width="22.5" height="35" rx="1.7" fill="#0C0B0A" />
                      <path d="M54.9 137.05 H73.6" stroke="#4A4743" strokeWidth=".6" />
                      <path d="M53.9 153.1 V138.7 Q53.9 137.5 55.1 137.5 H73.4 Q74.6 137.5 74.6 138.7 V153.1 Z" fill="url(#hx-bd-fu-top)" /><rect x="53.9" y="137.5" width="20.7" height="15.6" rx="1.2" fill="#000" fillOpacity="0.02" />
                      <text className="hx-bd-ch" x="64.25" y="163.65" textAnchor="middle" fontSize="29" fill="#F3EFE7" clipPath="url(#hx-bd-fu-t2)">5</text>
                      <g transform="translate(0 0.18)"><path d="M53.9 153.9 V169.4 Q53.9 170.6 55.1 170.6 H73.4 Q74.6 170.6 74.6 169.4 V153.9 Z" fill="url(#hx-bd-fu-bot)" /><text className="hx-bd-ch" x="64.37" y="163.65" textAnchor="middle" fontSize="29" fill="#E4DFD5" clipPath="url(#hx-bd-fu-b2)">5</text><path d="M53.9 154.2 H74.6" stroke="#fff" strokeOpacity=".08" strokeWidth=".5" /></g>
                      <path d="M53.9 152.8 H74.6" stroke="#000" strokeOpacity=".3" strokeWidth=".5" />
                      <rect x="53.1" y="152.5" width=".75" height="2" rx=".35" fill="url(#hx-bd-fu-pin)" /><rect x="74.65" y="152.5" width=".75" height="2" rx=".35" fill="url(#hx-bd-fu-pin)" />
                      <rect x="53" y="136" width="22.5" height="35" rx="1.7" fill="url(#hx-bd-fu-well)" />
                      <path d="M54.4 171.35 H74.1" stroke="#fff" strokeOpacity=".06" strokeWidth=".5" /></g><g>
                      <rect x="86.5" y="136" width="22.5" height="35" rx="1.7" fill="#0C0B0A" />
                      <path d="M88.4 137.05 H107.1" stroke="#4A4743" strokeWidth=".6" />
                      <path d="M87.4 153.1 V138.7 Q87.4 137.5 88.6 137.5 H106.9 Q108.1 137.5 108.1 138.7 V153.1 Z" fill="url(#hx-bd-fu-top)" />
                      <text className="hx-bd-ch" x="97.75" y="163.65" textAnchor="middle" fontSize="29" fill="#FF5A1F" clipPath="url(#hx-bd-fu-t4)">5</text>
                      <g><path d="M87.4 153.9 V169.4 Q87.4 170.6 88.6 170.6 H106.9 Q108.1 170.6 108.1 169.4 V153.9 Z" fill="url(#hx-bd-fu-bot)" /><text className="hx-bd-ch" x="98.09" y="163.65" textAnchor="middle" fontSize="29" fill="#E9521C" clipPath="url(#hx-bd-fu-b4)">5</text><path d="M87.4 154.2 H108.1" stroke="#fff" strokeOpacity=".08" strokeWidth=".5" /></g>
                      <path d="M87.4 152.8 H108.1" stroke="#000" strokeOpacity=".3" strokeWidth=".5" />
                      <rect x="86.6" y="152.5" width=".75" height="2" rx=".35" fill="url(#hx-bd-fu-pin)" /><rect x="108.15" y="152.5" width=".75" height="2" rx=".35" fill="url(#hx-bd-fu-pin)" />
                      <rect x="86.5" y="136" width="22.5" height="35" rx="1.7" fill="url(#hx-bd-fu-well)" />
                      <path d="M87.9 171.35 H107.6" stroke="#fff" strokeOpacity=".06" strokeWidth=".5" /></g><g>
                      <rect x="115.5" y="136" width="22.5" height="35" rx="1.7" fill="#0C0B0A" />
                      <path d="M117.4 137.05 H136.1" stroke="#4A4743" strokeWidth=".6" />
                      <path d="M116.4 153.1 V138.7 Q116.4 137.5 117.6 137.5 H135.9 Q137.1 137.5 137.1 138.7 V153.1 Z" fill="url(#hx-bd-fu-top)" /><rect x="116.4" y="137.5" width="20.7" height="15.6" rx="1.2" fill="#fff" fillOpacity="0.015" />
                      <text className="hx-bd-ch" x="126.75" y="163.65" textAnchor="middle" fontSize="29" fill="#FF5A1F" clipPath="url(#hx-bd-fu-t6)">5</text>
                      <g transform="translate(0 0.1)"><path d="M116.4 153.9 V169.4 Q116.4 170.6 117.6 170.6 H135.9 Q137.1 170.6 137.1 169.4 V153.9 Z" fill="url(#hx-bd-fu-bot)" /><text className="hx-bd-ch" x="126.95" y="163.65" textAnchor="middle" fontSize="29" fill="#E9521C" clipPath="url(#hx-bd-fu-b6)">5</text><path d="M116.4 154.2 H137.1" stroke="#fff" strokeOpacity=".08" strokeWidth=".5" /></g>
                      <path d="M116.4 152.8 H137.1" stroke="#000" strokeOpacity=".3" strokeWidth=".5" />
                      <rect x="115.6" y="152.5" width=".75" height="2" rx=".35" fill="url(#hx-bd-fu-pin)" /><rect x="137.15" y="152.5" width=".75" height="2" rx=".35" fill="url(#hx-bd-fu-pin)" />
                      <rect x="115.5" y="136" width="22.5" height="35" rx="1.7" fill="url(#hx-bd-fu-well)" />
                      <path d="M116.9 171.35 H136.6" stroke="#fff" strokeOpacity=".06" strokeWidth=".5" /></g><circle cx="49.75" cy="161.95" r="1.75" fill="#F3EFE7" fillOpacity=".96" /><path d="M80.65 140 V167" stroke="#000" strokeOpacity=".55" strokeWidth=".7" /><path d="M81.35 140 V167" stroke="#fff" strokeOpacity=".08" strokeWidth=".7" /><circle cx="112.25" cy="161.95" r="1.75" fill="#FF5A1F" fillOpacity=".96" />
                  </g>
                  <g transform="translate(12 11) scale(0.17)"><path d="M52.2 50L52.2 9A20.5 20.5 0 0 1 52.2 50ZM50 52.2L91 52.2A20.5 20.5 0 0 1 50 52.2ZM47.8 50L47.8 91A20.5 20.5 0 0 1 47.8 50ZM50 47.8L9 47.8A20.5 20.5 0 0 1 50 47.8Z" fill="#1D1C1A" /></g>
                  <text className="hx-badge-name" x="11.5" y="64" fontFamily="Fraunces, Georgia, serif" fontWeight="380" fontSize="42" letterSpacing="-.84" fill="#1D1C1A" style={{ "fontVariationSettings": "'opsz' 144" } as React.CSSProperties}>Active</text>
                  <text className="hx-badge-name" x="11.5" y="99" fontFamily="Fraunces, Georgia, serif" fontWeight="380" fontSize="42" letterSpacing="-.84" fill="#1D1C1A" style={{ "fontVariationSettings": "'opsz' 144" } as React.CSSProperties}>Speaker</text>
                  <rect x=".5" y=".5" width="161" height="195" rx="4.5" fill="none" stroke="rgba(29,28,26,.14)" />
                </g>
                <path d="M12 0 H168 A12 12 0 0 1 180 12 V228 A12 12 0 0 1 168 240 H12 A12 12 0 0 1 0 228 V12 A12 12 0 0 1 12 0 Z
    M72 11 H108 A5 5 0 0 1 108 21 H72 A5 5 0 0 1 72 11 Z" fillRule="evenodd" fill="rgba(255,255,255,.07)" />
                <g clipPath="url(#hx-bd-clip)"><rect width="180" height="240" fill="url(#hx-bd-glare)" /></g>
                <rect x="4.5" y="4.5" width="171" height="231" rx="8.5" fill="none" stroke="rgba(29,28,26,.10)" strokeWidth="1" />
                <path d="M12 0 H168 A12 12 0 0 1 180 12 V228 A12 12 0 0 1 168 240 H12 A12 12 0 0 1 0 228 V12 A12 12 0 0 1 12 0 Z
    M72 11 H108 A5 5 0 0 1 108 21 H72 A5 5 0 0 1 72 11 Z" fillRule="evenodd" fill="none" stroke="rgba(29,28,26,.34)" strokeWidth="1" />
                <rect x="1.6" y="1.6" width="176.8" height="236.8" rx="10.5" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="1" />
                <rect x="67" y="12.2" width="46" height="10" rx="5" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="1" />
              </g>
            </svg></div></div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex flex-col items-center"
        >
          <h1 className="hx-h" id="hx-title" aria-label="Speak clearly without fear.">
            <span className="hx-hl" aria-hidden="true">
              Speak <span className="hx-dot"><span className="hx-w" style={{ transition: "opacity 220ms var(--ease)", opacity: wordOpacity }}>{words[wordIndex]}</span></span>
            </span>
            <span className="hx-hl" aria-hidden="true">without fear.</span>
          </h1>
          <p className="hx-sub">For engineers and ambitious builders who want to communicate with presence and zero judgment.</p>
          <div className="hx-cta">
            <a className="key key-dark key-lg cursor-pointer" href="#arenas" data-start>Start speaking</a>
            <a className="link-quiet cursor-pointer" href="#how">See a lesson</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
