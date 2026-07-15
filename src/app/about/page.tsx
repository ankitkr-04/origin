import type { Metadata } from "next";
import { CodingStats } from "@/components/about/coding-stats";
import { CpuSchematic } from "@/components/about/cpu-schematic";
import { GithubHeatmap } from "@/components/about/github-heatmap";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SkillsMatrix } from "@/components/ui/skills-matrix";
import { getIdentity } from "@/db/identity";
import {
  getCertifications,
  getEducation,
  getExperiences,
  getSkills,
} from "@/db/profile";
import { getSystemMetrics } from "@/lib/metrics";

export function generateMetadata(): Metadata {
  return {
    title: "About",
    description: `Final-year CS student building storage engines, servers, and high-concurrency backends.`,
  };
}

const ABOUT_CONFIG = {
  focusAreas: "Backend, Distributed system, and Concurrency",
  availability: "From June 2026",
  experienceTitle: "Backend and systems engineering experience",
};

export default async function AboutPage() {
  const [experiences, certifications, identity, education, skills, metrics] =
    await Promise.all([
      getExperiences(),
      getCertifications(),
      getIdentity(),
      getEducation(),
      getSkills(),
      getSystemMetrics(),
    ]);

  const githubStats = metrics.githubData;

  return (
    <>
      <SiteNav githubUrl={identity.githubUrl} />
      <main className="pt-14">
        <section className="relative py-16 md:py-24 overflow-hidden">
          <CpuSchematic />

          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <SectionHeading index="001" label="About" title={identity.name} />
            <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
              <Reveal>
                <div className="space-y-5">
                  {identity.aboutNarrative.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-lg leading-relaxed text-mist"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={120}>
                <dl className="space-y-4 rounded-lg border border-line/70 bg-abyss p-6 font-mono text-sm">
                  <div>
                    <dt className="text-[11px] tracking-[0.2em] text-faint uppercase">
                      Location
                    </dt>
                    <dd className="mt-1 text-polar/90">{identity.location}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] tracking-[0.2em] text-faint uppercase">
                      Focus
                    </dt>
                    <dd className="mt-1 text-polar/90">
                      {ABOUT_CONFIG.focusAreas}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] tracking-[0.2em] text-faint uppercase">
                      Available
                    </dt>
                    <dd className="mt-1 text-flame">
                      {ABOUT_CONFIG.availability}
                    </dd>
                  </div>
                </dl>
                <CodingStats identity={identity} metrics={metrics} />
              </Reveal>
            </div>

            {githubStats && (
              <Reveal delay={250}>
                <GithubHeatmap stats={githubStats} />
              </Reveal>
            )}
          </div>
        </section>

        <section className="border-t border-line/60 bg-abyss/40 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <SectionHeading
              index="002"
              label="Experience"
              title={ABOUT_CONFIG.experienceTitle}
              readout="θ RECENCY = WARMTH"
            />
            <div className="thermal-rail space-y-14">
              {experiences.map((experience) => (
                <div
                  key={`${experience.company}-${experience.period}`}
                  className="relative grid gap-8 md:grid-cols-[1fr_1.4fr]"
                >
                  <span
                    className={`thermal-node ${
                      /present|current|now/i.test(experience.period)
                        ? "thermal-node-hot"
                        : "thermal-node-cold"
                    }`}
                    aria-hidden
                  />
                  <Reveal>
                    <div>
                      <h3 className="font-display text-2xl font-bold">
                        {experience.company}
                      </h3>
                      <p className="mt-1 font-mono text-sm text-flame">
                        {experience.role}
                      </p>
                      <p className="mt-1 font-mono text-xs text-faint">
                        {experience.period}
                      </p>
                      <p className="mt-5 leading-relaxed text-mist">
                        {experience.summary}
                      </p>
                    </div>
                  </Reveal>
                  <Reveal delay={120}>
                    <ul className="space-y-4">
                      {experience.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex gap-3 leading-relaxed"
                        >
                          <span
                            className="mt-[9px] size-1 shrink-0 rounded-full bg-ember/70"
                            aria-hidden
                          />
                          <span className="text-sm text-polar/80">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <SectionHeading
              index="003"
              label="Capabilities"
              title="Skills Matrix"
              readout="θ FUNCTIONAL CLUSTERS"
            />
            <SkillsMatrix skills={skills} />
          </div>
        </section>

        <section className="border-t border-line/60 bg-abyss/40 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <SectionHeading
              index="004"
              label="Education"
              title="Credentials"
              readout="θ IMMUTABLE RECORD"
            />
            <div className="grid gap-5 md:grid-cols-2">
              <Reveal>
                <div className="h-full rounded-lg border border-line/70 bg-abyss p-8">
                  <p className="font-display text-xl font-semibold">
                    {education.degree}
                  </p>
                  <p className="mt-2 text-sm text-mist">
                    {education.institution}
                  </p>
                  <p className="mt-1 font-mono text-xs text-faint">
                    {education.period}
                  </p>
                  <p className="mt-4 font-mono text-sm text-flame">
                    CGPA {education.cgpa}
                  </p>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div className="h-full rounded-lg border border-line/70 p-8">
                  <p className="font-mono text-xs tracking-[0.25em] text-mist uppercase">
                    Certifications
                  </p>
                  <ul className="mt-4 space-y-3">
                    {certifications.map((certification) => (
                      <li
                        key={certification}
                        className="flex gap-3 text-sm text-polar/80"
                      >
                        <span className="text-flame" aria-hidden>
                          ✓
                        </span>
                        {certification}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
