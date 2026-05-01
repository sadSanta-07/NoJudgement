"use client";

export default function Footer() {
  return (
    <footer className="w-full py-2 flex flex-col items-center justify-center text-center bg-[#F9FAFB] border-t border-gray-200">

      {/* Logo */}
      <div className="text-lg md:text-xl font-semibold bg-gradient-to-r from-orange-400 via-purple-400 to-blue-500 bg-clip-text text-transparent mb-4">
        NoJudgment
      </div>

      {/* Copyright */}
      <p className="text-gray-500 text-sm">
        © 2026 NoJudgment.Built With Love.
      </p>

    </footer>
  );
}