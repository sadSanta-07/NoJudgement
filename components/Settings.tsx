"use client";

import { User, Lock, Mic, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

const sectionVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export default function Settings() {
  const { data: session } = useSession();

  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedMic, setSelectedMic] = useState("");
  const [noiseSuppression, setNoiseSuppression] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState("Public");

  useEffect(() => {
    async function getDevices() {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });

        const allDevices = await navigator.mediaDevices.enumerateDevices();

        const audioInputs = allDevices.filter(
          (device) => device.kind === "audioinput"
        );

        setDevices(audioInputs);

        if (audioInputs.length > 0) {
          setSelectedMic(audioInputs[0].deviceId);
        }
      } catch (error) {
        console.error("Microphone access denied:", error);
      }
    }

    getDevices();
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl mx-auto space-y-8 px-4 sm:px-6 lg:px-0"
    >
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden text-sm">
        <div className="p-5 sm:p-8 space-y-8">

          <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              ) : (
                <User className="text-gray-500" size={28} />
              )}
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">
                {session?.user?.name || "User"}
              </h2>

              <p className="text-sm text-gray-500 break-all">
                {session?.user?.email}
              </p>
            </div>

            {/* LOGOUT BUTTON */}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 border border-red-200 rounded-xl hover:bg-red-50 transition-colors"
            >
              <LogOut size={15} />
              Logout
            </button>
          </div>

          <motion.div
            variants={sectionVariants}
            className="space-y-4"
          >
            <label className="flex items-center text-xs uppercase font-bold text-gray-400 border-b border-gray-100 pb-4">
              <User
                size={16}
                className="mr-3 text-blue-500 shrink-0"
              />
              Account
            </label>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-2">
              <span className="text-xs uppercase font-bold text-gray-400">
                Display Name
              </span>

              <input
                type="text"
                value={session?.user?.name || ""}
                disabled
                className="w-full sm:w-64 px-3 py-2 text-sm text-gray-900 font-medium border border-gray-200 rounded-lg bg-gray-50 cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-2">
              <span className="text-xs uppercase font-bold text-gray-400">
                Email
              </span>

              <input
                type="email"
                value={session?.user?.email || ""}
                disabled
                className="w-full sm:w-64 px-3 py-2 text-sm text-gray-900 font-medium border border-gray-200 rounded-lg bg-gray-50 cursor-not-allowed"
              />
            </div>
          </motion.div>

          {/* AUDIO */}
          <motion.div
            variants={sectionVariants}
            className="space-y-4"
          >
            <label className="flex items-center text-xs uppercase font-bold text-gray-400 border-b border-gray-100 pb-4">
              <Mic
                size={16}
                className="mr-3 text-blue-500 shrink-0"
              />
              Audio Settings
            </label>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-2">
              <span className="text-xs uppercase font-bold text-gray-400">
                Default Input
              </span>

              <select
                value={selectedMic}
                onChange={(e) => setSelectedMic(e.target.value)}
                className="w-full sm:w-64 px-3 py-2 text-sm text-gray-900 font-medium border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white"
              >
                {devices.length > 0 ? (
                  devices.map((device) => (
                    <option
                      key={device.deviceId}
                      value={device.deviceId}
                    >
                      {device.label || "Unknown Microphone"}
                    </option>
                  ))
                ) : (
                  <option>No microphone detected</option>
                )}
              </select>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-2">
              <span className="text-xs uppercase font-bold text-gray-400">
                Noise Suppression
              </span>

              <button
                role="switch"
                aria-checked={noiseSuppression}
                onClick={() =>
                  setNoiseSuppression((v) => !v)
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  noiseSuppression
                    ? "bg-blue-500"
                    : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    noiseSuppression
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </motion.div>

          {/* PRIVACY */}
          <motion.div
            variants={sectionVariants}
            className="space-y-4"
          >
            <label className="flex items-center text-xs uppercase font-bold text-gray-400 border-b border-gray-100 pb-4">
              <Lock
                size={16}
                className="mr-3 text-blue-500 shrink-0"
              />
              Privacy
            </label>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-2">
              <span className="text-xs uppercase font-bold text-gray-400">
                Profile Visibility
              </span>

              <select
                value={profileVisibility}
                onChange={(e) =>
                  setProfileVisibility(e.target.value)
                }
                className="w-full sm:w-64 px-3 py-2 text-sm text-gray-900 font-medium border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white"
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