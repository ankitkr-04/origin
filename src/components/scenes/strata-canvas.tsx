// src/components/hero/hero-canvas.tsx
"use client";

import dynamic from "next/dynamic";
import type { StrataSceneProps } from "@/components/scenes/strata-scene";
import {
  REDUCED_MOTION,
  SMALL_SCREEN,
  useMediaQuery,
} from "@/hooks/use-media-query";

const StrataScene = dynamic<StrataSceneProps>(
  () => import("@/components/scenes/strata-scene"),
  { ssr: false },
);

export function StrataCanvas() {
  const reducedMotion = useMediaQuery(REDUCED_MOTION);
  const smallScreen = useMediaQuery(SMALL_SCREEN);

  return <StrataScene animate={!reducedMotion} lowDetail={smallScreen} />;
}
