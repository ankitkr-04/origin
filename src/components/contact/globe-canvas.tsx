"use client";

import dynamic from "next/dynamic";
import {
  REDUCED_MOTION,
  SMALL_SCREEN,
  useMediaQuery,
} from "@/hooks/use-media-query";

const GlobeScene = dynamic(() => import("@/components/contact/globe-scene"), {
  ssr: false,
});

/** Adaptive client boundary for the contact globe. */
export function GlobeCanvas() {
  const reducedMotion = useMediaQuery(REDUCED_MOTION);
  const smallScreen = useMediaQuery(SMALL_SCREEN);

  return (
    <GlobeScene
      animate={!reducedMotion}
      maxDpr={smallScreen ? 1.5 : 1.75}
      detail={smallScreen ? 12 : 16}
    />
  );
}
