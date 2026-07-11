"use client";

import { useMemo } from "react";

export function BrandLogo() {
  const gradients = useMemo(
    () => (
      <defs>
        <linearGradient id="logo-ice" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#5eead4" />
        </linearGradient>
        <linearGradient id="logo-fire" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffb454" />
          <stop offset="100%" stopColor="#ff6b3d" />
        </linearGradient>
      </defs>
    ),
    [],
  );

  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block align-middle transition-transform hover:scale-110 duration-200"
      aria-hidden="true"
    >
      {gradients}

      {/* Left leg of A (Ice) */}
      <path
        d="M8 26L16 6"
        stroke="url(#logo-ice)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* Crossbar of A (Ice) */}
      <path
        d="M11.5 18H20.5"
        stroke="url(#logo-ice)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Right leg of A / Vertical leg of K (Transition / Fire) */}
      <path
        d="M16 6L24 26"
        stroke="url(#logo-fire)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* Upper arm of K (Fire) */}
      <path
        d="M20 16L27 9"
        stroke="url(#logo-fire)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* Lower arm of K (Fire) */}
      <path
        d="M20 16L28 26"
        stroke="url(#logo-fire)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
