"use client";

import { usePathname } from "next/navigation";
import { ThermalButton } from "@/components/thermal/thermal-button";

export default function NotFound() {
  const pathname = usePathname();

  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-5 text-center">
      <div className="w-full max-w-md rounded-2xl border border-line bg-abyss p-7 md:p-8 text-left relative overflow-hidden">
        <div className="font-mono text-xs tracking-[0.25em] text-ice uppercase">
          404 · <em className="not-italic text-aurora">COLD MISS</em>
        </div>
        <div className="font-display font-[190] text-5xl md:text-6xl tracking-widest leading-none my-3 bg-gradient-to-b from-[#eaf6ff] to-[#7dd3fc] bg-clip-text text-transparent">
          404
        </div>
        <div className="font-mono text-[11.5px] leading-[1.9] text-faint tracking-wider mb-6 uppercase">
          GET {pathname || "/this-page"} → MISS
          <br />
          object not found in any tier
        </div>
        <ThermalButton variant="frost" href="/">
          Return to the hot path
        </ThermalButton>
      </div>
    </main>
  );
}
