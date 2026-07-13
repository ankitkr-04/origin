import type { SVGProps } from "react";

export function HexagonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      {...props}
    >
      <path d="M8 1.2 14 4.6v6.8L8 14.8 2 11.4V4.6L8 1.2Z" />
    </svg>
  );
}
