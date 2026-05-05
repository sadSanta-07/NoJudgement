"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Shield, Check } from "lucide-react";
import { useSession } from "next-auth/react";
import MatchButton from "@/components/MatchButton";

export default function Matchmaking() {
  const { data: session, status } = useSession();

const userId = (session?.user as any)?.id || session?.user?.email;

  const [level, setLevel] = useState("Beginner");
  const [topic, setTopic] = useState("Casual");

  const levels = ["Beginner", "Intermediate", "Advanced"];
  const topics = ["Casual", "Business", "Travel", "Interview", "Debate"];

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="flex items-center justify-center h-screen">
        Not authenticated
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-10 rounded-3xl border border-gray-100 shadow-xl"
      >

        {/* HEADER */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-6">
            <Users size={40} />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Find a Partner
          </h2>

          <p className="text-gray-400">
            Match with someone at your level.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* LEVEL */}
          <div className="space-y-6">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">
              Speaking Level
            </label>

            <div className="grid gap-3">
              {levels.map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                    level === l
                      ? "border-blue-500 bg-blue-50 text-blue-600"
                      : "border-gray-50 bg-gray-50 text-gray-500 hover:border-gray-200"
                  }`}
                >
                  <span className="font-bold">{l}</span>
                  {level === l && <Check size={20} />}
                </button>
              ))}
            </div>
          </div>

          {/* TOPIC */}
          <div className="space-y-6">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">
              Topic
            </label>

            <div className="grid gap-3">
              {topics.map((t) => (
                <button
                  key={t}
                  onClick={() => setTopic(t)}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                    topic === t
                      ? "border-orange-500 bg-orange-50 text-orange-600"
                      : "border-gray-50 bg-gray-50 text-gray-500 hover:border-gray-200"
                  }`}
                >
                  <span className="font-bold">{t}</span>
                  {topic === t && <Check size={20} />}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* MATCH BUTTON */}
        <div className="mt-12 pt-8 border-t border-gray-50 flex justify-center">
          <MatchButton
            level={level.toLowerCase()}   // ✅ normalized
            topic={topic.toLowerCase()}   // ✅ normalized
            userId={userId}
            label="Search for partner"
          />
        </div>

      </motion.div>

      {/* SAFETY CARD */}
      <div className="bg-blue-600 rounded-2xl p-6 text-white flex items-center justify-between shadow-lg shadow-blue-200">
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 p-2 rounded-xl">
            <Shield size={24} />
          </div>
          <div>
            <p className="font-bold">Community Safety First</p>
            <p className="text-sm text-white/80 leading-tight">
              AI moderation keeps sessions respectful.
            </p>
          </div>
        </div>

        <button className="text-sm font-bold underline underline-offset-4">
          Learn More
        </button>
      </div>

    </div>
  );
}