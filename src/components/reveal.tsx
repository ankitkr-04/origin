"use client";

import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger offset in ms, applied via the --reveal-delay custom property. */
  delay?: number;
}

/**
 * Wraps content in a scroll-triggered fade-rise. The animation itself lives in
 * globals.css under [data-reveal], where prefers-reduced-motion disables it.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useIntersectionObserver(
    ref,
    (entry, observer) => {
      if (entry.isIntersecting && ref.current) {
        ref.current.dataset.reveal = "visible";
        observer.disconnect();
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );

  return (
    <div
      ref={ref}
      data-reveal=""
      className={className}
      style={
        delay
          ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}
