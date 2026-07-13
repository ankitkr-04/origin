"use client";

import { useEffect, useRef } from "react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function useKonamiCode() {
  const sequenceRef = useRef<number>(0);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Ignore if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const key = e.key;
      const expectedKey = KONAMI_CODE[sequenceRef.current];

      if (
        key.toLowerCase() === expectedKey.toLowerCase() ||
        key === expectedKey
      ) {
        sequenceRef.current++;
        if (sequenceRef.current === KONAMI_CODE.length) {
          sequenceRef.current = 0;
          // Dispatch custom event for thermal interactions
          window.dispatchEvent(
            new CustomEvent("thermal-cast:konami", {
              detail: {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
              },
            }),
          );
        }
      } else {
        // Reset if they type the wrong key, but allow restarting immediately
        sequenceRef.current =
          key.toLowerCase() === KONAMI_CODE[0].toLowerCase() ? 1 : 0;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
}
