import { cacheLife, cacheTag } from "next/cache";
import { CACHE_TAGS, LIVE_STATS_CACHE_LIFE } from "@/lib/cache-config";

export interface CodeforcesStats {
  totalSolved: number;
}

const CODEFORCES_REST_API = "https://codeforces.com/api";

export async function getCodeforcesStats(
  handle: string,
): Promise<CodeforcesStats> {
  "use cache";
  cacheTag(CACHE_TAGS.coding);
  cacheLife(LIVE_STATS_CACHE_LIFE);

  // Fetch up to 10000 submissions to cover the user's history and avoid undocumented pagination limits
  const response = await fetch(
    `${CODEFORCES_REST_API}/user.status?handle=${handle}&from=1&count=10000`,
  );

  if (!response.ok) {
    throw new Error(`Codeforces API returned ${response.status}`);
  }

  const data = await response.json();
  if (data.status !== "OK") {
    throw new Error(`Codeforces API error: ${data.comment || "Unknown error"}`);
  }

  const submissions = data.result;

  // Deduplicate by problem contestId + index (e.g. 1543 + A) where verdict is OK
  const solvedProblems = new Set<string>();

  for (const sub of submissions) {
    if (
      sub.verdict === "OK" &&
      sub.problem &&
      sub.problem.contestId &&
      sub.problem.index
    ) {
      solvedProblems.add(`${sub.problem.contestId}${sub.problem.index}`);
    }
  }

  return {
    totalSolved: solvedProblems.size,
  };
}
