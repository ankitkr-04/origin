import { CodeforcesIcon, LeetCodeIcon } from "@/components/icons";
import type { Identity, SystemMetrics } from "@/types/content";

export function CodingStats({
  identity,
  metrics,
}: {
  identity: Identity;
  metrics: SystemMetrics;
}) {
  return (
    <div className="mt-4 flex flex-col gap-3">
      <a
        href={`https://leetcode.com/u/${identity.leetcodeHandle}`}
        target="_blank"
        rel="noopener noreferrer"
        data-warm
        className="group relative flex cursor-pointer items-center justify-between gap-4 rounded border border-line/40 bg-abyss/40 px-4 py-3 transition-colors hover:border-flame/50 hover:bg-flame/5"
      >
        <div className="flex items-center gap-3">
          <LeetCodeIcon className="w-5 h-5 text-mist transition-colors group-hover:text-flame" />
          <span className="font-mono text-[11px] tracking-widest text-mist transition-colors group-hover:text-flame">
            LeetCode
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-faint">Solved:</span>
          <span className="font-mono text-sm text-flame">
            {metrics.leetcodeSolved}
          </span>
        </div>
      </a>

      <a
        href={`https://codeforces.com/profile/${identity.codeforcesHandle}`}
        target="_blank"
        rel="noopener noreferrer"
        data-warm
        className="group relative flex cursor-pointer items-center justify-between gap-4 rounded border border-line/40 bg-abyss/40 px-4 py-3 transition-colors hover:border-ice/50 hover:bg-ice/5"
      >
        <div className="flex items-center gap-3">
          <CodeforcesIcon className="w-5 h-5 text-mist transition-colors group-hover:text-ice" />
          <span className="font-mono text-[11px] tracking-widest text-mist transition-colors group-hover:text-ice">
            Codeforces
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-faint">Solved:</span>
          <span className="font-mono text-sm text-ice">
            {metrics.codeforcesSolved}
          </span>
        </div>
      </a>
    </div>
  );
}
