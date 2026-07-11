// src/components/contact/beacon-canvas.tsx
"use client";

import dynamic from "next/dynamic";
import {
  REDUCED_MOTION,
  SMALL_SCREEN,
  useMediaQuery,
} from "@/hooks/use-media-query";

const BeaconScene = dynamic(() => import("@/components/contact/beacon-scene"), {
  ssr: false,
});

/** Adaptive client boundary for the contact beacon. */
export function BeaconCanvas() {
  const reducedMotion = useMediaQuery(REDUCED_MOTION);
  const smallScreen = useMediaQuery(SMALL_SCREEN);

  return (
    <BeaconScene
      animate={!reducedMotion}
      maxDpr={smallScreen ? 1.5 : 1.75}
      lowDetail={smallScreen}
    />
  );
}
