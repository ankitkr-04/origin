import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-xs tracking-[0.25em] text-flame uppercase">
        404 / Key not found
      </p>
      <h1 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-6xl">
        This page never made it past the WAL.
      </h1>
      <p className="mt-4 max-w-md text-mist">
        The address you followed doesn't exist here. Head back to the top-level
        index.
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full bg-ember px-6 py-3 font-mono text-sm font-medium text-void transition-transform hover:scale-[1.03]"
      >
        Back home
      </Link>
    </main>
  );
}
