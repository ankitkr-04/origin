"use client";

import { ProjectCard } from "@/components/projects/project-card";
import { ProjectCase } from "@/components/projects/project-case";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useProjectModal } from "@/hooks/use-project-modal";
import type { Project } from "@/types/content";

export function ProjectList({ projects }: { projects: Project[] }) {
  const { setActiveProject, modal } = useProjectModal();

  const flagshipProjects = projects.filter((p) => p.tier === "flagship");
  const notableProjects = projects.filter((p) => p.tier === "notable");
  const archiveProjects = projects.filter((p) => p.tier === "archive");

  return (
    <main className="pt-14">
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionHeading
            index="001"
            label="Flagship"
            title="The systems shelf"
            readout="θ HOT · IN ACTIVE MEMORY"
          />
          <div>
            {flagshipProjects.map((project, i) => (
              <ProjectCase
                key={project.slug}
                project={project}
                index={i}
                onSelect={setActiveProject}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line/60 bg-abyss/40 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionHeading
            index="002"
            label="Notable"
            title="Built to solve something specific"
            readout="θ WARM · CACHED"
          />
          <div className="grid gap-5 md:grid-cols-2">
            {notableProjects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 80}>
                <ProjectCard project={project} onSelect={setActiveProject} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionHeading
            index="003"
            label="Earlier"
            title="Where it started"
            readout="θ COLD · IMMUTABLE"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {archiveProjects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 80}>
                <ProjectCard project={project} onSelect={setActiveProject} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {modal}
    </main>
  );
}
