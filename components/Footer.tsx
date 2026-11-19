"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="foot fw relative overflow-hidden w-full max-w-full" id="footer">
      {/* Blueprint Grid Lines Behind Footer */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="fw-in w-full max-w-[1320px] mx-auto px-6 pt-16 pb-10 flex flex-col justify-between">
        {/* GIANT AUTO-SCALING FOOTER WATERMARK (PERFECT FIT ON ALL SCREENS) */}
        <div className="foot-mark w-full flex items-center justify-center my-6 select-none overflow-hidden" aria-hidden="true">
          <svg
            viewBox="0 0 1020 135"
            className="w-full max-w-[1240px] h-auto select-none"
            preserveAspectRatio="xMidYMid meet"
          >
            <text
              x="510"
              y="108"
              textAnchor="middle"
              fontFamily="var(--serif)"
              fontSize="126"
              fontWeight="300"
              letterSpacing="-0.04em"
              fill="rgba(246, 244, 238, 0.94)"
            >
              no<tspan fontStyle="italic">judgment</tspan>
            </text>
          </svg>
        </div>

        {/* BOTTOM METADATA BAR */}
        <div className="fw-base flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10 text-sm text-[#EDEBE5]/60">
          <nav className="fw-more flex items-center gap-6" aria-label="Footer links">
            <Link href="/dashboard/practice" className="hover:text-white transition-colors">
              Arenas
            </Link>
            <Link href="/#plans" className="hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <a
              href="mailto:help@nojudgment.com"
              className="hover:text-white transition-colors"
            >
              Contact
            </a>
          </nav>
          <p>© {new Date().getFullYear()} nojudgment. Built for engineers & ambitious builders.</p>
        </div>
      </div>
    </footer>
  );
}
