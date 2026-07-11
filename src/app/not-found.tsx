"use client";

import { usePathname } from "next/navigation";
import { ThermalButton } from "@/components/thermal/thermal-button";

export default function NotFound() {
  const pathname = usePathname();

  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-5 text-center bg-void">
      <p className="font-mono text-xs tracking-[0.25em] text-ice uppercase">
        404 · <em className="not-italic text-aurora">COLD MISS</em>
      </p>
      <h1 className="font-display font-[190] text-7xl md:text-8xl lg:text-9xl tracking-[0.12em] leading-none my-6 bg-gradient-to-b from-[#eaf6ff] to-[#7dd3fc] bg-clip-text text-transparent select-none">
        404
      </h1>
      <p className="font-mono text-[11.5px] md:text-xs leading-[1.9] text-faint tracking-wider mb-8 uppercase max-w-lg">
        GET {pathname || "/this-page"} → MISS
        <br />
        object not found in any tier
      </p>
      <ThermalButton variant="frost" href="/">
        Return to the hot path
      </ThermalButton>
    </main>
  );
}
