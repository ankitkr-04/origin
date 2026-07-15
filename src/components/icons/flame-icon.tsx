export function FlameIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="btn-glyph"
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M8 1.5c1.9 2.6 4 4.3 4 7.1a4 4 0 0 1-8 0c0-1.2.5-2.3 1.2-3.3.3.9 1 1.5 1.6 1.7C6.3 5 6.9 3.2 8 1.5Z"
        fill="url(#flame-fill)"
      />
      <path
        d="M8 8.4c.9.9 1.6 1.6 1.6 2.6a1.6 1.6 0 0 1-3.2 0c0-1 .7-1.7 1.6-2.6Z"
        fill="#ffd9a1"
      />
      <defs>
        <linearGradient id="flame-fill" x1="8" y1="1.5" x2="8" y2="12.6">
          <stop stopColor="#ffb454" />
          <stop offset="1" stopColor="#ff6b3d" />
        </linearGradient>
      </defs>
    </svg>
  );
}
