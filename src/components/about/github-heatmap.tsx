"use client";

import { useState } from "react";
import type { GithubStats } from "@/lib/api/github";

export function GithubHeatmap({ stats }: { stats: GithubStats }) {
  const [activeTooltip, setActiveTooltip] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  // We only show the last 52 weeks (or fewer on mobile).
  // Next.js tailwind breakpoints: md is 768px.
  // We can render all weeks, and just use `overflow-x-auto` or hide the first N weeks.

  const handleInteraction = (
    e: React.MouseEvent | React.TouchEvent,
    date: string,
    count: number,
  ) => {
    // Determine position for tooltip relative to viewport or nearest positioned ancestor
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setActiveTooltip({
      date,
      count,
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
  };

  const clearTooltip = () => setActiveTooltip(null);

  // Determine intensity color based on count (GitHub style)
  const getIntensityClass = (count: number) => {
    if (count === 0) return "bg-polar/10 border-polar/20"; // Ice (base state)
    if (count <= 2) return "bg-flame/30 border-flame/40"; // Spark
    if (count <= 5) return "bg-flame/60 border-flame/70"; // Fire
    if (count <= 10) return "bg-flame/90 border-flame"; // Plasma
    return "bg-flame border-flame shadow-[0_0_10px_rgba(255,107,0,0.6)]"; // Burst
  };

  return (
    <div className="mt-8 relative w-full overflow-hidden rounded-lg border border-line/70 bg-abyss p-6">
      <div className="flex items-center justify-between border-b border-line/40 pb-4 mb-4">
        <h3 className="font-mono text-[11px] tracking-[0.2em] text-faint uppercase">
          GitHub Heatmap (Last 12 Months)
        </h3>
        <span className="font-mono text-[10px] text-polar">
          {stats.totalContributions} contributions
        </span>
      </div>

      <button
        type="button"
        className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-line/50 scrollbar-track-transparent cursor-default"
        onMouseLeave={clearTooltip}
      >
        <div className="flex gap-1 min-w-max">
          {stats.weeks.map((week, wIndex) => {
            return (
              <div
                key={week.contributionDays[0]?.date || wIndex}
                className="flex flex-col gap-1"
              >
                {week.contributionDays.map((day) => {
                  return (
                    <button
                      type="button"
                      key={day.date}
                      className={`h-3 w-3 rounded-sm border ${getIntensityClass(
                        day.contributionCount,
                      )} transition-colors hover:border-polar cursor-pointer`}
                      onMouseEnter={(e) =>
                        handleInteraction(e, day.date, day.contributionCount)
                      }
                      onTouchStart={(e) =>
                        handleInteraction(e, day.date, day.contributionCount)
                      }
                      onMouseLeave={clearTooltip}
                      onTouchEnd={clearTooltip}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </button>

      {activeTooltip && (
        <div
          className="fixed z-50 -translate-x-1/2 -translate-y-full rounded border border-line/70 bg-abyss/95 px-2 py-1 font-mono text-[10px] text-polar shadow-lg backdrop-blur-sm pointer-events-none"
          style={{ top: activeTooltip.y, left: activeTooltip.x }}
        >
          {activeTooltip.count} contributions on {activeTooltip.date}
        </div>
      )}
    </div>
  );
}
