import Link from "next/link";
import type { Project } from "@/types/content";

/** Compact grid card for notable/archive projects — opens the case study. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-full flex-col rounded-lg border border-line/70 bg-surface p-6 transition-colors hover:border-amber/40">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-xl font-semibold">
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:content-[''] group-hover:text-amber transition-colors"
          >
            {project.name}
          </Link>
        </h3>
        <span className="font-mono text-[11px] text-faint">{project.year}</span>
      </div>
      <p className="mt-1 font-mono text-[11px] text-faint">{project.stack}</p>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
        {project.summary}
      </p>
      <p className="mt-6 font-mono text-xs text-amber opacity-0 transition-opacity group-hover:opacity-100">
        Open case study →
      </p>
    </article>
  );
}
