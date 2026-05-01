"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Analysis {
  fluency: number;
  clarity: number;
  helpfulness: number;
  fillerWords: number;
  feedback: string;
  strongPoints: string;
  improvePoints: string;
}

export default function PostCallPage() {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [duration, setDuration] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const data = sessionStorage.getItem("callAnalysis");
    const dur = sessionStorage.getItem("callDuration");
    if (data) setAnalysis(JSON.parse(data));
    if (dur) setDuration(Number(dur));
  }, []);

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  if (!analysis) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading analysis...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-8 gap-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold">Session Complete</h1>
      <p className="text-gray-500">Duration: {formatTime(duration)}</p>

      {/* Score cards */}
      <div className="grid grid-cols-3 gap-4 w-full">
        {[
          { label: "Fluency", value: analysis.fluency },
          { label: "Clarity", value: analysis.clarity },
          { label: "Helpfulness", value: analysis.helpfulness },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center bg-gray-50 rounded-xl p-4">
            <span className="text-3xl font-bold text-blue-600">{item.value}</span>
            <span className="text-xs text-gray-500 mt-1">{item.label}</span>
            <span className="text-xs text-gray-400">/10</span>
          </div>
        ))}
      </div>

      {/* Filler words */}
      <div className="w-full bg-orange-50 rounded-xl p-4">
        <p className="text-sm text-orange-700">
          Filler words used: <strong>{analysis.fillerWords}</strong>
          {analysis.fillerWords > 5 ? " — try to reduce these!" : " — good job!"}
        </p>
      </div>

      {/* Feedback */}
      <div className="w-full bg-blue-50 rounded-xl p-4 gap-2 flex flex-col">
        <p className="text-sm font-semibold text-blue-800">AI Feedback</p>
        <p className="text-sm text-gray-700">{analysis.feedback}</p>
      </div>

      <div className="w-full grid grid-cols-2 gap-3">
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-xs font-semibold text-green-700 mb-1">Strong point</p>
          <p className="text-sm text-gray-700">{analysis.strongPoints}</p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4">
          <p className="text-xs font-semibold text-yellow-700 mb-1">Improve</p>
          <p className="text-sm text-gray-700">{analysis.improvePoints}</p>
        </div>
      </div>

      <button
        onClick={() => router.push("/find-partner")}
        className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold"
      >
        Practice Again
      </button>
    </div>
  );
}