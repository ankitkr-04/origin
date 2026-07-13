import { HexagonIcon } from "@/components/icons";
import { ThermalButton } from "@/components/thermal/thermal-button";
import { getIdentity } from "@/db/identity";
import { getSystemMetrics } from "@/db/metrics";
import { getAchievementStats, getEducation } from "@/db/profile";

export async function HeroSection() {
  const identity = await getIdentity();
  const achievementStats = await getAchievementStats();
  const education = await getEducation();
  const systemMetrics = await getSystemMetrics();

  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col overflow-hidden"
    >
      {/* Ambient glow + 3D LSM stack, behind everything */}
      <div className="hero-glow absolute inset-0" aria-hidden />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 items-end gap-10 px-5 pt-24 pb-12 md:grid-cols-[1.1fr_minmax(0,0.9fr)] md:px-8 md:pb-16">
        <div className="flex flex-col justify-center">
          <p
            className="hero-ignite flex items-center gap-2.5 font-mono text-xs tracking-[0.24em] uppercase"
            style={{ animationDelay: "0.2s" }}
          >
            <HexagonIcon className="text-ice/70" />
            <span className="text-flame">001 / ORIGIN</span>
            <span className="text-faint">·</span>
            <span className="text-mist normal-case tracking-normal">
              {identity.location} · {education.degree}
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
            <ThermalButton
              variant="frost"
              href={identity.githubUrl}
              aria-label="GitHub profile (opens in a new tab)"
            >
              github/ankitkr-04 ↗
            </ThermalButton>
          </div>
        </div>

        <aside
          className="hero-ignite warm-card relative self-center md:justify-self-end"
          style={{ animationDelay: "0.95s" }}
        >
          <div className="relative overflow-hidden rounded-4xl border border-line/70 bg-abyss/65 p-5 shadow-[0_28px_120px_-42px_rgba(0,0,0,0.9)] backdrop-blur-xl md:w-96 md:p-6">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,107,61,0.12),transparent_40%)]"
              aria-hidden
            />

            <div className="relative flex items-center justify-between gap-4 border-b border-line/60 pb-5">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flame opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-flame"></span>
                </span>
                <p className="font-mono text-[11px] tracking-[0.3em] text-polar uppercase">
                  Sys.Status
                </p>
              </div>
              <p className="font-mono text-[10px] tracking-[0.22em] text-ice uppercase">
                Active
              </p>
            </div>

            <div className="relative mt-5 flex items-center justify-between gap-4 rounded-xl border border-line/40 bg-abyss/40 px-4 py-2.5">
              <span className="font-mono text-[10px] tracking-[0.2em] text-mist uppercase">
                Github Commits (2026)
              </span>
              <span className="font-mono text-xs text-polar">
                {systemMetrics.githubCommits}
              </span>
            </div>

            <div className="relative mt-3 flex items-center justify-between gap-4 rounded-xl border border-line/40 bg-abyss/40 px-4 py-2.5">
              <span className="font-mono text-[10px] tracking-[0.2em] text-mist uppercase">
                DSA Problems Solved
              </span>
              <span className="font-mono text-xs text-flame">
                {systemMetrics.dsaSolved}
              </span>
            </div>

            <dl className="relative mt-5 grid grid-cols-2 gap-3">
              {achievementStats.map((item) => (
                <div
                  key={item.label}
                  className="bento-card-charge group relative overflow-hidden rounded-2xl border border-line/70 bg-floe/40 px-4 py-3 transition-colors hover:bg-floe/60"
                >
                  <div
                    className="bento-bg-charge absolute inset-0 opacity-0 transition-opacity"
                    aria-hidden
                  />
                  <dd className="bento-val-charge font-display text-xl text-polar transition-colors">
                    {item.value}
                  </dd>
                  <dt className="bento-label-charge mt-1 font-mono text-[10px] tracking-[0.18em] text-mist uppercase transition-colors">
                    {item.label}
                  </dt>
                  {item.detail ? (
                    <p className="mt-1 text-[10px] leading-relaxed text-faint">
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
