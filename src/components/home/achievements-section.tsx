import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getAchievements } from "@/db/profile";

export async function AchievementsSection() {
  const achievements = await getAchievements();

  return (
    <section
      id="achievements"
      className="scroll-mt-14 border-t border-line/60 bg-abyss/40 py-20 md:py-28"
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
              <article
                className="warm-card h-full rounded-lg border border-line/70 bg-abyss p-8"
                data-warm=""
              >
                <p className="font-display text-3xl font-bold text-flame md:text-4xl">
                  {achievement.value}
                </p>
                <p className="mt-3 text-polar/90">{achievement.context}</p>
                <p className="mt-2 text-sm text-mist">{achievement.note}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
