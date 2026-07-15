export function CrystalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="btn-glyph"
      width="13"
      height="13"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M8 1.2 12.8 6 8 14.8 3.2 6 8 1.2Z"
        stroke="#7dd3fc"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="M3.2 6h9.6M8 1.2 6.3 6 8 14.8M8 1.2 9.7 6 8 14.8"
        stroke="#7dd3fc"
        strokeWidth="0.6"
        strokeOpacity="0.55"
      />
    </svg>
  );
}
