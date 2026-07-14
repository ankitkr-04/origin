"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { REDUCED_MOTION, useMediaQuery } from "@/hooks/use-media-query";

const Scene = dynamic(() => import("@/components/scenes/wal-visualizer-scene"), {
  ssr: false,
});

export function WalVisualizer() {
  const reducedMotion = useMediaQuery(REDUCED_MOTION);
  const [epoch, setEpoch] = useState(1);
  const [appendCounter, setAppendCounter] = useState(0);

  const handleAppend = () => {
    setAppendCounter((prev) => prev + 1);
  };

  if (reducedMotion) {
    return (
      <div className="relative overflow-hidden rounded-xl border border-line bg-abyss p-6">
        <h3 className="font-mono text-sm tracking-widest text-mist uppercase">
          Write-Ahead Log
        </h3>
        <p className="mt-2 text-sm text-polar/60">
          A static diagram of the StrataDB ring buffer. (Reduced motion active)
        </p>
        <div className="mt-8 flex justify-center opacity-30 select-none">
          <svg
            viewBox="0 0 200 200"
            fill="none"
            className="w-full max-w-xs h-auto text-ice"
            stroke="currentColor"
            role="img"
            aria-labelledby="wal-diagram-title"
          >
            <title id="wal-diagram-title">WAL Ring Buffer Diagram</title>
            <circle
              cx="100"
              cy="100"
              r="80"
              strokeWidth="1"
              strokeDasharray="4 4"
            />

            {/* Diagram boxes around the ring */}
            <rect x="90" y="10" width="20" height="20" rx="3" strokeWidth="1" />
            <rect
              x="146"
              y="24"
              width="20"
              height="20"
              rx="3"
              strokeWidth="1"
            />
            <rect
              x="170"
              y="90"
              width="20"
              height="20"
              rx="3"
              strokeWidth="1"
            />
            <rect
              x="146"
              y="156"
              width="20"
              height="20"
              rx="3"
              strokeWidth="1"
            />
            <rect
              x="90"
              y="170"
              width="20"
              height="20"
              rx="3"
              strokeWidth="1"
            />
            <rect
              x="34"
              y="156"
              width="20"
              height="20"
              rx="3"
              strokeWidth="1"
            />
            <rect x="10" y="90" width="20" height="20" rx="3" strokeWidth="1" />
            <rect x="34" y="24" width="20" height="20" rx="3" strokeWidth="1" />

            <text
              x="100"
              y="104"
              fontSize="10"
              fontFamily="monospace"
              textAnchor="middle"
              fill="currentColor"
            >
              Ring Buffer
            </text>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[480px] w-full overflow-hidden rounded-xl border border-line bg-[#02050a] shadow-xl">
      <Scene appendCounter={appendCounter} onEpochChange={setEpoch} />

      <div className="absolute inset-x-0 bottom-0 flex flex-col sm:flex-row items-center justify-between gap-4 bg-void/60 p-4 backdrop-blur-md border-t border-line">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] tracking-[0.2em] text-mist uppercase">
            Ring Buffer
          </span>
          <span className="font-mono text-xs text-polar">
            Epoch Cursor: <span className="text-ember font-bold">{epoch}</span>
          </span>
        </div>

        <Button variant="ignite" onClick={handleAppend}>
          Append Record
        </Button>
      </div>
    </div>
  );
}
