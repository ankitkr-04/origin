"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, ViewTransition } from "react";

/**
 * Cross-fades page content on <Link transitionTypes={["nav"]}> navigations.
 * Triggers a horizontal glowing sweep line (the ember sweep) on page changes.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sweep, setSweep] = useState(false);
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    const prev = prevPathnameRef.current;
    prevPathnameRef.current = pathname;

    if (prev === pathname) {
      return;
    }

    setSweep(true);
    const timer = setTimeout(() => {
      setSweep(false);
    }, 1050); // matches the total transition animation duration (400ms exit + 650ms enter)
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <ViewTransition
      enter={{ nav: "page-enter", default: "none" }}
      exit={{ nav: "page-exit", default: "none" }}
      default="none"
    >
      <div className="relative min-h-svh">
        <div
          className={`sweep-line ${sweep ? "sweep-go" : ""}`}
          aria-hidden="true"
        />
        {children}
      </div>
    </ViewTransition>
  );
}
