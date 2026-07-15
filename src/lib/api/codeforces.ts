import { cacheLife, cacheTag } from "next/cache";
import { CACHE_TAGS, LIVE_STATS_CACHE_LIFE } from "@/lib/cache-config";

export interface CodeforcesStats {
  totalSolved: number;
}

export interface CodeforcesUserInfo {
  rating: number;
  rank: string;
  maxRating: number;
  maxRank: string;
}

const CODEFORCES_REST_API = "https://codeforces.com/api";

export async function getCodeforcesStats(
  handle: string,
): Promise<CodeforcesStats> {
  "use cache";
  cacheTag(CACHE_TAGS.coding);
  cacheLife(LIVE_STATS_CACHE_LIFE);

  let response : Response;
  try {
    response = await fetch(
      `${CODEFORCES_REST_API}/user.status?handle=${handle}&from=1&count=10000`,
    );
  } catch (_) {
    return { totalSolved: 0 };
  }

  if (!response.ok) {
    return { totalSolved: 0 };
  }

  const data = await response.json();
  if (data.status !== "OK") {
    return { totalSolved: 0 };
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

export async function getCodeforcesUserInfo(
  handle: string,
): Promise<CodeforcesUserInfo> {
  "use cache";
  cacheTag(CACHE_TAGS.coding);
  cacheLife(LIVE_STATS_CACHE_LIFE);

  let response: Response;
  try {
    response = await fetch(
      `${CODEFORCES_REST_API}/user.info?handles=${handle}`,
    );
  } catch (_: unknown) {
    return { rating: 0, rank: "unrated", maxRating: 0, maxRank: "unrated" };
  }

  if (!response.ok) {
    return { rating: 0, rank: "unrated", maxRating: 0, maxRank: "unrated" };
  }

  const data = await response.json();
  if (data.status !== "OK") {
    return { rating: 0, rank: "unrated", maxRating: 0, maxRank: "unrated" };
  }

  const user = data.result[0];

  return {
    rating: user.rating || 0,
    rank: user.rank || "unrated",
    maxRating: user.maxRating || 0,
    maxRank: user.maxRank || "unrated",
  };
}
