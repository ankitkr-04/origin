"use client";

import { useEffect, useRef } from "react";
import {
  POINTER_FINE,
  REDUCED_MOTION,
  useMediaQuery,
} from "@/hooks/use-media-query";

const LENS_SIZE = 540;

/**
 * The heat lens — a faint ember warmth that follows the pointer, easing
 * behind it like real heat lag, with a pulse on press. Desktop only:
 * renders nothing on coarse pointers and under reduced motion.
 */
export function HeatLens() {
  const finePointer = useMediaQuery(POINTER_FINE);
  const reducedMotion = useMediaQuery(REDUCED_MOTION);
  const active = finePointer && !reducedMotion;

  const lensRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lens = lensRef.current;
    if (!active || !lens) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 3;
    let x = targetX;
    let y = targetY;
    let seen = false;
    let raf = 0;

    const place = () => {
      lens.style.transform = `translate3d(${x - LENS_SIZE / 2}px, ${y - LENS_SIZE / 2}px, 0)`;
    };

    const tick = () => {
      const dx = targetX - x;
      const dy = targetY - y;

      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
        x = targetX;
        y = targetY;
        place();
        raf = 0;
        return;
      }

      x += dx * 0.11;
      y += dy * 0.11;
      place();
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!seen) {
        seen = true;
        x = targetX;
        y = targetY;
        lens.classList.add("heat-lens-on");
      }
      if (!raf) {
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    // Don't start ticking until pointer moves
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [active]);

  if (!active) return null;
  return <div ref={lensRef} className="heat-lens" aria-hidden="true" />;
}
