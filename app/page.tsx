"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoginButton from "@/components/LoginButton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mic, Globe, Shield, Star } from "lucide-react";
import AICard from "@/components/AICard";


const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <div className="min-h-screen relative overflow-hidden">

      {/*  GRADIENT BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[var(--color-neutral)]" />
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#FFA133]/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#A5BBFC]/30 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/30" />
      </div>

      <Navbar />

      {/* HERO */}
      <motion.main
        initial="hidden"
        animate="show"
        variants={stagger}
        className="relative flex flex-col items-center text-center px-6 pt-32 pb-20"
      >


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 bg-[#A5BBFC]/20 text-[var(--color-tertiary)] px-4 py-2 rounded-full text-sm font-semibold mb-8 mt-16"
        >
          <Star size={16} />
          <span>Now available in Beta</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-[var(--color-tertiary)] mb-6">
          Speak English With Confidence.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }} className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl mb-12">
          Practice in real-time with people and AI. No judgment. Just growth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4"
        >
          <div className="flex gap-4">
            <LoginButton label="Start Practicing" />
            <LoginButton label="Login with Google" />
          </div>
        </motion.div>
        <AICard />
      </motion.main>

      {/* FEATURES */}
      <section className="px-6 md:px-16 py-24 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--color-tertiary)] mb-16">
          Master conversations everywhere
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: Globe,
              title: "Global Matchmaking",
              desc: "Find partners based on your level and interests.",
            },
            {
              icon: Mic,
              title: "AI-Powered Coaching",
              desc: "Real-time grammar & pronunciation feedback.",
            },
            {
              icon: Shield,
              title: "Safe Environment",
              desc: "AI moderation ensures respectful conversations.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="group bg-[var(--color-neutral)] p-8 rounded-2xl border border-[var(--color-border)] hover:shadow-xl transition"

            >
              <f.icon className="text-[#FFA133] mb-4 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="font-semibold text-[var(--color-tertiary)] mb-2">
                {f.title}
              </h3>
              <p className="text-[var(--color-text-muted)] text-sm">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* feature */}
      <section className="px-6 md:px-16 py-32 bg-[var(--color-neutral)]">
        <div className="max-w-6xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-tertiary)] mb-6">
              Everything you need to speak fluently.
            </h2>
            <p className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">
              Master English through realistic scenarios, instant feedback, and engaging challenges.
            </p>
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-3 gap-8">

            {/* BIG LEFT */}
            <motion.div
              whileHover={{ scale: 1.02, y: -6 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="group md:col-span-2 bg-white rounded-3xl p-10 border border-[var(--color-border)] flex justify-between items-center relative overflow-hidden transition-all duration-300 hover:shadow-xl"
            >

              {/* glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-orange-100/30 to-blue-100/30 blur-2xl" />

              <div className="max-w-sm relative z-10">
                <div className="w-12 h-12 bg-[#FFA133]/20 rounded-xl flex items-center justify-center mb-6 transition group-hover:scale-110">
                  <Mic className="text-[#FFA133]" size={24} />
                </div>

                <h3 className="text-2xl font-semibold text-[var(--color-tertiary)] mb-3">
                  Real-time Voice Chat
                </h3>

                <p className="text-base text-[var(--color-text-muted)] mb-6">
                  Connect instantly with global peers or our advanced AI for live, judgment-free conversation practice.
                </p>

                <div className="flex -space-x-2">
                  <Image
                    src="https://i.pravatar.cc/32?img=1"
                    alt="User avatar"
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-full border-2 border-white transition hover:scale-110" />
                  <Image
                    src="https://i.pravatar.cc/32?img=2"
                    alt="User avatar"
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-full border-2 border-white transition hover:scale-110" />
                  <Image
                    src="https://i.pravatar.cc/32?img=3"
                    alt="User avatar"
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-full border-2 border-white transition hover:scale-110" />
                  <span className="ml-3 text-sm text-gray-400">+12k</span>
                </div>
              </div>

              <div className="w-48 h-48 bg-[#FFA133]/10 rounded-2xl hidden md:block group-hover:scale-105 transition" />

            </motion.div>

            {/* TOP RIGHT */}
            <motion.div
              whileHover={{ scale: 1.02, y: -6 }}
              className="group bg-white rounded-3xl p-10 border border-[var(--color-border)] relative overflow-hidden transition-all duration-300 hover:shadow-xl"
            >

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-blue-100/30 to-purple-100/30 blur-2xl" />

              <div className="relative z-10">
                <div className="w-12 h-12 bg-[#A5BBFC]/20 rounded-xl flex items-center justify-center mb-6 transition group-hover:scale-110">
                  <Globe className="text-[#A5BBFC]" size={24} />
                </div>

                <h3 className="text-2xl font-semibold text-[var(--color-tertiary)] mb-3">
                  3 Practice Modes
                </h3>

                <p className="text-base text-[var(--color-text-muted)] mb-6">
                  Tailored scenarios for every goal.
                </p>

                <div className="space-y-3">
                  {["Interview", "Casual", "Debate"].map((m) => (
                    <div
                      key={m}
                      className="bg-[var(--color-neutral)] px-5 py-3 rounded-lg text-base transition hover:scale-[1.03]"
                    >
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* BOTTOM LEFT */}
            <motion.div
              whileHover={{ scale: 1.02, y: -6 }}
              className="group bg-white rounded-3xl p-10 border border-[var(--color-border)] relative overflow-hidden transition-all duration-300 hover:shadow-xl"
            >

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-purple-100/30 to-orange-100/30 blur-2xl" />

              <div className="relative z-10">
                <h3 className="text-2xl font-semibold text-[var(--color-tertiary)] mb-3">
                  Smart Matchmaking
                </h3>

                <p className="text-base text-[var(--color-text-muted)] mb-6">
                  Pair up with partners at your exact skill level.
                </p>

                <div className="bg-[var(--color-neutral)] p-5 rounded-xl flex justify-between text-base transition hover:scale-[1.02]">
                  <span>YOU: B2</span>
                  <span>⇄</span>
                  <span>PARTNER: B2</span>
                </div>
              </div>
            </motion.div>

            {/* BOTTOM RIGHT */}
            <motion.div
              whileHover={{ scale: 1.02, y: -6 }}
              className="group md:col-span-2 bg-white rounded-3xl p-10 border border-[var(--color-border)] relative overflow-hidden transition-all duration-300 hover:shadow-xl"
            >

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-orange-100/30 to-green-100/30 blur-2xl" />

              <div className="relative z-10">
                <h3 className="text-2xl font-semibold text-[var(--color-tertiary)] mb-3">
                  AI-Powered Analysis
                </h3>

                <p className="text-base text-[var(--color-text-muted)] mb-6">
                  Get detailed, non-intrusive feedback on pronunciation, vocabulary, and grammar.
                </p>

                <div className="mb-4 flex justify-between text-base">
                  <span>Fluency</span>
                  <span className="text-[#FFA133] font-semibold">85%</span>
                </div>

                <div className="w-full h-2.5 bg-gray-200 rounded-full mb-6 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    transition={{ duration: 1 }}
                    className="h-2.5 bg-[#FFA133] rounded-full"
                  />
                </div>

                <div className="text-base">
                  <p className="text-red-400 line-through">
                    I have went to the store.
                  </p>
                  <p className="text-green-600">
                    ✓ I went to the store. (Past simple)
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-16 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE */}
          <div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-[var(--color-tertiary)] mb-6"
            >
              Stay motivated. Build habits.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-[var(--color-text-muted)] mb-10 max-w-md"
            >
              Earn points for every minute you practice. Climb the leaderboard and unlock premium avatars as you progress.
            </motion.p>

            {/* STATS */}
            <div className="flex items-center gap-10 mb-10">

              {/* Streak */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-[#FFA133]/20 flex items-center justify-center text-lg">
                  🔥
                </div>
                <div>
                  <p className="text-lg font-semibold text-[var(--color-tertiary)]">
                    15 Days
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    CURRENT STREAK
                  </p>
                </div>
              </motion.div>

              {/* Points */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-[#A5BBFC]/20 flex items-center justify-center text-lg">
                  ⭐
                </div>
                <div>
                  <p className="text-lg font-semibold text-[var(--color-tertiary)]">
                    1,250
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    TOTAL POINTS
                  </p>
                </div>
              </motion.div>

            </div>

            {/* BUTTON */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="px-6 py-3 rounded-full border border-[var(--color-border)] text-[var(--color-tertiary)] text-lg transition-all duration-300 hover:shadow-md hover:bg-[var(--color-neutral)]"
            >
              View Leaderboard
            </motion.button>
          </div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="group bg-[var(--color-neutral)] p-8 rounded-3xl shadow-md border border-[var(--color-border)] relative overflow-hidden"
          >

            {/* glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-orange-100/30 to-blue-100/30 blur-2xl" />

            <p className="relative z-10 text-center text-sm tracking-wide text-[var(--color-text-muted)] mb-6">
              GLOBAL TOP 3
            </p>

            <div className="relative z-10 space-y-4">

              {/* 1st */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between bg-[#FFA133]/10 border border-[#FFA133]/30 px-5 py-4 rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <span className="font-semibold">1</span>
                  <img src="https://i.pravatar.cc/40?img=5"
                    alt="User avatar"
                    className="w-10 h-10 rounded-full" />
                  <span className="font-medium">Sarah J.</span>
                </div>
                <span className="font-medium text-[var(--color-tertiary)]">
                  4,520 pts
                </span>
              </motion.div>

              {/* 2nd */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between bg-white px-5 py-4 rounded-xl border border-[var(--color-border)]"
              >
                <div className="flex items-center gap-4">
                  <span>2</span>
                  <img src="https://i.pravatar.cc/40?img=8"
                    alt="User avatar"
                    className="w-10 h-10 rounded-full" />
                  <span>David M.</span>
                </div>
                <span>3,890 pts</span>
              </motion.div>

              {/* 3rd */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between bg-[#FFA133]/5 px-5 py-4 rounded-xl border border-[#FFA133]/20"
              >
                <div className="flex items-center gap-4">
                  <span>3</span>
                  <img src="https://i.pravatar.cc/40?img=11"
                    alt="User avatar"
                    className="w-10 h-10 rounded-full" />
                  <span>You</span>
                </div>
                <span className="text-[#FFA133] font-medium">
                  1,250 pts
                </span>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </section>
      <Footer />
    </div >
  );
}