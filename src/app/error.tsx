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
      <p className="font-mono text-xs tracking-[0.25em] text-ember uppercase">
        500 / INTERNAL FAULT
      </p>
      <h1 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-6xl">
        Something crashed. Recovery is in the contract.
      </h1>
      <p className="mt-4 max-w-md text-mist bg-abyss/30 p-4 rounded-lg border border-line/20">
        An unexpected error interrupted rendering.
        {error.digest ? ` Reference: ${error.digest}.` : ""} Try again — state
        is safe.
      </p>
      <div className="mt-10">
        <ThermalButton variant="ignite" onClick={reset}>
          Retry
        </ThermalButton>
      </div>
    </main>
  );
}
