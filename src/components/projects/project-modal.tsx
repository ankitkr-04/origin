"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Overlay shell for the intercepted /projects/[slug] route. Closes back to
 * the grid via router.back() on backdrop click, Escape, or the close button.
 */
export function ProjectModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") router.back();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [router]);

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: backdrop click-to-close duplicates the Escape key and close button
    <div
      className="modal-backdrop fixed inset-0 z-[60] overflow-y-auto bg-void/80 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) router.back();
      }}
      role="presentation"
    >
      <div className="flex min-h-full items-start justify-center p-4 py-10 md:py-16">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          className="modal-panel relative w-full max-w-3xl rounded-xl border border-line bg-abyss p-6 shadow-2xl shadow-black/60 outline-none md:p-10"
        >
          <button
            type="button"
            onClick={() => router.back()}
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
