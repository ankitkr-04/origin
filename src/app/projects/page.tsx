import type { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectCase } from "@/components/projects/project-case";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { getProjects } from "@/db/queries";

export const metadata: Metadata = {
  title: "Projects — Ankit Kumar",
  description:
    "Storage engines, servers, and systems: StrataDB, Axiom, TicketLedger, and the rest of the shelf.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  const flagshipProjects = projects.filter((p) => p.tier === "flagship");
  const notableProjects = projects.filter((p) => p.tier === "notable");
  const archiveProjects = projects.filter((p) => p.tier === "archive");

  return (
    <PageTransition>
      <SiteNav />
      <main className="pt-14">
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <SectionHeading
              index="001"
              label="Flagship"
              title="The systems shelf"
            />
            <div>
              {flagshipProjects.map((project, i) => (
                <ProjectCase key={project.slug} project={project} index={i} />
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
            />
            <div className="grid gap-5 md:grid-cols-2">
              {notableProjects.map((project, i) => (
                <Reveal key={project.slug} delay={i * 80}>
                  <ProjectCard project={project} />
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
            />
            <div className="grid gap-5 md:grid-cols-3">
              {archiveProjects.map((project, i) => (
                <Reveal key={project.slug} delay={i * 80}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </PageTransition>
  );
}
