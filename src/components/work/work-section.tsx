import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCase } from "@/components/work/project-case";
import { featuredProjects, secondaryProjects } from "@/lib/content";

export function WorkSection() {
  return (
    <section id="work" className="scroll-mt-14 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="001"
          label="Work"
          title="Systems built from first principles"
        />

        <div>
          {featuredProjects.map((project) => (
            <ProjectCase key={project.id} project={project} />
          ))}
        </div>

        <Reveal className="mt-20">
          <p className="font-mono text-xs tracking-[0.25em] text-muted uppercase">
            Further work
          </p>
        </Reveal>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {secondaryProjects.map((project, i) => (
            <Reveal key={project.name} delay={i * 90}>
              <article className="flex h-full flex-col rounded-lg border border-line/70 bg-surface p-6 transition-colors hover:border-amber/40">
                <h3 className="font-display text-xl font-semibold">
                  {project.name}
                </h3>
                <p className="mt-1 font-mono text-[11px] text-faint">
                  {project.stack}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
                <div className="mt-6 flex gap-5">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-muted transition-colors hover:text-amber"
                  >
                    Source ↗
                  </a>
                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-amber transition-colors hover:text-text"
                    >
                      Live demo ↗
                    </a>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
