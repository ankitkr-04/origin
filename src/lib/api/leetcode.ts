import { cacheLife, cacheTag } from "next/cache";
import { safeFetchJson } from "@/lib/api/fetch-utils";
import { CACHE_TAGS, LIVE_STATS_CACHE_LIFE } from "@/lib/cache-config";

export interface LeetcodeStats {
  totalSolved: number;
}

interface AcSubmission {
  difficulty: string;
  count: number;
}

interface LeetcodeGraphQLResponse {
  errors?: unknown[];
  data?: {
    matchedUser: {
      submitStats: {
        acSubmissionNum: AcSubmission[];
      };
    } | null;
  };
}

const LEETCODE_GRAPHQL_API = "https://leetcode.com/graphql";
const FALLBACK_STATS: LeetcodeStats = { totalSolved: 340 };

const USER_PROFILE_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      submitStats {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
  }
`;

export async function getLeetcodeStats(handle: string): Promise<LeetcodeStats> {
  "use cache";
  cacheTag(CACHE_TAGS.coding);
  cacheLife(LIVE_STATS_CACHE_LIFE);

  const data = await safeFetchJson<LeetcodeGraphQLResponse>(
    LEETCODE_GRAPHQL_API,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // LeetCode requires a User-Agent to avoid blocking
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      body: JSON.stringify({
        query: USER_PROFILE_QUERY,
        variables: { username: handle },
      }),
    },
  );

  if (!data || data.errors || !data.data?.matchedUser) {
    return FALLBACK_STATS;
  }

  const acStats = data.data.matchedUser.submitStats.acSubmissionNum;
  const allDiff = acStats.find((s) => s.difficulty === "All");

  return { totalSolved: allDiff?.count ?? 0 };
}
