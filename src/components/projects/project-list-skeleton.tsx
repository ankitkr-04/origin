"use client";

import { useEffect, useState } from "react";

const TELEMETRY_LINES = [
  "θ TELEMETRY PORT CONNECTED ON CHANNEL 0x8F",
  "GET /db/projects → CORE READ IN PROGRESS",
  "θ CACHE INDEXES WARMING (STALE=86400s)...",
  "θ FLUSHING MEMTABLE TO DISK (L0 -> L1)...",
  "θ COMPACTING RUNS FOR ATTENTION KEYWORDS...",
  "θ ALL TIER READS COMPLETED IN 1.84MS",
  "θ CORE TEMPERATURE ACTIVE: 21°C",
  "θ ESTABLISHING THERMAL SHIELD BOUNDARY...",
];

export function ProjectListSkeleton() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    let active = true;
    let idx = 0;

    const tick = () => {
      if (!active) return;
      setLogs((prev) => [...prev, TELEMETRY_LINES[idx]]);
      idx++;
      if (idx < TELEMETRY_LINES.length) {
        setTimeout(tick, 100 + Math.random() * 150);
      }
    };

    tick();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-5 pt-20 pb-16 md:px-8">
      {/* Telemetry terminal box */}
      <div
        className="rounded-lg border border-line/50 bg-abyss/45 p-4 font-mono text-[10.5px] leading-relaxed text-ice/72 shadow-inner mb-14"
        aria-live="polite"
      >
        <span className="text-flame select-none">$ </span>
        <span className="text-polar select-none">telemetry --watch --core</span>
        {logs.map((log) => (
          <p
            key={log}
            className={
              log.includes("FLUSHING")
                ? "text-flame animate-pulse"
                : log.includes("COMPLETED")
                  ? "text-aurora"
                  : "text-ice/70"
            }
          >
            {log}
          </p>
        ))}
        {logs.length < TELEMETRY_LINES.length && (
          <span className="inline-block w-1.5 h-3 bg-ice/70 animate-pulse ml-0.5 align-middle" />
        )}
      </div>

      {/* Flagships loading block (Shimmer cards) */}
      <div className="space-y-12">
        {[1, 2].map((n) => (
          <div
            key={n}
            className="relative h-64 overflow-hidden rounded-xl border border-line/40 bg-abyss/30 p-8 flex flex-col justify-end gap-3 shimmer-blue"
          >
            <div className="h-6 w-1/4 bg-ice/12 rounded" />
            <div className="h-4 w-1/2 bg-mist/12 rounded" />
            <div className="h-4 w-1/3 bg-mist/12 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
