"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    console.log("[Web Vitals]", metric);
  });

  return null;
}
