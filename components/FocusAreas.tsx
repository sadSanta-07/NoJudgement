"use client";

import { BookOpen } from "lucide-react";

interface FocusAreasProps {
  weakAreas: string[];
  avgFluency: number;
  avgClarity: number;
  avgEnglishScore: number;
  avgFillerWords: number;
}

export default function FocusAreas({
  weakAreas,
  avgFluency,
  avgClarity,
  avgEnglishScore,
  avgFillerWords,
}: FocusAreasProps) {

  const calculatePercentage = (area: string): number => {
    if (area === "Fluency") {
      return Math.round((avgFluency / 10) * 100);
    } else if (area === "Clarity") {
      return Math.round((avgClarity / 10) * 100);
    } else if (area === "English consistency") {
      return avgEnglishScore;
    } else if (area === "Filler words") {
      return Math.min((avgFillerWords / 10) * 100, 100);
    }
    return 50;
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border">
      <h3 className="text-lg font-semibold mb-6 flex items-center">
        <BookOpen className="mr-2 text-blue-500" />
        Focus Areas
      </h3>

      {weakAreas.length === 0 ? (
        <p className="text-sm text-gray-400">
          No major weaknesses detected 🎉
        </p>
      ) : (
        <>
          {weakAreas.map((area, i) => {
            const colors = ["bg-blue-500", "bg-orange-500", "bg-green-500"];
            const color = colors[i % colors.length];
            const percentage = calculatePercentage(area);

            return (
              <div key={i} className="mb-5">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-gray-800">{area}</p>
                  <p className="text-sm font-medium text-gray-400">
                    {percentage}%
                  </p>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className={`h-full ${color} rounded-full`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
