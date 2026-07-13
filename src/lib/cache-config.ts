/** Shared cache tags and lifetimes for DB-backed reads. */

export const CACHE_TAGS = {
  projects: "projects",
  profile: "profile",
  resume: "resume",
} as const;

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];

const DAY = 60 * 60 * 24;

/** Portfolio content is write-once and rarely changes — cache it for weeks. */
export const CONTENT_CACHE_LIFE = {
  stale: DAY,
  revalidate: DAY * 15,
  expire: DAY * 30,
} as const;
