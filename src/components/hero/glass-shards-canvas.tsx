// src/components/hero/glass-shards-canvas.tsx
"use client";

import dynamic from "next/dynamic";
import { REDUCED_MOTION, useMediaQuery } from "@/hooks/use-media-query";

const GlassShardsScene = dynamic(
  () => import("@/components/hero/glass-shards-scene"),
  { ssr: false },
);

export function GlassShardsCanvas() {
  const _reducedMotion = useMediaQuery(REDUCED_MOTION);

  // If we really want to render nothing or a fallback when reduced motion is on,
  // we could do it here. But the scene already handles it gracefully (stops spinning).
  // I will just render the scene.

  return <GlassShardsScene />;
}
