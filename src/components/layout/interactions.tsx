"use client";

import { useEffect } from "react";
import { useKonamiCode } from "@/hooks/use-konami-code";
import { REDUCED_MOTION, useMediaQuery } from "@/hooks/use-media-query";

const FIRE_SPARKS = ["#ffb454", "#ff6b3d", "#ff5f8f", "#c084fc"];
const ICE_SPARKS = ["#7dd3fc", "#5eead4", "#eaf3ff", "#c084fc"];

/**
 * One delegated listener powers every thermal interaction on the site, so
 * buttons and cards can stay Server Components:
 *
 * - `[data-warm]`  — tracks the pointer into --mx/--my so warmth blooms
 *   from where the cursor actually is (used by .ignite-btn, .warm-card).
 * - `[data-cast="fire" | "ice"]` — the spell-press: a shockwave ring and
 *   sparks burst from the exact press point.
 *
 * Everything is skipped under reduced motion.
 */
export function Interactions() {
  const reducedMotion = useMediaQuery(REDUCED_MOTION);

  useEffect(() => {
    if (reducedMotion) return;

    let raf = 0;
    let lastMove: PointerEvent | null = null;

    const applyMove = () => {
      raf = 0;
      const e = lastMove;
      if (!e) return;
      const el = (e.target as Element | null)?.closest?.(
        "[data-warm]",
      ) as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };

    const onMove = (e: PointerEvent) => {
      lastMove = e;
      if (!raf) raf = requestAnimationFrame(applyMove);
    };

    const onDown = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(
        "[data-cast]",
      ) as HTMLElement | null;
      if (!el) return;
      const icy = el.dataset.cast === "ice";
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;

      const ring = document.createElement("span");
      ring.className = `cast-ring ${icy ? "cast-ring-ice" : "cast-ring-fire"}`;
      ring.style.left = `${x}px`;
      ring.style.top = `${y}px`;
      el.appendChild(ring);
      ring.animate(
        [
          { transform: "translate(-50%,-50%) scale(0.06)", opacity: 1 },
          { transform: "translate(-50%,-50%) scale(1)", opacity: 0 },
        ],
        { duration: 550, easing: "cubic-bezier(0.2,0.7,0.3,1)" },
      ).onfinish = () => ring.remove();

      const colors = icy ? ICE_SPARKS : FIRE_SPARKS;
      for (let i = 0; i < 7; i++) {
        const spark = document.createElement("span");
        spark.className = `cast-spark${icy ? " cast-spark-crystal" : ""}`;
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;
        const color = colors[i % colors.length];
        spark.style.background = color;
        spark.style.boxShadow = `0 0 8px ${color}`;
        el.appendChild(spark);
        const angle = Math.random() * Math.PI * 2;
        const dist = 24 + Math.random() * 34;
        const dx = Math.cos(angle) * dist;
        // Fire sparks drift upward like real embers; crystals scatter flat.
        const dy = Math.sin(angle) * dist - (icy ? 3 : 12);
        spark.animate(
          [
            { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
            {
              transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0.2)`,
              opacity: 0,
            },
          ],
          {
            duration: 480 + Math.random() * 260,
            easing: "cubic-bezier(0.15,0.6,0.3,1)",
          },
        ).onfinish = () => spark.remove();
      }
    };

    const onKonami = (e: Event) => {
      const ce = e as CustomEvent<{ x: number; y: number }>;
      const { x, y } = ce.detail;
      const el = document.body;

      const ring = document.createElement("span");
      ring.className = `cast-ring cast-ring-konami`;
      ring.style.left = `${x}px`;
      ring.style.top = `${y}px`;
      // massive burst
      ring.style.background = "linear-gradient(45deg, #7dd3fc, #ff6b3d)";
      el.appendChild(ring);
      ring.animate(
        [
          { transform: "translate(-50%,-50%) scale(0.1)", opacity: 1 },
          { transform: "translate(-50%,-50%) scale(10)", opacity: 0 },
        ],
        { duration: 1200, easing: "cubic-bezier(0.1, 0.8, 0.2, 1)" },
      ).onfinish = () => ring.remove();

      // Many sparks of both colors
      const colors = [...ICE_SPARKS, ...FIRE_SPARKS];
      for (let i = 0; i < 40; i++) {
        const spark = document.createElement("span");
        spark.className = `cast-spark cast-spark-crystal`;
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;
        const color = colors[i % colors.length];
        spark.style.background = color;
        spark.style.boxShadow = `0 0 12px ${color}`;
        el.appendChild(spark);

        const angle = Math.random() * Math.PI * 2;
        const dist = 100 + Math.random() * 400;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist;
        spark.animate(
          [
            { transform: "translate(-50%,-50%) scale(1.5)", opacity: 1 },
            {
              transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0)`,
              opacity: 0,
            },
          ],
          {
            duration: 800 + Math.random() * 600,
            easing: "cubic-bezier(0.1, 0.8, 0.2, 1)",
          },
        ).onfinish = () => spark.remove();
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("thermal-cast:konami", onKonami);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("thermal-cast:konami", onKonami);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  useKonamiCode();

  return null;
}
