import { useEffect, useRef } from "react";

export function useIntersectionObserver(
  ref: React.RefObject<Element | null>,
  callback: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver,
  ) => void,
  options?: IntersectionObserverInit,
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      callbackRef.current(entry, observer);
    }, options);

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);
}
