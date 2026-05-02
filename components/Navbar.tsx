"use client";

import LoginButton from "./LoginButton";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl"
    >
      <div className="flex items-center justify-between px-6 py-3 rounded-2xl 
      backdrop-blur-xl bg-white/60 border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">

        {/* LOGO */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-lg md:text-xl font-semibold tracking-tight 
          bg-gradient-to-r from-orange-400 via-purple-400 to-blue-500 
          bg-clip-text text-transparent cursor-pointer"
        >
          NoJudgment
        </motion.div>

        {/* CENTER LINKS */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">

          {[
            { name: "About", id: "about" },
            { name: "Modes", id: "modes" },
            { name: "Community", id: "community" },
          ].map((item) => (
            <a
              key={item.name}
              href={`#${item.id}`}
              className="relative text-black/80 hover:text-black transition"
            >
              {item.name}

              {/* modern underline */}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
            </a>
          ))}

        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* ghost login */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <button className="text-sm px-4 py-2 rounded-full text-black/70 hover:text-black transition">
              Login
            </button>
          </motion.div>

          {/* primary CTA */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <button className="text-sm px-5 py-2 rounded-full 
            bg-black text-white hover:bg-black/90 transition shadow-md">
              Get Started
            </button>
          </motion.div>

        </div>
      </div>
    </motion.header>
  );
}