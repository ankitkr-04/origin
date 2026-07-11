import { ThermalButton } from "@/components/thermal/thermal-button";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-xs tracking-[0.25em] text-ice uppercase">
        404 / NOT FOUND
      </p>
      <h1 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-6xl">
        This page never made it past the WAL.
      </h1>
      <p className="mt-4 max-w-md text-mist">
        The address you followed doesn't exist here. Head back to the top-level
        index.
      </p>
      <div className="mt-10">
        <ThermalButton variant="ignite" href="/">
          Back home
        </ThermalButton>
      </div>
    </main>
  );
}
