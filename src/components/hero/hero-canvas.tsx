"use client";

import dynamic from "next/dynamic";
import {
  REDUCED_MOTION,
  SMALL_SCREEN,
  useMediaQuery,
} from "@/hooks/use-media-query";

// Three.js must never render on the server or block first paint.
const StrataScene = dynamic(() => import("@/components/hero/strata-scene"), {
  ssr: false,
});

/**
 * Client boundary for the hero 3D scene. Adapts to the device: lower DPR
 * ceiling on small screens, static (single-frame) render under
 * prefers-reduced-motion, and nothing at all during SSR.
 */
export function HeroCanvas() {
  const reducedMotion = useMediaQuery(REDUCED_MOTION);
  const smallScreen = useMediaQuery(SMALL_SCREEN);

  return (
    <StrataScene animate={!reducedMotion} maxDpr={smallScreen ? 1.5 : 1.75} />
  );
}
