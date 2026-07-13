"use client";

import { useEffect, useState } from "react";
import { CloseIcon, InfoIcon } from "@/components/icons";

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
        {icon || <InfoIcon width="14" height="14" stroke="#ffb454" />}
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
          <CloseIcon width="12" height="12" />
        </button>
      </div>
    </div>
  );
}
