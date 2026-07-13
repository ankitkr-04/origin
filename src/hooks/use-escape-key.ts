import { useEffect, useRef } from "react";

export function useEscapeKey(callback: () => void, enabled = true) {
  const callbackRef = useRef(callback);

  // Keep callback fresh without causing effect re-runs
  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        callbackRef.current();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [enabled]);
}
