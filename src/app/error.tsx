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
    <main className="flex min-h-svh flex-col items-center justify-center px-5 text-center bg-void">
      <p className="font-mono text-xs tracking-[0.25em] text-flame uppercase">
        ERROR · <em className="not-italic text-[#ff5f8f]">THERMAL RUNAWAY</em>
      </p>
      <h1 className="font-display font-light text-7xl md:text-8xl lg:text-9xl tracking-[0.12em] leading-none my-6 bg-linear-to-b from-flame to-ember bg-clip-text text-transparent select-none">
        500
      </h1>
      <p className="font-mono text-[11.5px] md:text-xs leading-[1.9] text-faint tracking-wider mb-8 uppercase max-w-lg">
        core temperature exceeded
        <br />
        state preserved · safe to retry
        {error.digest ? (
          <>
            <br />
            <span className="opacity-60">fault digest: {error.digest}</span>
          </>
        ) : null}
      </p>
      <ThermalButton variant="ignite" onClick={reset}>
        Cool down & retry
      </ThermalButton>
    </main>
  );
}
