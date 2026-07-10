import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const achievements = [
  {
    value: "Global Rank 15",
    context: "TCS CodeVita Season 13 — out of 669,000+ participants worldwide",
    note: "Top 0.003% in one of the world's largest coding competitions",
  },
  {
    value: "Expert · 1655",
    context: "Codeforces competitive rating",
    note: "Externally verifiable, earned across rated contests",
  },
];

const certifications = [
  "Oracle Cloud Infrastructure 2025 Developer Professional (1Z0-1084-25)",
  "AWS Academy — Cloud Foundations",
];

export function ProofSection() {
  return (
    <section id="proof" className="scroll-mt-14 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="003"
          label="Proof"
          title="Numbers that can be checked"
        />

        <div className="grid gap-5 md:grid-cols-2">
          {achievements.map((achievement, i) => (
            <Reveal key={achievement.value} delay={i * 100}>
              <article className="h-full rounded-lg border border-line/70 bg-surface p-8">
                <p className="font-display text-3xl font-bold text-amber md:text-4xl">
                  {achievement.value}
                </p>
                <p className="mt-3 text-text/90">{achievement.context}</p>
                <p className="mt-2 text-sm text-muted">{achievement.note}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-10">
          <div className="rounded-lg border border-line/70 p-6 md:p-8">
            <p className="font-mono text-xs tracking-[0.25em] text-muted uppercase">
              Certifications
            </p>
            <ul className="mt-4 space-y-2">
              {certifications.map((certification) => (
                <li
                  key={certification}
                  className="flex gap-3 text-sm text-text/80"
                >
                  <span className="text-amber" aria-hidden>
                    ✓
                  </span>
                  {certification}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
