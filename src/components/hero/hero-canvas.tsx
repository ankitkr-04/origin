// src/components/hero/hero-canvas.tsx
"use client";

import dynamic from "next/dynamic";
import type { StrataSceneProps } from "@/components/hero/strata-scene";
import {
  REDUCED_MOTION,
  SMALL_SCREEN,
  useMediaQuery,
} from "@/hooks/use-media-query";

import { CanvasErrorBoundary } from "@/components/canvas-error-boundary";

const StrataScene = dynamic<StrataSceneProps>(
  () => import("@/components/hero/strata-scene"),
  { ssr: false },
);

export function HeroCanvas() {
  const reducedMotion = useMediaQuery(REDUCED_MOTION);
  const smallScreen = useMediaQuery(SMALL_SCREEN);

  return (
    <CanvasErrorBoundary>
      <StrataScene
        animate={!reducedMotion}
        maxDpr={smallScreen ? 1.5 : 1.75}
        lowDetail={smallScreen}
      />
    </CanvasErrorBoundary>
  );
}
