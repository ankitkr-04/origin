import { WalVisualizer } from "@/components/projects/wal-visualizer";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types/content";

/**
 * Full project write-up, shared by the intercepted modal and the standalone
 * /projects/[slug] page.
 */
export function ProjectDetail({
  project,
  isModal = true,
}: {
  project: Project;
  isModal?: boolean;
}) {
  return (
    <article>
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-mono text-xs text-faint">{project.year}</span>
        {project.status === "active" ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-ember/30 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-flame uppercase">
            <span className="size-1.5 animate-pulse rounded-full bg-ember" />
            Active development
          </span>
        ) : null}
      </div>

      <h1 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
        {project.name}
      </h1>
      <p className="mt-2 font-mono text-xs text-mist">{project.stack}</p>
      <p className="mt-5 text-lg text-balance text-polar/90 md:text-xl">
        {project.tagline}
      </p>

      {project.slug === "stratadb" && !isModal && (
        <div className="mt-10 mb-14">
          <WalVisualizer />
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        {project.metrics.map((metric) => (
          <span
            key={metric}
            className="rounded border border-line bg-abyss px-2.5 py-1 font-mono text-[11px] text-flame"
          >
            {metric}
          </span>
        ))}
      </div>

      <div className="mt-8 space-y-5">
        {project.story.map((paragraph) => (
          <p key={paragraph} className="leading-relaxed text-mist">
            {paragraph}
          </p>
        ))}
      </div>

      <h2 className="mt-10 font-mono text-xs tracking-[0.25em] text-mist uppercase">
        Key decisions
      </h2>
      <ul className="mt-4 space-y-3">
        {project.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-3 text-sm leading-relaxed">
            <span
              className="mt-[7px] size-1 shrink-0 rounded-full bg-ember/70"
              aria-hidden
            />
            <span className="text-polar/80">{highlight}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap gap-4">
        <Button variant="ignite" href={project.repoUrl}>
          Read the source ↗
        </Button>
        {project.demoUrl ? (
          <Button variant="frost" href={project.demoUrl}>
            Live demo ↗
          </Button>
        ) : null}
      </div>
    </article>
  );
}
