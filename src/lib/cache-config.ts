/** Shared cache tags and lifetimes for DB-backed reads. */

export const CACHE_TAGS = {
  projects: "projects",
  profile: "profile",
  resume: "resume",
  github: "github",
  githubContributions: "githubContributions",
  coding: "coding",
} as const;

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];

const DAY = 60 * 60 * 24;

/** Portfolio content is write-once and rarely changes — cache it for weeks. */
export const CONTENT_CACHE_LIFE = {
  stale: DAY,
  revalidate: DAY * 15,
  expire: DAY * 30,
} as const;
/** Live stats are fetched on every day, so we cache them for short durations. */
export const LIVE_STATS_CACHE_LIFE = {
  stale: DAY,
  revalidate: DAY * 2,
  expire: DAY * 7,
} as const;
