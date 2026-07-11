"use client";

import { ThermalButton } from "@/components/thermal/thermal-button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-5 text-center">
      <div className="w-full max-w-md rounded-2xl border border-line bg-abyss p-7 md:p-8 text-left relative overflow-hidden shadow-[inset_0_0_60px_-30px_rgba(255,107,61,0.25)]">
        <div className="font-mono text-xs tracking-[0.25em] text-flame uppercase">
          ERROR · <em className="not-italic text-[#ff5f8f]">THERMAL RUNAWAY</em>
        </div>
        <div className="font-display font-[300] text-5xl md:text-6xl tracking-widest leading-none my-3 bg-gradient-to-b from-[#ffd9c2] to-[#ff6b3d] bg-clip-text text-transparent">
          500
        </div>
        <div className="font-mono text-[11.5px] leading-[1.9] text-faint tracking-wider mb-6 uppercase">
          core temperature exceeded
          <br />
          state preserved · safe to retry
          {error.digest ? (
            <>
              <br />
              <span className="opacity-60">fault digest: {error.digest}</span>
            </>
          ) : null}
        </div>
        <ThermalButton variant="ignite" onClick={reset}>
          Cool down & retry
        </ThermalButton>
      </div>
    </main>
  );
}
