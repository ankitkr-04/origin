"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const FREEZE_OUT_MS = 240;

/**
 * Overlay shell for the intercepted /projects/[slug] route. Ignites open
 * (CSS keyframes), freezes shut: closing plays the 240ms freeze-out first,
 * then router.back() — router.back() itself can't animate, so the exit
 * has to run before navigation. Escape, backdrop, and ✕ all close.
 */
export function ProjectModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
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
  }, [close]);

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: backdrop click-to-close duplicates the Escape key and close button
    <div
      className={`modal-backdrop fixed inset-0 z-[60] overflow-y-auto bg-void/80 ${
        closing ? "modal-closing" : ""
      }`}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      role="presentation"
    >
      <div className="flex min-h-full items-start justify-center p-4 py-10 md:py-16">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          className="modal-panel relative w-full max-w-3xl rounded-xl border border-line bg-abyss p-6 outline-none md:p-10"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close project"
            className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full border border-line font-mono text-sm text-mist transition-colors hover:border-ember hover:text-ember"
          >
            ✕
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}
