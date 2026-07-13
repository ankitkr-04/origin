// src/components/hero/glass-shards-canvas.tsx
"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const GlassShardsScene = dynamic(
  () => import("@/components/hero/glass-shards-scene"),
  { ssr: false },
);

export function GlassShardsCanvas() {
  const pathname = usePathname();
  const isVisible = pathname === "/";

  return (
    <div
      className="fixed inset-0 h-screen w-screen pointer-events-none z-0 transition-opacity duration-[1400ms] ease-out"
      style={{
        visibility: isVisible ? "visible" : "hidden",
        opacity: isVisible ? 1 : 0,
      }}
    >
      <GlassShardsScene isVisible={isVisible} />
    </div>
  );
}
