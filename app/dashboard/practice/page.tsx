"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Coffee,
  Swords,
  ArrowRight,
  Clock,
  Star,
} from "lucide-react";

const modes = [
  {
    id: "interview",
    title: "Job Interview",
    desc: "Simulate high-pressure interviews with specialized AI questions.",
    icon: Briefcase,
    color: "blue",
    stats: "150+ Questions",
    difficulty: "Hard",
  },
  {
    id: "casual",
    title: "Casual Chit-chat",
    desc: "Practice everyday English with random conversation prompts.",
    icon: Coffee,
    color: "orange",
    stats: "Common Topics",
    difficulty: "Easy",
  },
  {
    id: "debate",
    title: "Debate Club",
    desc: "Argue for or against topics to improve persuasive speaking.",
    icon: Swords,
    color: "purple",
    stats: "Daily Topics",
    difficulty: "Expert",
  },
];

const colorMap = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-500",
    accent: "bg-blue-500/5",
    hover: "group-hover:bg-blue-500/10",
    btn: "group-hover:bg-blue-600",
  },
  orange: {
    bg: "bg-orange-50",
    text: "text-orange-500",
    accent: "bg-orange-500/5",
    hover: "group-hover:bg-orange-500/10",
    btn: "group-hover:bg-orange-600",
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-500",
    accent: "bg-purple-500/5",
    hover: "group-hover:bg-purple-500/10",
    btn: "group-hover:bg-purple-600",
  },
};

export default function PracticeMode() {
  return (
    <div className="space-y-8 p-6 md:p-10">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Choose Practice Mode
          </h2>
          <p className="text-gray-400 mt-1">
            Select a scenario to start your focused speaking session.
          </p>
        </div>

        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-white border rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50">
            By Topic
          </button>
          <button className="px-4 py-2 bg-white border rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50">
            By Level
          </button>
        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {modes.map((mode, i) => {
          const color = colorMap[mode.color as keyof typeof colorMap];

          return (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white p-8 rounded-[2rem] border shadow-sm flex flex-col h-full relative overflow-hidden transition-all group-hover:shadow-xl">

                {/* Accent */}
                <div
                  className={`absolute top-0 right-0 w-24 h-24 ${color.accent} ${color.hover} rounded-bl-[4rem]`}
                />

                {/* Icon */}
                <div
                  className={`w-14 h-14 ${color.bg} ${color.text} rounded-2xl flex items-center justify-center mb-8`}
                >
                  <mode.icon size={28} />
                </div>

                <div className="flex-1">
                  {/* BADGES */}
                  <div className="flex gap-2 mb-2">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                        mode.difficulty === "Easy"
                          ? "bg-green-50 text-green-600"
                          : mode.difficulty === "Hard"
                          ? "bg-orange-50 text-orange-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {mode.difficulty}
                    </span>

                    <span className="text-[10px] font-bold text-gray-400 flex items-center">
                      <Clock size={10} className="mr-1" /> 15 MIN
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-3">{mode.title}</h3>
                  <p className="text-gray-500 text-sm mb-6">{mode.desc}</p>
                </div>

                {/* FOOTER */}
                <div className="flex justify-between items-center pt-6 border-t">
                  <div>
                    <p className="text-xs text-gray-400 uppercase">Library</p>
                    <p className="text-sm font-bold">{mode.stats}</p>
                  </div>

                  <button
                    className={`w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center ${color.btn} group-hover:text-white transition`}
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* EXTRA SECTION */}
      <section className="bg-white p-8 rounded-[2rem] border shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-3 py-1 rounded-lg text-sm font-bold">
              <Star size={16} fill="currentColor" />
              NEW MODE
            </div>

            <h3 className="text-3xl font-bold">Presentation Practice</h3>

            <p className="text-gray-500">
              Upload your slides and practice your pitch with AI feedback.
            </p>

            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-blue-500 text-white font-semibold">
              Join Waitlist
            </button>
          </div>

          {/* GRAPH */}
          <div className="w-full md:w-1/3 aspect-square bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl flex items-center justify-center p-12">
            <div className="grid grid-cols-2 gap-4 w-full">
              {[40, 70, 90, 50].map((h, i) => (
                <div key={i} className="bg-orange-200 rounded-xl min-h-24 relative overflow-hidden">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: i * 0.2 + 0.5 }}
                    className="absolute bottom-0 w-full bg-orange-400"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}