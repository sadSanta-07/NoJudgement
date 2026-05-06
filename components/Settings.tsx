"use client";

import { User, Lock, Mic } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.1 },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function Settings() {
  const [displayName, setDisplayName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alex@example.com");
  const [defaultInput, setDefaultInput] = useState("MacBook Pro Mic");
  const [noiseSuppression, setNoiseSuppression] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState("Public");

  return (
    <motion.div
      //variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl mx-auto space-y-8 px-4 sm:px-6 lg:px-0"
    >
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm overflow-hidden text-sm">
        <div className="p-5 sm:p-8 space-y-6 sm:space-y-8">

          {/* Account Section */}
          <motion.div variants={sectionVariants} className="space-y-3 sm:space-y-4">
            <label className="flex items-center text-xs uppercase font-bold text-gray-400 border-b border-gray-100 pb-3 sm:pb-4">
              <User size={16} className="mr-3 text-blue-500 shrink-0" /> Account
            </label>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 py-2">
              <span className="text-xs uppercase font-bold text-gray-400 shrink-0">
                Display Name
              </span>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full sm:w-64 px-3 py-1.5 text-sm text-gray-900 font-medium border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                placeholder="Display Name"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 py-2">
              <span className="text-xs uppercase font-bold text-gray-400 shrink-0">
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-64 px-3 py-1.5 text-sm text-gray-900 font-medium border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition break-all sm:break-normal"
                placeholder="Email"
              />
            </div>
          </motion.div>

          {/* Audio Settings Section */}
          <motion.div variants={sectionVariants} className="space-y-3 sm:space-y-4">
            <label className="flex items-center text-xs uppercase font-bold text-gray-400 border-b border-gray-100 pb-3 sm:pb-4">
              <Mic size={16} className="mr-3 text-blue-500 shrink-0" /> Audio Settings
            </label>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 py-2">
              <span className="text-xs uppercase font-bold text-gray-400 shrink-0">
                Default Input
              </span>
              <select
                value={defaultInput}
                onChange={(e) => setDefaultInput(e.target.value)}
                className="w-full sm:w-64 px-3 py-1.5 text-sm text-gray-900 font-medium border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition bg-white"
              >
                <option>MacBook Pro Mic</option>
                <option>External USB Mic</option>
                <option>AirPods</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 py-2">
              <span className="text-xs uppercase font-bold text-gray-400 shrink-0">
                Noise Suppression
              </span>
              <button
                role="switch"
                aria-checked={noiseSuppression}
                onClick={() => setNoiseSuppression((v) => !v)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                  noiseSuppression ? "bg-blue-500" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                    noiseSuppression ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </motion.div>

          {/* Privacy Section */}
          <motion.div variants={sectionVariants} className="space-y-3 sm:space-y-4">
            <label className="flex items-center text-xs uppercase font-bold text-gray-400 border-b border-gray-100 pb-3 sm:pb-4">
              <Lock size={16} className="mr-3 text-blue-500 shrink-0" /> Privacy
            </label>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 py-2">
              <span className="text-xs uppercase font-bold text-gray-400 shrink-0">
                Profile Visibility
              </span>
              <select
                value={profileVisibility}
                onChange={(e) => setProfileVisibility(e.target.value)}
                className="w-full sm:w-64 px-3 py-1.5 text-sm text-gray-900 font-medium border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition bg-white"
              >
                <option>Public</option>
                <option>Friends only</option>
                <option>Private</option>
              </select>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}