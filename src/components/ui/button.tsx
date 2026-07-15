import Link from "next/link";
import { FlameIcon, CrystalIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type Variant = "ignite" | "frost" | "stats-ignite" | "stats-frost" | "custom";

type BaseProps = {
  variant?: Variant;
  href?: string;
  icon?: React.ReactNode;
  text?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

export type ButtonProps = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>;

/**
 * The site's button. Ignite = primary (fire); frost = secondary (quiet
 * cold); stats-* = specialized stats card variants; custom = apply your own classes but get the thermal effect routing.
 * Renders a <Link> for internal routes, an <a> for external URLs, or a <button>.
 */
export function Button({
  variant = "ignite",
  href,
  icon,
  text,
  children,
  className,
  ...props
}: ButtonProps) {
  const isIgnite = variant === "ignite";
  const isFrost = variant === "frost";
  const isStatsIgnite = variant === "stats-ignite";
  const isStatsFrost = variant === "stats-frost";

  const isStats = isStatsIgnite || isStatsFrost;
  const isAnyIgnite = isIgnite || isStatsIgnite;
  const isAnyFrost = isFrost || isStatsFrost;

  // Default glyphs for standard variants if no icon provided
  let defaultIcon = icon;
  if (!icon && !isStats && variant !== "custom") {
    if (isIgnite) defaultIcon = <FlameIcon />;
    if (isFrost) defaultIcon = <CrystalIcon />;
  }

  const cls = cn(
    isIgnite && "ignite-btn",
    isFrost && "frost-btn",
    isStatsIgnite &&
      "group relative flex cursor-pointer items-center justify-between gap-4 rounded border border-line/40 bg-abyss/40 px-4 py-3 transition-colors hover:border-flame/50 hover:bg-flame/5",
    isStatsFrost &&
      "group relative flex cursor-pointer items-center justify-between gap-4 rounded border border-line/40 bg-abyss/40 px-4 py-3 transition-colors hover:border-ice/50 hover:bg-ice/5",
    className,
  );

  // Allow overriding thermal attributes via props, fallback to variant defaults
  const dataWarm =
    "data-warm" in props
      ? props["data-warm"]
      : isAnyIgnite || variant === "custom"
        ? ""
        : undefined;
  const dataCast =
    "data-cast" in props
      ? props["data-cast"]
      : isAnyIgnite
        ? "fire"
        : isAnyFrost
          ? "ice"
          : undefined;

  const thermalProps = {
    className: cls,
    "data-warm": dataWarm,
    "data-cast": dataCast,
    ...props,
  };

  const body = (
    <>
      {isStats ? (
        <>
          <div className="flex items-center gap-3">
            {defaultIcon}
            {text ? (
              <span
                className={cn(
                  "font-mono text-[11px] tracking-widest text-mist transition-colors",
                  isStatsIgnite && "group-hover:text-flame",
                  isStatsFrost && "group-hover:text-ice",
                )}
              >
                {text}
              </span>
            ) : null}
          </div>
          <div className="flex items-center gap-2">{children}</div>
        </>
      ) : (
        <>
          {defaultIcon}
          {text ? <span>{text}</span> : null}
          {children}
        </>
      )}
    </>
  );

  if (href?.startsWith("/")) {
    return (
      <Link href={href} transitionTypes={["nav"]} {...(thermalProps as any)}>
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
        {...(thermalProps as any)}
      >
        {body}
      </a>
    );
  }

  return (
    <button type={(props as any).type || "button"} {...(thermalProps as any)}>
      {body}
    </button>
  );
}
