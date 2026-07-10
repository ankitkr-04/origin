import type { Project } from "@/types/content";

/**
 * Full project write-up, shared by the intercepted modal and the standalone
 * /projects/[slug] page.
 */
export function ProjectDetail({ project }: { project: Project }) {
  return (
    <article>
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-mono text-xs text-faint">{project.year}</span>
        {project.status === "active" ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber/30 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-amber uppercase">
            <span className="size-1.5 animate-pulse rounded-full bg-amber" />
            Active development
          </span>
        ) : null}
      </div>

      <h1 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
        {project.name}
      </h1>
      <p className="mt-2 font-mono text-xs text-muted">{project.stack}</p>
      <p className="mt-5 text-lg text-balance text-text/90 md:text-xl">
        {project.tagline}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.metrics.map((metric) => (
          <span
            key={metric}
            className="rounded border border-line bg-surface px-2.5 py-1 font-mono text-[11px] text-amber"
          >
            {metric}
          </span>
        ))}
      </div>

      <div className="mt-8 space-y-5">
        {project.story.map((paragraph) => (
          <p key={paragraph} className="leading-relaxed text-muted">
            {paragraph}
          </p>
        ))}
      </div>

      <h2 className="mt-10 font-mono text-xs tracking-[0.25em] text-muted uppercase">
        Key decisions
      </h2>
      <ul className="mt-4 space-y-3">
        {project.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-3 text-sm leading-relaxed">
            <span
              className="mt-[7px] size-1 shrink-0 rounded-full bg-amber/70"
              aria-hidden
            />
            <span className="text-text/80">{highlight}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-amber px-6 py-3 font-mono text-sm font-medium text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          Read the source ↗
        </a>
        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-line px-6 py-3 font-mono text-sm text-text transition-colors hover:border-amber hover:text-amber"
          >
            Live demo ↗
          </a>
        ) : null}
      </div>
    </article>
  );
}
