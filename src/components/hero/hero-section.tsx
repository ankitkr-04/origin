import { HeroCanvas } from "@/components/hero/hero-canvas";
import { Reveal } from "@/components/reveal";
import { ThermalButton } from "@/components/thermal/thermal-button";
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
        className="absolute inset-0 bg-gradient-to-r from-void via-void/60 to-transparent md:via-void/30"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pt-24 pb-16 md:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.25em] text-flame uppercase">
            {identity.location} · {identity.education}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="type-cool mt-6 max-w-3xl text-4xl leading-[1.08] text-balance sm:text-6xl md:text-7xl">
            {identity.headlineParts[0]}
            <span className="type-molten">{identity.headlineParts[1]}</span>
            {identity.headlineParts[2]}
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-mist md:text-lg">
            {identity.positioning}
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <ThermalButton variant="ignite" href="#work">
              View the work
            </ThermalButton>
            <ThermalButton variant="frost" href={identity.githubUrl}>
              github/ankitkr-04 ↗
            </ThermalButton>
          </div>
        </Reveal>
      </div>

      {/* Proof strip — verified numbers only */}
      <div className="relative z-10 border-t border-line/60 bg-void/60 backdrop-blur-sm">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-5 px-5 py-6 md:grid-cols-4 md:px-8">
          {achievementStats.map((item, i) => (
            <Reveal key={item.label} delay={i * 80}>
              <div>
                <dd className="font-display text-2xl font-bold text-flame md:text-3xl">
                  {item.value}
                </dd>
                <dt className="mt-1 font-mono text-[11px] tracking-wide text-mist uppercase">
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
