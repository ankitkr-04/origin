import type { SVGProps } from "react";

export function ChevronIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      role="img"
      aria-label="Chevron"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>Chevron</title>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
