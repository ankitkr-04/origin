"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/types/content";

const FREEZE_OUT_MS = 240;

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
  children: React.ReactNode;
};

export function ProjectModal({
  project,
  onClose,
  children,
}: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [closing, setClosing] = useState(false);
  const closingRef = useRef(false);

  const handleClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setClosing(true);
    window.setTimeout(() => {
      onClose();
      setClosing(false);
      closingRef.current = false;
    }, FREEZE_OUT_MS);
  }, [onClose]);

  useEffect(() => {
    if (!project) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.documentElement.style.overflow = "hidden";
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = "";
    };
  }, [handleClose, project]);

  if (!project && !closing) return null;

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: backdrop click-to-close duplicates the Escape key and close button
    <div
      className={`modal-backdrop fixed inset-0 z-60 flex items-center justify-center p-4 bg-void/80 ${
        closing ? "modal-closing" : ""
      }`}
      onClick={(event) => {
        if (event.target === event.currentTarget) handleClose();
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
          onClick={handleClose}
          aria-label="Close project"
          className="absolute top-4 right-4 z-10 flex size-11 items-center justify-center rounded-full border border-line bg-abyss/80 backdrop-blur-sm font-mono text-sm text-mist transition-colors hover:border-ember hover:text-ember"
        >
          ✕
        </button>
        <div className="overflow-y-auto p-6 md:p-10">{children}</div>
      </div>
    </div>
  );
}
