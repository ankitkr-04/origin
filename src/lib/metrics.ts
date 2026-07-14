import { getIdentity } from "@/db/identity";
import { getCodeforcesStats } from "./api/codeforces";
import { getGithubStats } from "./api/github";
import { getLeetcodeStats } from "./api/leetcode";

export interface SystemMetrics {
  githubCommits: number;
  dsaSolved: number;
}

export async function getSystemMetrics(): Promise<SystemMetrics> {
  // 1. Fetch identity to get handles
  const identity = await getIdentity();

  // 2. Fetch all three APIs using Promise.allSettled to prevent one failure from bringing down all stats
  const [githubResult, leetcodeResult, codeforcesResult] =
    await Promise.allSettled([
      getGithubStats(identity.githubHandle),
      getLeetcodeStats(identity.leetcodeHandle),
      getCodeforcesStats(identity.codeforcesHandle),
    ]);

  // 3. Process results with fallbacks for failures
  let githubCommits = 0;
  if (githubResult.status === "fulfilled") {
    githubCommits = githubResult.value.totalCommitContributions;
  } else {
    console.error("Failed to fetch GitHub stats:", githubResult.reason);
  }

  let dsaSolved = 0;
  if (leetcodeResult.status === "fulfilled") {
    dsaSolved += leetcodeResult.value.totalSolved;
  } else {
    console.error("Failed to fetch LeetCode stats:", leetcodeResult.reason);
  }

  if (codeforcesResult.status === "fulfilled") {
    dsaSolved += codeforcesResult.value.totalSolved;
  } else {
    console.error("Failed to fetch Codeforces stats:", codeforcesResult.reason);
  }

  return {
    githubCommits,
    dsaSolved,
  };
}
