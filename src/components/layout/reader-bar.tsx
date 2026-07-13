"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Reading-progress line at the very top of the viewport — the seam gradient
 * (ice → plasma → ember) revealing left to right as you scroll the page.
 * Flashes briefly on navigation: the seam ignites to mark the handoff.
 */
export function ReaderBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const bar = barRef.current;
    if (!bar || !pathname) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    bar.animate(
      [
        { filter: "brightness(1)", boxShadow: "0 0 0 rgba(255,107,61,0)" },
        {
          filter: "brightness(1.9)",
          boxShadow: "0 0 14px rgba(255,107,61,0.8)",
        },
        { filter: "brightness(1)", boxShadow: "0 0 0 rgba(255,107,61,0)" },
      ],
      { duration: 650, easing: "ease-out" },
    );
  }, [pathname]);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? doc.scrollTop / max : 0;
      bar.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={barRef} className="reader-bar" aria-hidden="true" />;
}
