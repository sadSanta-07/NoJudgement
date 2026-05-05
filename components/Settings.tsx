"use client";

import { User, Lock, Mic } from "lucide-react";
import { motion } from "framer-motion";

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
  return (
    <motion.div
      // variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl mx-auto space-y-8 px-4 sm:px-6 lg:px-0"
    >
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm overflow-hidden text-sm uppercase font-bold text-gray-400">
        <div className="p-5 sm:p-8 space-y-6 sm:space-y-8">

          {/* Account Section */}
          <motion.div variants={sectionVariants} className="space-y-3 sm:space-y-4">
            <label className="flex items-center text-gray-900 border-b border-gray-50 pb-3 sm:pb-4">
              <User size={18} className="mr-3 text-blue-500 shrink-0" /> Account
            </label>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 py-2">
              <span className="text-gray-500">Display Name</span>
              <span className="text-gray-900 normal-case font-medium sm:font-bold sm:uppercase">
                Alex Johnson
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 py-2">
              <span className="text-gray-500">Email</span>
              <span className="text-gray-900 normal-case font-medium sm:font-bold sm:uppercase break-all sm:break-normal">
                alex@example.com
              </span>
            </div>
          </motion.div>

          {/* Audio Settings Section */}
          <motion.div variants={sectionVariants} className="space-y-3 sm:space-y-4">
            <label className="flex items-center text-gray-900 border-b border-gray-50 pb-3 sm:pb-4">
              <Mic size={18} className="mr-3 text-blue-500 shrink-0" /> Audio Settings
            </label>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 py-2">
              <span className="text-gray-500">Default Input</span>
              <span className="text-gray-900 normal-case font-medium sm:font-bold sm:uppercase">
                MacBook Pro Mic
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 py-2">
              <span className="text-gray-500">Noise Suppression</span>
              <span className="text-blue-600">Enabled</span>
            </div>
          </motion.div>

          {/* Privacy Section */}
          <motion.div variants={sectionVariants} className="space-y-3 sm:space-y-4">
            <label className="flex items-center text-gray-900 border-b border-gray-50 pb-3 sm:pb-4">
              <Lock size={18} className="mr-3 text-blue-500 shrink-0" /> Privacy
            </label>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 py-2">
              <span className="text-gray-500">Profile Visibility</span>
              <span className="text-gray-900">Public</span>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}