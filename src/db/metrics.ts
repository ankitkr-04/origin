import { cacheLife, cacheTag } from "next/cache";
import { CACHE_TAGS, CONTENT_CACHE_LIFE } from "@/lib/cache-config";
import type { SystemMetrics } from "@/types/content";

export async function getSystemMetrics(): Promise<SystemMetrics> {
  "use cache";
  cacheTag(CACHE_TAGS.profile);
  cacheLife(CONTENT_CACHE_LIFE);

  // Mocked stats for Github commits (current year 2026) and DSA problems solved.
  // Later this can be replaced with real API queries.
  return {
    githubCommits: 842,
    dsaSolved: 645,
  };
}
