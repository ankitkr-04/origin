import Link from "next/link";
import { Reveal } from "@/components/reveal";
import type { Project } from "@/types/content";

/** Wide editorial row for flagship projects — links into the case study. */
export function ProjectCase({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Reveal>
      <article className="group relative grid gap-8 border-t border-line/60 py-12 md:grid-cols-[1fr_1.4fr] md:py-16">
        <div>
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs text-faint">
              {String(index + 1).padStart(3, "0")}
            </span>
            {project.status === "active" ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber/30 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-amber uppercase">
                <span className="size-1.5 animate-pulse rounded-full bg-amber" />
                Active development
              </span>
            ) : null}
          </div>
          <h3 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
            <Link
              href={`/projects/${project.slug}`}
              className="transition-colors group-hover:text-amber"
            >
              {project.name}
            </Link>
          </h3>
          <p className="mt-2 font-mono text-xs text-muted">{project.stack}</p>
          <p className="mt-4 text-lg text-balance text-text/90">
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

          <div className="mt-8 flex gap-6">
            <Link
              href={`/projects/${project.slug}`}
              className="font-mono text-sm text-amber underline decoration-amber/40 underline-offset-4 transition-colors hover:decoration-amber"
            >
              Case study →
            </Link>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-muted underline decoration-line underline-offset-4 transition-colors hover:text-amber hover:decoration-amber"
            >
              Source ↗
            </a>
          </div>
        </div>

        <div>
          <p className="leading-relaxed text-muted">{project.summary}</p>
          <ul className="mt-6 space-y-3">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-3 text-sm leading-relaxed"
              >
                <span
                  className="mt-[7px] size-1 shrink-0 rounded-full bg-amber/70"
                  aria-hidden
                />
                <span className="text-text/80">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  );
}
