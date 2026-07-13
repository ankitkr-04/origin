import { desc, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/db";
import { resumes } from "@/db/schema";
import { CACHE_TAGS, CONTENT_CACHE_LIFE } from "@/lib/cache-config";

export async function getCurrentResume() {
  "use cache";
  cacheTag(CACHE_TAGS.resume);
  cacheLife(CONTENT_CACHE_LIFE);

  const [current] = await db
    .select()
    .from(resumes)
    .where(eq(resumes.isCurrent, true))
    .limit(1);

  if (current) return current;

  const [latestPublic] = await db
    .select()
    .from(resumes)
    .where(eq(resumes.isPublic, true))
    .orderBy(desc(resumes.createdAt))
    .limit(1);

  return latestPublic || null;
}

export async function getResumes() {
  "use cache";
  cacheTag(CACHE_TAGS.resume);
  cacheLife(CONTENT_CACHE_LIFE);

  return db
    .select()
    .from(resumes)
    .where(eq(resumes.isPublic, true))
    .orderBy(desc(resumes.createdAt));
}
