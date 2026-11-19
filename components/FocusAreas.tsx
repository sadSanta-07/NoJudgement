"use client";

import { Target } from "lucide-react";

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
      return Math.min(Math.round((avgFillerWords / 10) * 100), 100);
    }
    return 50;
  };

  const accentColors = [
    "bg-[#d9b3a9]", // peach
    "bg-[#c9bcd6]", // lavender
    "bg-[#99c1bb]", // sage teal
    "bg-[#1d1c1a]", // dark ink
  ];

  return (
    <div className="rounded-[22px] bg-[#fcfbf8] border border-[#e8e6e1] p-6 sm:p-7 shadow-[0_1px_2px_rgba(60,48,30,.07),0_4px_8px_rgba(60,48,30,.07)] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[6px] bg-[#f1efea] border border-[#e8e6e1] flex items-center justify-center text-[#1d1c1a]">
              <Target size={16} />
            </div>
            <h3 className="font-display text-2xl font-normal text-[#1d1c1a]">
              Targeted Focus Areas
            </h3>
          </div>
          <span className="font-mono text-xs text-[#6a625a]">
            {weakAreas.length} Areas
          </span>
        </div>

        {weakAreas.length === 0 ? (
          <div className="rounded-[10px] bg-[#f5f3ee] border border-[#e8e6e1] p-6 text-center">
            <p className="font-display text-lg text-[#1d1c1a]">All metrics looking balanced! 🎉</p>
            <p className="text-xs text-[#6a625a] mt-1 font-mono">
              Continue your daily practice sessions to discover deeper nuances.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {weakAreas.map((area, i) => {
              const color = accentColors[i % accentColors.length];
              const percentage = calculatePercentage(area);

              return (
                <div key={area} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-[#1d1c1a]">{area}</span>
                    <span className="font-mono text-[#6a625a] font-semibold">{percentage}%</span>
                  </div>
                  {/* Tactile track */}
                  <div className="h-2 w-full bg-[#f1efea] rounded-[4px] border border-[#e8e6e1] overflow-hidden">
                    <div
                      className={`h-full ${color} rounded-[3px] transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-[#e8e6e1] font-mono text-[11px] text-[#a39a8e]">
        Percentages are aggregated across your latest speaking sessions.
      </div>
    </div>
  );
}
