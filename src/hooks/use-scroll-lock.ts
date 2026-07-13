import { useEffect } from "react";

export function useScrollLock(lock = true) {
  useEffect(() => {
    if (lock) {
      // Lock scroll by setting overflow hidden on the html element
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [lock]);
}
