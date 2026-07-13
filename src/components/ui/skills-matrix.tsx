import { Reveal } from "@/components/ui/reveal";
import type { SkillRow } from "@/db/schema";

export function SkillsMatrix({ skills }: { skills: SkillRow[] }) {
  const groups = skills.reduce<Record<string, SkillRow[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const categories = Object.keys(groups);

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {categories.map((category, i) => (
        <Reveal key={category} delay={i * 75}>
          <div
            className="matrix-card relative h-full overflow-hidden rounded-xl border border-line/50 bg-abyss/80 p-6 md:p-8 group"
            data-warm
          >
            <div className="relative z-10">
              <h3 className="mb-6 type-frozen text-mist group-hover:text-polar transition-colors duration-500">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {groups[category].map((skill) => (
                  <span
                    key={skill.name}
                    className="rounded-md border border-line/40 bg-white/3 px-3 py-1.5 font-mono text-[13px] tracking-wide text-polar shadow-sm transition-colors duration-300 hover:border-plasma/40 hover:bg-plasma/10"
                    data-cast="ice"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
