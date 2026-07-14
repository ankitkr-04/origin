import { cacheLife, cacheTag } from "next/cache";
import { CACHE_TAGS, LIVE_STATS_CACHE_LIFE } from "@/lib/cache-config";

export interface LeetcodeStats {
  totalSolved: number;
}

const LEETCODE_GRAPHQL_API = "https://leetcode.com/graphql";

export async function getLeetcodeStats(handle: string): Promise<LeetcodeStats> {
  "use cache";
  cacheTag(CACHE_TAGS.coding);
  cacheLife(LIVE_STATS_CACHE_LIFE);

  const query = `
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

  const response = await fetch(LEETCODE_GRAPHQL_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // LeetCode requires a User-Agent to avoid blocking
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
    body: JSON.stringify({
      query,
      variables: { username: handle },
    }),
  });

  if (!response.ok) {
    throw new Error(`LeetCode API returned ${response.status}`);
  }

  const data = await response.json();

  if (data.errors || !data.data?.matchedUser) {
    throw new Error(
      `LeetCode API error or user not found: ${JSON.stringify(data.errors)}`,
    );
  }

  // acSubmissionNum is an array: [{difficulty: "All", count: X}, {difficulty: "Easy", count: Y}, ...]
  const acStats = data.data.matchedUser.submitStats.acSubmissionNum;
  const allDiff = acStats.find(
    (s: { difficulty: string; count: number }) => s.difficulty === "All",
  );

  return {
    totalSolved: allDiff ? allDiff.count : 0,
  };
}
