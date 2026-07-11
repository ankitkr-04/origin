"use client";

import { useEffect, useState } from "react";
import { ThermalSpinner } from "@/components/thermal/thermal-spinner";

const TECHNICAL_MESSAGES = [
  "kindling resources…",
  "establishing handshake…",
  "hydrating layout…",
  "fetching record…",
  "revalidating cache…",
];

export default function RootLoading() {
  const [label, setLabel] = useState(TECHNICAL_MESSAGES[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLabel((prev) => {
        const idx = TECHNICAL_MESSAGES.indexOf(prev);
        return TECHNICAL_MESSAGES[(idx + 1) % TECHNICAL_MESSAGES.length];
      });
    }, 850);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-void">
      <ThermalSpinner label={label} />
    </div>
  );
}
