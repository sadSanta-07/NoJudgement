"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="w-full mt-24 px-6 md:px-12 py-10 bg-[#F9FAFB] border-t border-gray-200">

      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">

        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-orange-400 via-purple-400 to-blue-500 bg-clip-text text-transparent mb-3 cursor-pointer"
        >
          NoJudgment
        </motion.div>

        {/* Divider */}
        <div className="w-10 h-[2px] bg-gradient-to-r from-orange-400 to-blue-500 rounded-full mb-4 opacity-70" />

        {/* Text */}
        <p className="text-gray-400 text-sm tracking-wide">
         Built with Love
        </p>

      </div>
    </footer>
  );
}