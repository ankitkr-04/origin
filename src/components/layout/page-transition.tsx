"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, ViewTransition } from "react";

/**
 * Cross-fades page content on <Link transitionTypes={["nav"]}> navigations.
 * Triggers a top-to-bottom reveal curtain on page changes.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sweep, setSweep] = useState(false);
  const [transitionKey, setTransitionKey] = useState(pathname);
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    const prev = prevPathnameRef.current;
    prevPathnameRef.current = pathname;

    if (prev === pathname) {
      return;
    }

    setSweep(true);
    setTransitionKey(pathname);
    const timer = setTimeout(() => {
      setSweep(false);
    }, 1200); // matches the slowed transition duration (1.2s)
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <ViewTransition
      enter={{ nav: "page-enter", default: "none" }}
      exit={{ nav: "page-exit", default: "none" }}
      default="none"
    >
      <div className="relative min-h-svh overflow-hidden">
        {sweep && (
          <div
            key={`curtain-${transitionKey}`}
            className="reveal-curtain sweep-go"
            aria-hidden="true"
          />
        )}
        {children}
      </div>
    </ViewTransition>
  );
}
