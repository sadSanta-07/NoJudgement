"use client";

import LoginButton from "./LoginButton";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full flex items-center justify-between px-6 md:px-12 py-4 md:py-5 backdrop-blur-md bg-white/70 border-b border-white/20"
    >

      {/* LOGO */}
      <motion.div
        whileHover={{ scale: 1.04 }}
        className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-orange-400 via-purple-400 to-blue-500 bg-clip-text text-transparent cursor-pointer"
      >
        NoJudgment
      </motion.div>

      {/* CENTER LINKS */}
      <nav className="hidden md:flex items-center space-x-8 text-gray-500 font-medium">

        {[
          { name: "About", id: "about" },
          { name: "Modes", id: "modes" },
          { name: "Community", id: "community" },
        ].map((item) => (
          <a
            key={item.name}
            href={`#${item.id}`}
            className="relative group"
          >
            <span className="transition-colors group-hover:text-gray-900">
              {item.name}
            </span>

            {/* underline */}
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-orange-400 to-blue-500 transition-all duration-300 group-hover:w-full" />
          </a>
        ))}

      </nav>

      {/* RIGHT SIDE */}
      <div className="flex items-center space-x-3">

        <motion.div whileHover={{ scale: 1.05 }}>
          <LoginButton label="Login" />
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <LoginButton label="Get Started" />
        </motion.div>

      </div>
    </motion.header>
  );
}