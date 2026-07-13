"use client";

import { useEffect, useState } from "react";

export function Notification({
  message,
  icon,
  duration = 5000,
  onDismiss,
}: {
  message: string;
  icon?: React.ReactNode;
  duration?: number;
  onDismiss?: () => void;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration <= 0) return;
    const timer = setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-3 rounded-full border border-ember/30 bg-abyss px-4 py-2.5 shadow-xl shadow-ember/5">
        {icon || (
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffb454"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        )}
        <span className="font-mono text-xs tracking-wide text-polar">
          {message}
        </span>
        <button
          type="button"
          onClick={() => {
            setVisible(false);
            onDismiss?.();
          }}
          className="ml-2 rounded-full p-1 text-mist hover:bg-white/10 hover:text-polar transition-colors"
          aria-label="Dismiss"
        >
          <svg
            aria-hidden="true"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
