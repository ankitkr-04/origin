import Link from "next/link";

type Variant = "ignite" | "frost";

type ThermalButtonProps = {
  variant?: Variant;
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  "aria-label"?: string;
};

/** Living flame, embedded in every ignite button — flickers on hover. */
function FlameGlyph() {
  return (
    <svg
      className="btn-glyph"
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
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

/** Faceted ice shard, embedded in every frost button — tilts on hover. */
function CrystalGlyph() {
  return (
    <svg
      className="btn-glyph"
      width="13"
      height="13"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
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

/**
 * The site's button. Ignite = primary (fire); frost = secondary (quiet
 * cold). Renders a <Link> for internal routes (with the typed "nav"
 * transition), an <a> for hash anchors and external URLs, or a <button>.
 * The bloom and spell-press are wired via data attributes and handled by
 * <Interactions/> — this stays a Server Component.
 */
export function Button({
  variant = "ignite",
  href,
  children,
  className,
  onClick,
  "aria-label": ariaLabel,
}: ThermalButtonProps) {
  const ignite = variant === "ignite";
  const cls = [ignite ? "ignite-btn" : "frost-btn", className]
    .filter(Boolean)
    .join(" ");
  const thermalProps = {
    className: cls,
    "data-warm": ignite ? "" : undefined,
    "data-cast": ignite ? "fire" : "ice",
    "aria-label": ariaLabel,
  };
  const body = (
    <>
      {ignite ? <FlameGlyph /> : <CrystalGlyph />}
      <span>{children}</span>
    </>
  );

  if (href?.startsWith("/")) {
    return (
      <Link href={href} transitionTypes={["nav"]} {...thermalProps}>
        {body}
      </Link>
    );
  }
  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...thermalProps}
      >
        {body}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} {...thermalProps}>
      {body}
    </button>
  );
}
