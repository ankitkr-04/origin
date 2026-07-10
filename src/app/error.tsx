"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-xs tracking-[0.25em] text-amber uppercase">
        500 / Unhandled fault
      </p>
      <h1 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-6xl">
        Something crashed. Recovery is in the contract.
      </h1>
      <p className="mt-4 max-w-md text-muted">
        An unexpected error interrupted rendering.
        {error.digest ? ` Reference: ${error.digest}.` : ""} Try again — state
        is safe.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-10 rounded-full bg-amber px-6 py-3 font-mono text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
      >
        Retry
      </button>
    </main>
  );
}
