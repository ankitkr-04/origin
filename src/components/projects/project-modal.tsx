"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const FREEZE_OUT_MS = 240;

/**
 * Overlay shell for the intercepted /projects/[slug] route. Ignites open
 * (CSS keyframes), freezes shut: closing plays the 240ms freeze-out first,
 * then router.back() — router.back() itself can't animate, so the exit
 * has to run before navigation. Escape, backdrop, and ✕ all close.
 *
 * Dismissal is pathname-based: after back-navigation Next.js can leave the
 * stale @modal slot mounted (URL returns to /projects but the intercepted
 * content stays), so once the route no longer matches the one this modal
 * opened on, it renders nothing.
 */
export function ProjectModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const openedOnRef = useRef(pathname);
  const dismissed = pathname !== openedOnRef.current;

  const panelRef = useRef<HTMLDivElement>(null);
  const [closing, setClosing] = useState(false);
  const closingRef = useRef(false);

  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) {
      router.back();
      return;
    }
    setClosing(true);
    window.setTimeout(() => router.back(), FREEZE_OUT_MS);
  }, [router]);

  useEffect(() => {
    if (dismissed) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [close, dismissed]);

  if (dismissed) return null;

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: backdrop click-to-close duplicates the Escape key and close button
    <div
      className={`modal-backdrop fixed inset-0 z-60 flex items-center justify-center p-4 bg-void/80 ${
        closing ? "modal-closing" : ""
      }`}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      role="presentation"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className="modal-panel relative flex flex-col w-full max-w-3xl max-h-[80vh] md:max-h-[85vh] rounded-xl border border-line bg-abyss outline-none"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close project"
          className="absolute top-4 right-4 z-10 flex size-9 items-center justify-center rounded-full border border-line bg-abyss/80 backdrop-blur-sm font-mono text-sm text-mist transition-colors hover:border-ember hover:text-ember"
        >
          ✕
        </button>
        <div className="overflow-y-auto p-6 md:p-10">{children}</div>
      </div>
    </div>
  );
}
