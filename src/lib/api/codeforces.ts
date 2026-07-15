import { cacheLife, cacheTag } from "next/cache";
import { safeFetchJson } from "@/lib/api/fetch-utils";
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

interface CodeforcesSubmission {
  verdict: string;
  problem?: {
    contestId?: number;
    index?: string;
  };
}

interface CodeforcesUserStatusResponse {
  status: string;
  result: CodeforcesSubmission[];
}

interface CodeforcesUser {
  rating?: number;
  rank?: string;
  maxRating?: number;
  maxRank?: string;
}

interface CodeforcesUserInfoResponse {
  status: string;
  result: CodeforcesUser[];
}

const CODEFORCES_REST_API = "https://codeforces.com/api";

const FALLBACK_STATS: CodeforcesStats = { totalSolved: 200 };
const FALLBACK_USER_INFO: CodeforcesUserInfo = {
  rating: 1663,
  rank: "expert",
  maxRating: 1663,
  maxRank: "expert",
};

export async function getCodeforcesStats(
  handle: string,
): Promise<CodeforcesStats> {
  "use cache";
  cacheTag(CACHE_TAGS.coding);
  cacheLife(LIVE_STATS_CACHE_LIFE);

  const data = await safeFetchJson<CodeforcesUserStatusResponse>(
    `${CODEFORCES_REST_API}/user.status?handle=${handle}&from=1&count=10000`,
  );

  if (!data || data.status !== "OK") {
    return FALLBACK_STATS;
  }

  // Dedupe by problem contestId + index (e.g. 1543A) where verdict is OK
  const solvedProblems = new Set<string>();

  for (const sub of data.result) {
    if (sub.verdict === "OK" && sub.problem?.contestId && sub.problem?.index) {
      solvedProblems.add(`${sub.problem.contestId}${sub.problem.index}`);
    }
  }

  return { totalSolved: solvedProblems.size };
}

export async function getCodeforcesUserInfo(
  handle: string,
): Promise<CodeforcesUserInfo> {
  "use cache";
  cacheTag(CACHE_TAGS.coding);
  cacheLife(LIVE_STATS_CACHE_LIFE);

  const data = await safeFetchJson<CodeforcesUserInfoResponse>(
    `${CODEFORCES_REST_API}/user.info?handles=${handle}`,
  );

  const user = data?.status === "OK" ? data.result[0] : undefined;
  if (!user) {
    return FALLBACK_USER_INFO;
  }

  return {
    rating: user.rating ?? 0,
    rank: user.rank ?? "unrated",
    maxRating: user.maxRating ?? 0,
    maxRank: user.maxRank ?? "unrated",
  };
}
