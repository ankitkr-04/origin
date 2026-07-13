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
            className="relative h-full overflow-hidden rounded-xl border border-line/50 bg-abyss/80 p-6 md:p-8 group transition-all duration-500 hover:border-plasma/30 hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(192,132,252,0.15)]"
            data-warm
          >
            {/* Plasma/Ice mouse bloom tracker powered by interactions.tsx */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                background:
                  "radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(192, 132, 252, 0.12), rgba(125, 211, 252, 0.05) 40%, transparent 70%)",
              }}
            />

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
