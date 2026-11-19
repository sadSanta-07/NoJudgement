"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pillRef = useRef<HTMLDivElement>(null);
  const hiRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePointerEnter = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    if (pillRef.current && hiRef.current) {
      pillRef.current.classList.add("hovering");
      hiRef.current.style.width = `${target.offsetWidth}px`;
      hiRef.current.style.transform = `translateX(${target.offsetLeft}px)`;
    }
  };

  const handlePointerLeave = () => {
    if (pillRef.current) {
      pillRef.current.classList.remove("hovering");
    }
  };

  const navLinks = [
    { label: "Learn", href: "#arenas" },
    { label: "Practice", href: "#practice" },
    { label: "Interview", href: "#interview" },
    { label: "Pass", href: "#plans" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <>
      <header className={`nav ${isScrolled ? "scrolled" : ""} ${isMenuOpen ? "open" : ""}`} id="nav">
        <div className="nav-in">
          {/* BRAND WORDMARK WITH SPINNING PINWHEEL */}
          <Link href="/" className="wordmark" aria-label="nojudgment, home">
            <svg className="pw-mark" viewBox="4 4 92 92" aria-hidden="true" focusable="false">
              <g className="pw-spin">
                <path
                  d="M52.2 50L52.2 9A20.5 20.5 0 0 1 52.2 50ZM50 52.2L91 52.2A20.5 20.5 0 0 1 50 52.2ZM47.8 50L47.8 91A20.5 20.5 0 0 1 47.8 50ZM50 47.8L9 47.8A20.5 20.5 0 0 1 50 47.8Z"
                  fill="currentColor"
                />
              </g>
            </svg>
            <span>
              no<i>judgment</i>
            </span>
          </Link>

          {/* CENTER FLOATING PILL MENU WITH SLIDING HIGHLIGHT */}
          <nav className="nav-center" aria-label="Main">
            <div
              className="nav-pill"
              id="nav-pill"
              ref={pillRef}
              onPointerLeave={handlePointerLeave}
            >
              <i className="nav-hi" ref={hiRef} aria-hidden="true" />
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  className="nav-item"
                  href={item.href}
                  onPointerEnter={handlePointerEnter}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          {/* RIGHT CTA / USER BUTTONS */}
          <div className="nav-right">
            {!session ? (
              <>
                <button
                  type="button"
                  onClick={() => signIn("google")}
                  className="nav-sign cursor-pointer"
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={() => signIn("google")}
                  className="key key-dark key-sm nav-cta cursor-pointer"
                >
                  Start speaking
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="key key-dark key-sm text-xs"
                >
                  Dashboard →
                </Link>
                <div className="flex items-center gap-2">
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      width={30}
                      height={30}
                      className="rounded-full border border-[var(--rule)]"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[var(--ink)] text-[var(--sheet)] text-xs flex items-center justify-center font-bold">
                      {session.user?.name?.charAt(0) || "U"}
                    </div>
                  )}
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-xs font-mono text-[var(--ink-2)] hover:text-[var(--ink)] cursor-pointer"
                  >
                    Exit
                  </button>
                </div>
              </div>
            )}

            {/* MOBILE BURGER */}
            <button
              className="nav-burger"
              id="nav-burger"
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span />
              <span />
              <b>Menu</b>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE SHEET DRAWER */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 top-[62px] z-40 bg-[var(--page)] p-6 flex flex-col justify-between overflow-y-auto sm:hidden animate-in fade-in slide-in-from-top-2 duration-200"
          id="nav-sheet"
        >
          <div className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="p-4 rounded-xl bg-[var(--sheet)] border border-[var(--rule)] text-lg font-medium text-[var(--ink)] flex items-center justify-between shadow-sm active:scale-[0.99] transition-transform"
              >
                <span>{item.label}</span>
                <span className="text-[var(--ink-3)] font-mono text-sm">→</span>
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-[var(--rule)] flex flex-col gap-3">
            {!session ? (
              <>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    signIn("google");
                  }}
                  className="key key-dark w-full py-3.5 text-center text-sm font-medium"
                >
                  Start speaking
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    signIn("google");
                  }}
                  className="w-full py-3 text-center text-sm text-[var(--ink-2)]"
                >
                  Sign in
                </button>
              </>
            ) : (
              <Link
                href="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="key key-dark w-full py-3.5 text-center text-sm"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
