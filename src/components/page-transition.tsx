import { ViewTransition } from "react";

/**
 * Cross-fades page content on <Link transitionTypes={["nav"]}> navigations.
 * default="none" keeps Suspense reveals and background updates silent.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition
      enter={{ nav: "page-enter", default: "none" }}
      exit={{ nav: "page-exit", default: "none" }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
