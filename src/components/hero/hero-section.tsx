// src/components/hero/hero-section.tsx
import { HeroCanvas } from "@/components/hero/hero-canvas";
import { ThermalButton } from "@/components/thermal/thermal-button";
import { achievementStats, identity } from "@/lib/profile";

const LSM_LEVELS = [
  { id: "L0", label: "memtable — active writes", temp: "hot" },
  { id: "L1", label: "flush to disk", temp: "warm" },
  { id: "L2", label: "background compaction", temp: "warm" },
  { id: "L3", label: "cold storage", temp: "cold" },
] as const;

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col overflow-hidden"
    >
      {/* Ambient glow + 3D LSM stack, behind everything */}
      <div className="hero-glow absolute inset-0" aria-hidden />
      <div className="absolute inset-0 md:left-[34%]" aria-hidden>
        <HeroCanvas />
      </div>
      {/* Fade the scene under the text on small screens for legibility */}
      <div
        className="absolute inset-0 bg-linear-to-r from-void via-void/72 to-transparent md:via-void/26"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 items-end gap-10 px-5 pt-24 pb-12 md:grid-cols-[1.1fr_minmax(0,0.9fr)] md:px-8 md:pb-16">
        <div className="flex flex-col justify-center">
          <p
            className="hero-ignite flex items-center gap-2.5 font-mono text-xs tracking-[0.24em] uppercase"
            style={{ animationDelay: "0.2s" }}
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="text-ice/70"
            >
              <path
                d="M8 1.2 14 4.6v6.8L8 14.8 2 11.4V4.6L8 1.2Z"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
            <span className="text-flame">001 / ORIGIN</span>
            <span className="text-faint">·</span>
            <span className="text-mist normal-case tracking-normal">
              {identity.location} · {identity.education}
            </span>
          </p>

          <h1
            className="hero-ignite type-cool mt-6 max-w-3xl text-4xl leading-[1.04] text-balance sm:text-6xl md:text-7xl"
            style={{ animationDelay: "0.35s" }}
          >
            {identity.headlineParts[0]}
            <span className="type-molten">{identity.headlineParts[1]}</span>
            {identity.headlineParts[2]}
          </h1>

          <p
            className="hero-ignite mt-6 max-w-xl text-base leading-relaxed text-mist md:text-lg"
            style={{ animationDelay: "0.55s" }}
          >
            {identity.positioning}
          </p>

          <div
            className="hero-ignite mt-10 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "0.75s" }}
          >
            <ThermalButton variant="ignite" href="#work">
              View the work
            </ThermalButton>
            <ThermalButton variant="frost" href={identity.githubUrl}>
              github/ankitkr-04 ↗
            </ThermalButton>
          </div>
        </div>

        <aside
          className="hero-ignite warm-card relative self-center md:justify-self-end"
          style={{ animationDelay: "0.95s" }}
        >
          <div className="relative overflow-hidden rounded-4xl border border-line/70 bg-abyss/65 p-5 shadow-[0_28px_120px_-42px_rgba(0,0,0,0.9)] backdrop-blur-md md:w-[23rem] md:p-6">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,107,61,0.12),transparent_40%)]"
              aria-hidden
            />

            <div className="relative flex items-center justify-between gap-4">
              <p className="font-mono text-[11px] tracking-[0.3em] text-faint uppercase">
                Compaction
              </p>
              <p className="font-mono text-xs tracking-[0.22em] text-ice uppercase">
                θ / live
              </p>
            </div>

            <ol className="thermal-rail mt-6 flex list-none flex-col gap-4">
              {LSM_LEVELS.map((level) => (
                <li
                  key={level.id}
                  className="relative flex items-baseline gap-3"
                >
                  <span
                    className={`thermal-node ${
                      level.temp === "hot"
                        ? "thermal-node-hot"
                        : level.temp === "cold"
                          ? "thermal-node-cold"
                          : ""
                    }`}
                    style={
                      level.temp === "warm"
                        ? { background: "var(--color-plasma)" }
                        : undefined
                    }
                  />
                  <span className="font-mono text-[11px] tracking-[0.16em] text-polar uppercase">
                    {level.id}
                  </span>
                  <span
                    className="mb-1 flex-1 border-b border-dotted border-line/70"
                    aria-hidden
                  />
                  <span className="text-xs text-faint">{level.label}</span>
                </li>
              ))}
            </ol>

            <dl className="relative mt-6 grid grid-cols-2 gap-3 border-t border-line/60 pt-5">
              {achievementStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-line/70 bg-floe/50 px-4 py-3"
                >
                  <dd className="font-display text-xl text-flame">
                    {item.value}
                  </dd>
                  <dt className="mt-1 font-mono text-[10px] tracking-[0.18em] text-mist uppercase">
                    {item.label}
                  </dt>
                  {item.detail ? (
                    <p className="mt-0.5 text-[11px] leading-snug text-faint">
                      {item.detail}
                    </p>
                  ) : null}
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>

      <div className="cold-open-veil" aria-hidden />
    </section>
  );
}