"use client";

import { User, Lock, Mic, LogOut, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function Settings() {
  const { data: session } = useSession();

  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedMic, setSelectedMic] = useState("");
  const [noiseSuppression, setNoiseSuppression] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState("Public");
  const [savedMessage, setSavedMessage] = useState(false);

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

  const handleSave = () => {
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* ── SETTINGS CONTAINER ── */}
      <div className="rounded-[22px] bg-[#fcfbf8] border border-[#e8e6e1] p-6 sm:p-10 shadow-[0_1px_2px_rgba(60,48,30,.07),0_4px_8px_rgba(60,48,30,.07)] space-y-8">
        
        {/* HEADER */}
        <div className="border-b border-[#e8e6e1] pb-5">
          <h1 className="font-display text-3xl font-normal text-[#1d1c1a] tracking-tight">
            Account & Audio Settings
          </h1>
          <p className="font-mono text-xs text-[#6a625a] mt-1">
            Manage your microphone hardware, privacy preferences, and identity
          </p>
        </div>

        {/* PROFILE HEADER BADGE */}
        <div className="flex items-center gap-4 p-4 rounded-[12px] bg-[#f5f3ee] border border-[#e8e6e1]">
          <div className="relative w-14 h-14 rounded-[8px] overflow-hidden bg-[#f1efea] border border-[#e8e6e1] flex items-center justify-center shrink-0">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt="Profile"
                fill
                className="object-cover"
              />
            ) : (
              <User className="text-[#1d1c1a]" size={24} />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-base text-[#1d1c1a] truncate">
              {session?.user?.name || "Anonymous Speaker"}
            </h2>
            <p className="font-mono text-xs text-[#6a625a] truncate mt-0.5">
              {session?.user?.email}
            </p>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] bg-[#f1efea] hover:bg-[#e8e6e1] border border-[#e8e6e1] font-mono text-xs text-[#1d1c1a] transition-all cursor-pointer"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>

        {/* ── ACCOUNT SECTION ── */}
        <div className="space-y-4 pt-2">
          <span className="font-mono text-xs uppercase tracking-wider text-[#6a625a] block">
            Account Information
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-[#6a625a]">
                Display Name
              </label>
              <input
                type="text"
                value={session?.user?.name || ""}
                disabled
                className="w-full px-3.5 py-2.5 rounded-[5px] bg-[#f5f3ee] border border-[#e8e6e1] text-sm text-[#1d1c1a] font-mono cursor-not-allowed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-[#6a625a]">
                Google Email
              </label>
              <input
                type="email"
                value={session?.user?.email || ""}
                disabled
                className="w-full px-3.5 py-2.5 rounded-[5px] bg-[#f5f3ee] border border-[#e8e6e1] text-sm text-[#1d1c1a] font-mono cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* ── AUDIO HARDWARE SECTION ── */}
        <div className="space-y-4 pt-4 border-t border-[#e8e6e1]">
          <div className="flex items-center gap-2">
            <Mic size={16} className="text-[#1d1c1a]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#1d1c1a] font-semibold">
              Audio Hardware & DSP
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-[8px] bg-[#f5f3ee] border border-[#e8e6e1]">
              <div>
                <span className="text-sm font-medium text-[#1d1c1a] block">Microphone Input</span>
                <span className="text-xs text-[#6a625a] font-mono">Select capture device for WebRTC calls</span>
              </div>

              <select
                value={selectedMic}
                onChange={(e) => setSelectedMic(e.target.value)}
                className="w-full sm:w-60 px-3 py-2 text-xs font-mono text-[#1d1c1a] border border-[#e8e6e1] rounded-[5px] bg-[#fcfbf8] focus:outline-none focus:ring-2 focus:ring-[#1d1c1a] cursor-pointer"
              >
                {devices.length > 0 ? (
                  devices.map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label || `Microphone ${device.deviceId.slice(0, 5)}...`}
                    </option>
                  ))
                ) : (
                  <option>System Default Microphone</option>
                )}
              </select>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-[8px] bg-[#f5f3ee] border border-[#e8e6e1]">
              <div>
                <span className="text-sm font-medium text-[#1d1c1a] block">Hardware Noise Suppression</span>
                <span className="text-xs text-[#6a625a] font-mono">Removes background ambient hiss and echo</span>
              </div>

              <button
                role="switch"
                aria-checked={noiseSuppression}
                onClick={() => setNoiseSuppression((v) => !v)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  noiseSuppression ? "bg-[#1d1c1a]" : "bg-[#e8e6e1]"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-[#fbfaf7] transition-transform ${
                    noiseSuppression ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* ── PRIVACY SECTION ── */}
        <div className="space-y-4 pt-4 border-t border-[#e8e6e1]">
          <div className="flex items-center gap-2">
            <Lock size={16} className="text-[#1d1c1a]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#1d1c1a] font-semibold">
              Privacy & Visibility
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-[8px] bg-[#f5f3ee] border border-[#e8e6e1]">
            <div>
              <span className="text-sm font-medium text-[#1d1c1a] block">Leaderboard Visibility</span>
              <span className="text-xs text-[#6a625a] font-mono">Show your name and score in global rankings</span>
            </div>

            <select
              value={profileVisibility}
              onChange={(e) => setProfileVisibility(e.target.value)}
              className="w-full sm:w-44 px-3 py-2 text-xs font-mono text-[#1d1c1a] border border-[#e8e6e1] rounded-[5px] bg-[#fcfbf8] focus:outline-none focus:ring-2 focus:ring-[#1d1c1a] cursor-pointer"
            >
              <option value="Public">Public (Visible)</option>
              <option value="Initials Only">Initials Only</option>
              <option value="Private">Private / Ghost</option>
            </select>
          </div>
        </div>

        {/* SAVE CONFIRMATION */}
        <div className="pt-4 border-t border-[#e8e6e1] flex items-center justify-between">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-[5px] bg-[#1d1c1a] text-[#fbfaf7] text-xs font-mono font-medium shadow-sm hover:bg-[#2c2a26] transition-all cursor-pointer active:translate-y-[1px]"
          >
            Save Preferences
          </button>

          {savedMessage && (
            <span className="font-mono text-xs text-[#1e5d36] flex items-center gap-1 font-semibold">
              <Check size={14} /> Preferences updated
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
