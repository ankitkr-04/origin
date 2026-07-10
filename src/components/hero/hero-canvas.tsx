"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

// Three.js must never render on the server or block first paint.
const StrataScene = dynamic(() => import("@/components/hero/strata-scene"), {
  ssr: false,
});

function subscribeToMedia(query: string) {
  return (onChange: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  };
}

const subscribeReducedMotion = subscribeToMedia(
  "(prefers-reduced-motion: reduce)",
);
const subscribeSmallScreen = subscribeToMedia("(max-width: 767px)");

function useMediaQuery(
  subscribe: (onChange: () => void) => () => void,
  query: string,
) {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/**
 * Client boundary for the hero 3D scene. Adapts to the device: lower DPR
 * ceiling on small screens, static (single-frame) render under
 * prefers-reduced-motion, and nothing at all during SSR.
 */
export function HeroCanvas() {
  const reducedMotion = useMediaQuery(
    subscribeReducedMotion,
    "(prefers-reduced-motion: reduce)",
  );
  const smallScreen = useMediaQuery(subscribeSmallScreen, "(max-width: 767px)");

  return (
    <StrataScene animate={!reducedMotion} maxDpr={smallScreen ? 1.5 : 1.75} />
  );
}
