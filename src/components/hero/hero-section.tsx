import { HeroCanvas } from "@/components/hero/hero-canvas";
import { Reveal } from "@/components/reveal";
import { achievementStats, identity } from "@/lib/profile";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col overflow-hidden"
    >
      {/* Ambient glow + 3D strata stack, behind everything */}
      <div className="hero-glow absolute inset-0" aria-hidden />
      <div className="absolute inset-0 md:left-1/4" aria-hidden>
        <HeroCanvas />
      </div>
      {/* Fade the scene under the text on small screens for legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent md:via-ink/30"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pt-24 pb-16 md:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.25em] text-amber uppercase">
            {identity.location} · {identity.education}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-6xl md:text-7xl">
            {identity.headline}
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {identity.positioning}
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="rounded-full bg-amber px-6 py-3 font-mono text-sm font-medium text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              View the work
            </a>
            <a
              href={identity.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line px-6 py-3 font-mono text-sm text-text transition-colors hover:border-amber hover:text-amber"
            >
              github/ankitkr-04 ↗
            </a>
          </div>
        </Reveal>
      </div>

      {/* Proof strip — verified numbers only */}
      <div className="relative z-10 border-t border-line/60 bg-ink/60 backdrop-blur-sm">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-5 px-5 py-6 md:grid-cols-4 md:px-8">
          {achievementStats.map((item, i) => (
            <Reveal key={item.label} delay={i * 80}>
              <div>
                <dd className="font-display text-2xl font-bold text-amber md:text-3xl">
                  {item.value}
                </dd>
                <dt className="mt-1 font-mono text-[11px] tracking-wide text-muted uppercase">
                  {item.label}
                </dt>
                {item.detail ? (
                  <p className="mt-0.5 text-xs text-faint">{item.detail}</p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
