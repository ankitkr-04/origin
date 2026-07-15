import { CodeforcesIcon, LeetCodeIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
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
      <Button
        variant="stats-ignite"
        href={`https://leetcode.com/u/${identity.leetcodeHandle}`}
        icon={
          <LeetCodeIcon className="w-5 h-5 text-mist transition-colors group-hover:text-flame" />
        }
        text="LeetCode"
      >
        <span className="font-mono text-[10px] text-faint">Solved:</span>
        <span className="font-mono text-sm text-flame">
          {metrics.leetcodeSolved}
        </span>
      </Button>

      <Button
        variant="stats-frost"
        href={`https://codeforces.com/profile/${identity.codeforcesHandle}`}
        icon={
          <CodeforcesIcon className="w-5 h-5 text-mist transition-colors group-hover:text-ice" />
        }
        text="Codeforces"
      >
        <span className="font-mono text-[10px] text-faint">Solved:</span>
        <span className="font-mono text-sm text-ice">
          {metrics.codeforcesSolved}
        </span>
      </Button>
    </div>
  );
}
