"use client";

import {
  Briefcase,
  Coffee,
  Swords,
  ArrowRight,
  Clock,
  Star,
  Lock,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  useEffect,
  useId,
  useState,
} from "react";

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

const presentationMode = {
  id: "presentation",
  title: "Presentation Practice",
  desc: "Upload your slides and practice your pitch with AI feedback.",
  icon: Star,
  color: "orange",
  stats: "AI Feedback",
  difficulty: "Medium",
};

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
  const [active, setActive] = useState<any>(null);

  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";

      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active]);

  return (
    <div className="space-y-8 p-6 md:p-10 relative overflow-x-hidden">

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

      {/* MODAL */}
      <AnimatePresence>

        {active && (
          <>

            {/* FULLSCREEN OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActive(null)}
              className="
                fixed
                inset-0
                z-[999]
                w-screen
                h-screen
                bg-black/50
                backdrop-blur-md
              "
            />

            {/* MODAL WRAPPER */}
            <div
              className="
                fixed
                inset-0
                z-[1000]
                flex
                items-center
                justify-center
                p-4
                overflow-y-auto
              "
            >

              {/* MODAL */}
              <motion.div
                layoutId={`card-${active.id}-${id}`}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 25,
                }}
                className="
                  relative
                  w-full
                  max-w-2xl
                  bg-white
                  rounded-[2rem]
                  shadow-2xl
                  border
                  overflow-hidden
                "
              >

                <div className="p-8">

                  {/* TOP */}
                  <div className="flex items-start justify-between">

                    <div>

                      {/* ICON */}
                      <div
                        className={`
                          w-16
                          h-16
                          rounded-2xl
                          flex
                          items-center
                          justify-center
                          mb-6
                          ${
                            colorMap[
                              active.color as keyof typeof colorMap
                            ].bg
                          }
                          ${
                            colorMap[
                              active.color as keyof typeof colorMap
                            ].text
                          }
                        `}
                      >

                        {active.id === "presentation" ? (
                          <Star size={30} strokeWidth={2.5} />
                        ) : (
                          <Lock size={30} strokeWidth={2.5} />
                        )}

                      </div>

                      {/* TITLE */}
                      <motion.h2
                        layoutId={`title-${active.id}-${id}`}
                        className="text-4xl font-bold text-gray-900"
                      >
                        {active.title}
                      </motion.h2>

                      {/* DESC */}
                      <motion.p
                        layoutId={`desc-${active.id}-${id}`}
                        className="text-gray-500 mt-3 max-w-lg"
                      >
                        {active.desc}
                      </motion.p>

                    </div>

                    {/* CLOSE */}
                    <button
                      onClick={() => setActive(null)}
                      className="
                        w-10
                        h-10
                        rounded-full
                        bg-gray-100
                        hover:bg-gray-200
                        transition
                        flex
                        items-center
                        justify-center
                        font-bold
                      "
                    >
                      ✕
                    </button>

                  </div>

                  {/* CONTENT */}
                  <div className="mt-10 space-y-6">

                    {/* STATS */}
                    <div className="grid grid-cols-2 gap-4">

                      <div className="bg-gray-50 rounded-2xl p-5">

                        <p className="text-sm text-gray-400 mb-1">
                          Difficulty
                        </p>

                        <p className="font-bold text-lg">
                          {active.difficulty}
                        </p>

                      </div>

                      <div className="bg-gray-50 rounded-2xl p-5">

                        <p className="text-sm text-gray-400 mb-1">
                          Question Bank
                        </p>

                        <p className="font-bold text-lg">
                          {active.stats}
                        </p>

                      </div>

                    </div>

                    {/* FEATURES */}
                    <div className="bg-gray-50 rounded-2xl p-6">

                      <h4 className="font-bold text-lg mb-4">
                        What you'll practice
                      </h4>

                      <ul className="space-y-3 text-gray-600">

                        <li className="flex items-center gap-2">
                          ✨ Real-time speaking analysis
                        </li>

                        <li className="flex items-center gap-2">
                          🎤 Pronunciation improvement
                        </li>

                        <li className="flex items-center gap-2">
                          📈 Fluency scoring
                        </li>

                        <li className="flex items-center gap-2">
                          🧠 AI-generated responses
                        </li>

                      </ul>

                    </div>

                    {/* CTA */}
                    <button
                      className="
                        w-full
                        py-4
                        rounded-2xl
                        bg-black
                        text-white
                        font-bold
                        text-lg
                        hover:scale-[1.01]
                        transition
                      "
                    >
                      Coming Soon
                    </button>

                  </div>

                </div>

              </motion.div>

            </div>

          </>
        )}

      </AnimatePresence>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {modes.map((mode, i) => {
          const color =
            colorMap[mode.color as keyof typeof colorMap];

          return (

            <motion.div
              key={mode.id}
              layoutId={`card-${mode.id}-${id}`}
              onClick={() => setActive(mode)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >

              <div className="bg-white p-8 rounded-[2rem] border shadow-sm flex flex-col h-full relative overflow-hidden transition-all group-hover:shadow-xl">

                <div
                  className={`
                    absolute
                    top-0
                    right-0
                    w-24
                    h-24
                    ${color.accent}
                    ${color.hover}
                    rounded-bl-[4rem]
                  `}
                />

                <div
                  className={`
                    w-14
                    h-14
                    ${color.bg}
                    ${color.text}
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    mb-8
                  `}
                >
                  <mode.icon size={28} />
                </div>

                <div className="flex-1">

                  <div className="flex gap-2 mb-2">

                    <span
                      className={`
                        px-2
                        py-0.5
                        text-[10px]
                        font-bold
                        rounded
                        ${
                          mode.difficulty === "Easy"
                            ? "bg-green-50 text-green-600"
                            : mode.difficulty === "Medium"
                            ? "bg-blue-50 text-blue-600"
                            : mode.difficulty === "Hard"
                            ? "bg-orange-50 text-orange-600"
                            : "bg-red-50 text-red-600"
                        }
                      `}
                    >
                      {mode.difficulty}
                    </span>

                    <span className="text-[10px] font-bold text-gray-400 flex items-center">
                      <Clock size={10} className="mr-1" />
                      15 MIN
                    </span>

                  </div>

                  <motion.h3
                    layoutId={`title-${mode.id}-${id}`}
                    className="text-2xl font-bold mb-3"
                  >
                    {mode.title}
                  </motion.h3>

                  <motion.p
                    layoutId={`desc-${mode.id}-${id}`}
                    className="text-gray-500 text-sm mb-6"
                  >
                    {mode.desc}
                  </motion.p>

                </div>

                <div className="flex justify-between items-center pt-6 border-t">

                  <div>

                    <p className="text-xs text-gray-400 uppercase">
                      Library
                    </p>

                    <p className="text-sm font-bold">
                      {mode.stats}
                    </p>

                  </div>

                  <button
                    className={`
                      w-10
                      h-10
                      bg-gray-50
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      ${color.btn}
                      group-hover:text-white
                      transition
                    `}
                  >
                    <ArrowRight size={20} />
                  </button>

                </div>

              </div>

            </motion.div>

          );
        })}

      </div>

      {/* PRESENTATION SECTION */}
      <motion.section
        layoutId={`card-presentation-${id}`}
        onClick={() => setActive(presentationMode)}
        whileHover={{ y: -5 }}
        className="
          bg-white
          p-8
          rounded-[2rem]
          border
          shadow-sm
          cursor-pointer
          overflow-hidden
          relative
          group
          transition-all
          hover:shadow-xl
        "
      >

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          <div className="space-y-4 flex-1">

            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-3 py-1 rounded-lg text-sm font-bold">

              <Star size={16} fill="currentColor" />
              NEW MODE

            </div>

            <motion.h3
              layoutId={`title-presentation-${id}`}
              className="text-3xl font-bold"
            >
              Presentation Practice
            </motion.h3>

            <motion.p
              layoutId={`desc-presentation-${id}`}
              className="text-gray-500"
            >
              Upload your slides and practice your pitch with AI feedback.
            </motion.p>

            <button
              className="
                px-6
                py-3
                rounded-xl
                bg-gradient-to-r
                from-orange-500
                to-blue-500
                text-white
                font-semibold
                flex
                items-center
                gap-2
                group-hover:scale-105
                transition
              "
            >
              Add Wishlist
              <ArrowRight size={18} />
            </button>

          </div>

          <div className="w-full md:w-1/3 aspect-square bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl flex items-center justify-center p-12">

            <div className="grid grid-cols-2 gap-4 w-full">

              {[40, 70, 90, 50].map((h, i) => (

                <div
                  key={i}
                  className="bg-orange-200 rounded-xl min-h-24 relative overflow-hidden"
                >

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

      </motion.section>

    </div>
  );
}