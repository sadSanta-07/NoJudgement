"use client";

import LoginButton from "./LoginButton";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full flex items-center justify-between px-6 md:px-12 py-7 md:py-8 backdrop-blur-lg bg-white/70 border-b border-white/20 shadow-sm">

      {/* LOGO (bigger + stronger presence) */}
      <div className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-orange-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">
        NoJudgment
      </div>

      {/* CENTER LINKS */}
      <nav className="hidden md:flex items-center space-x-10 text-gray-500 font-medium text-lg">
        <a href="#" className="hover:text-gray-900 transition-colors">
          About
        </a>
        <a href="#" className="hover:text-gray-900 transition-colors">
          Modes
        </a>
        <a href="#" className="hover:text-gray-900 transition-colors">
          Community
        </a>
      </nav>

      {/* RIGHT SIDE */}
      <div className="flex items-center space-x-6">

        {/* Login */}
        <LoginButton label="Login" />

        {/* Get Started */}
        <div className="hidden sm:block">
          <LoginButton label="Get Started" />
        </div>

      </div>
    </header>
  );
}