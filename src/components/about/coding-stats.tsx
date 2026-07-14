import type { Identity, SystemMetrics } from "@/types/content";

export function CodingStats({
  metrics,
  identity,
}: {
  metrics: SystemMetrics;
  identity: Identity;
}) {
  return (
    <div className="mt-8 space-y-4 rounded-lg border border-line/70 bg-abyss p-6 font-mono text-sm">
      <div className="flex items-center justify-between border-b border-line/40 pb-4">
        <h3 className="text-[11px] tracking-[0.2em] text-faint uppercase">
          Coding Activity
        </h3>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flame opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-flame" />
        </span>
      </div>

      <a
        href={`https://leetcode.com/u/${identity.leetcodeHandle}`}
        target="_blank"
        rel="noopener noreferrer"
        data-warm
        className="group relative flex cursor-pointer items-center justify-between gap-4 rounded border border-line/40 bg-abyss/40 px-3 py-2 transition-colors hover:border-line/70 hover:bg-abyss/60"
      >
        <span className="text-[11px] tracking-[0.1em] text-mist transition-colors group-hover:text-polar">
          DSA Problems Solved
        </span>
        <span className="text-flame transition-colors">
          {metrics.dsaSolved}
        </span>
      </a>

      <a
        href={identity.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-warm
        className="group relative flex cursor-pointer items-center justify-between gap-4 rounded border border-line/40 bg-abyss/40 px-3 py-2 transition-colors hover:border-line/70 hover:bg-abyss/60"
      >
        <span className="text-[11px] tracking-[0.1em] text-mist transition-colors group-hover:text-polar">
          GitHub Commits (Total)
        </span>
        <span className="text-polar transition-colors">
          {metrics.githubCommits}
        </span>
      </a>
    </div>
  );
}
