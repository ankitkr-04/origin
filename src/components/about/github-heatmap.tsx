"use client";

import { useEffect, useMemo, useRef } from "react";
import type { GithubStats } from "@/lib/api/github";

export function GithubHeatmap({ stats }: { stats: GithubStats }) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipContentRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const isScrollingRef = useRef(false);
  const scrollEndTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current);
    };
  }, []);

  const handleScroll = () => {
    isScrollingRef.current = true;
    if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current);
    scrollEndTimer.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 100);
  };

  const handleOver = (
    e: React.MouseEvent | React.TouchEvent | React.FocusEvent,
  ) => {
    // Ignore synthetic hover events fired by hit-testing during scroll
    if (isScrollingRef.current) return;

    const target = e.target as HTMLElement;
    const date = target.getAttribute("data-date");
    const count = target.getAttribute("data-count");

    if (date && count && tooltipRef.current && tooltipContentRef.current) {
      let x = 0;
      let y = 0;

      if ("clientX" in e) {
        x = e.clientX;
        y = e.clientY - 15;
      } else if ("touches" in e && e.touches.length > 0) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY - 15;
      } else {
        const rect = target.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top - 5;
      }

      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        if (tooltipContentRef.current && tooltipRef.current) {
          tooltipContentRef.current.textContent = `${count} contributions on ${date}`;
          // Use hardware-accelerated transform instead of top/left
          tooltipRef.current.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 100%))`;
          tooltipRef.current.style.opacity = "1";
        }
      });
    }
  };

  const handleOut = (
    e: React.MouseEvent | React.TouchEvent | React.FocusEvent,
  ) => {
    const target = e.target as HTMLElement;
    if (target.hasAttribute("data-date") && tooltipRef.current) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      tooltipRef.current.style.opacity = "0";
    }
  };

  const clearTooltip = () => {
    if (tooltipRef.current) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      tooltipRef.current.style.opacity = "0";
    }
  };

  const getIntensityClass = (count: number) => {
    if (count === 0) return "bg-white/5 border-line/20"; // Base
    if (count <= 2) return "bg-ice/20 border-ice/40"; // Ice
    if (count <= 5) return "bg-plasma/40 border-plasma/60"; // Plasma
    if (count <= 10) return "bg-flame/80 border-flame"; // Fire
    return "bg-flame border-flame shadow-[0_0_10px_rgba(255,107,0,0.8)]"; // Burst
  };

  const { months, maxCommits, todayCommits } = useMemo(() => {
    let maxC = 0;
    let todayC = 0;

    const allDays: { date: string; count: number }[] = [];
    stats.weeks.forEach((w) => {
      w.contributionDays.forEach((d) => {
        allDays.push({ date: d.date, count: d.contributionCount });
        if (d.contributionCount > maxC) maxC = d.contributionCount;
      });
    });

    if (allDays.length > 0) {
      todayC = allDays[allDays.length - 1].count;
    }

    const grouped: {
      name: string;
      id: string;
      columns: ({ date: string; count: number } | null)[][];
    }[] = [];
    let currentMonthId = "";

    allDays.forEach((day) => {
      const [y, m, d] = day.date.split("-").map(Number);
      const dateObj = new Date(Date.UTC(y, m - 1, d));
      const monthName = dateObj.toLocaleString("en-US", {
        month: "short",
        timeZone: "UTC",
      });
      const year = dateObj.getUTCFullYear();
      const monthId = `${year}-${dateObj.getUTCMonth()}`;

      if (currentMonthId !== monthId) {
        currentMonthId = monthId;
        grouped.push({ name: monthName, id: monthId, columns: [] });
      }

      const monthGroup = grouped[grouped.length - 1];
      const dayOfWeek = dateObj.getUTCDay(); // 0 is Sunday, 6 is Saturday

      if (monthGroup.columns.length === 0) {
        const firstCol = new Array(7).fill(null);
        firstCol[dayOfWeek] = day;
        monthGroup.columns.push(firstCol);
      } else {
        const lastCol = monthGroup.columns[monthGroup.columns.length - 1];
        if (dayOfWeek === 0) {
          const newCol = new Array(7).fill(null);
          newCol[0] = day;
          monthGroup.columns.push(newCol);
        } else {
          lastCol[dayOfWeek] = day;
        }
      }
    });

    return { months: grouped, maxCommits: maxC, todayCommits: todayC };
  }, [stats]);

  return (
    <div className="mt-8 relative w-full overflow-hidden rounded-lg border border-line/70 bg-abyss p-6">
      <div className="flex items-center justify-between border-b border-line/40 pb-4 mb-4 md:mb-6">
        <h3 className="font-mono text-[11px] tracking-[0.2em] text-faint uppercase">
          GitHub Heatmap (Last 12 Months)
        </h3>
        <span className="font-mono text-[10px] text-polar hidden md:inline-block">
          {stats.totalContributions} contributions
        </span>
      </div>

      {/* Desktop Heatmap View */}
      <div
        className="hidden md:block w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-line/50 scrollbar-track-transparent will-change-transform"
        onScroll={handleScroll}
      >
        {/* biome-ignore lint/a11y/noStaticElementInteractions: tooltip wrapper */}
        <div
          className="flex justify-between min-w-max gap-4 lg:gap-5"
          onMouseOver={handleOver}
          onMouseOut={handleOut}
          onFocus={handleOver}
          onBlur={handleOut}
          onTouchStart={handleOver}
          onTouchEnd={handleOut}
          onMouseLeave={clearTooltip}
        >
          {months.map((month) => (
            <div key={month.id} className="flex flex-col gap-2">
              <span className="font-mono text-[10px] text-mist/60 uppercase tracking-widest pl-1">
                {month.name}
              </span>
              <div className="flex gap-1.5">
                {month.columns.map((col, cIndex) => (
                  <div
                    key={`col-${month.id}-${cIndex}`}
                    className="flex flex-col gap-1.5"
                  >
                    {col.map((day, dIndex) => {
                      if (!day) {
                        return (
                          <div
                            key={`empty-${month.id}-${cIndex}-${dIndex}`}
                            className="h-3 w-3"
                          />
                        );
                      }
                      return (
                        <button
                          type="button"
                          key={day.date}
                          data-date={day.date}
                          data-count={day.count}
                          className={`h-3 w-3 rounded-[3px] border transition-colors duration-300 hover:border-polar cursor-pointer ${getIntensityClass(
                            day.count,
                          )}`}
                          aria-label={`${day.count} contributions on ${day.date}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Summary View */}
      <div className="md:hidden grid grid-cols-2 gap-3">
        <div className="rounded-md border border-line/40 bg-abyss/40 p-4">
          <p className="font-mono text-[10px] tracking-widest text-mist uppercase">
            Total (12mo)
          </p>
          <p className="mt-2 font-display text-2xl text-polar">
            {stats.totalContributions}
          </p>
        </div>
        <div className="rounded-md border border-line/40 bg-abyss/40 p-4">
          <p className="font-mono text-[10px] tracking-widest text-mist uppercase">
            Today
          </p>
          <p className="mt-2 font-display text-2xl text-flame">
            {todayCommits}
          </p>
        </div>
        <div className="col-span-2 rounded-md border border-line/40 bg-abyss/40 p-4">
          <p className="font-mono text-[10px] tracking-widest text-mist uppercase">
            Max Commits (1 day)
          </p>
          <p className="mt-2 font-display text-2xl text-plasma">{maxCommits}</p>
        </div>
      </div>

      {/* Tooltip rendered outside normal flow, controlled via refs to avoid re-renders */}
      <div
        ref={tooltipRef}
        className="fixed z-50 -translate-x-1/2 -translate-y-full rounded border border-line/70 bg-abyss/95 px-2 py-1 font-mono text-[10px] text-polar shadow-lg backdrop-blur-sm pointer-events-none opacity-0 transition-opacity duration-150"
        style={{ top: 0, left: 0 }}
      >
        <span ref={tooltipContentRef} />
      </div>
    </div>
  );
}