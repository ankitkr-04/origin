import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { experience } from "@/lib/content";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="scroll-mt-14 border-t border-line/60 bg-surface/40 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="002"
          label="Experience"
          title="Real-time infrastructure, in production"
        />

        <div className="grid gap-8 md:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div>
              <h3 className="font-display text-2xl font-bold">
                {experience.company}
              </h3>
              <p className="mt-1 font-mono text-sm text-amber">
                {experience.role}
              </p>
              <p className="mt-1 font-mono text-xs text-faint">
                {experience.period}
              </p>
              <p className="mt-5 leading-relaxed text-muted">
                {experience.summary}
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ul className="space-y-4">
              {experience.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 leading-relaxed">
                  <span
                    className="mt-[9px] size-1 shrink-0 rounded-full bg-amber/70"
                    aria-hidden
                  />
                  <span className="text-sm text-text/80">{highlight}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
