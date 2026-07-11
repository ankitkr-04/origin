"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ViewTransition } from "react";

/**
 * Cross-fades page content on <Link transitionTypes={["nav"]}> navigations.
 * Triggers a horizontal glowing sweep line (the ember sweep) on page changes.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sweep, setSweep] = useState(false);

  useEffect(() => {
    setSweep(true);
    const timer = setTimeout(() => {
      setSweep(false);
    }, 650); // matches the transition animation duration
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
