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
      x += (targetX - x) * 0.11;
      y += (targetY - y) * 0.11;
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
    };

    const onDown = () => {
      lens.animate(
        [
          { opacity: 1, scale: "1" },
          { opacity: 1, scale: "1.22" },
          { opacity: 1, scale: "1" },
        ],
        { duration: 500, easing: "ease-out" },
      );
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      cancelAnimationFrame(raf);
    };
  }, [active]);

  if (!active) return null;
  return <div ref={lensRef} className="heat-lens" aria-hidden="true" />;
}
