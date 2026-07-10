import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { achievements } from "@/lib/profile";

export function AchievementsSection() {
  return (
    <section
      id="achievements"
      className="scroll-mt-14 border-t border-line/60 bg-surface/40 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="002"
          label="Achievements"
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
      </div>
    </section>
  );
}
