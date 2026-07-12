import { asc } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/db";
import {
  achievementStats,
  achievements,
  certifications,
  educations,
  experiences,
} from "@/db/schema";
import { CACHE_TAGS, CONTENT_CACHE_LIFE } from "@/lib/cache-config";
import type { Achievement, Experience } from "@/types/content";

export async function getAchievements(): Promise<Achievement[]> {
  "use cache";
  cacheTag(CACHE_TAGS.profile);
  cacheLife(CONTENT_CACHE_LIFE);
  const rows = await db
    .select()
    .from(achievements)
    .orderBy(asc(achievements.sortOrder));
  return rows.map((row) => ({
    value: row.value,
    context: row.context,
    note: row.note,
  }));
}

export async function getExperiences(): Promise<Experience[]> {
  "use cache";
  cacheTag(CACHE_TAGS.profile);
  cacheLife(CONTENT_CACHE_LIFE);
  const rows = await db
    .select()
    .from(experiences)
    .orderBy(asc(experiences.sortOrder));
  return rows.map((row) => ({
    company: row.company,
    role: row.role,
    period: row.period,
    summary: row.summary,
    highlights: row.highlights,
  }));
}

export async function getCertifications(): Promise<string[]> {
  "use cache";
  cacheTag(CACHE_TAGS.profile);
  cacheLife(CONTENT_CACHE_LIFE);
  const rows = await db
    .select()
    .from(certifications)
    .orderBy(asc(certifications.sortOrder));
  return rows.map((row) => row.title);
}

export async function getEducation(): Promise<
  import("@/types/content").Education
> {
  "use cache";
  cacheTag(CACHE_TAGS.profile);
  cacheLife(CONTENT_CACHE_LIFE);
  const [row] = await db
    .select()
    .from(educations)
    .orderBy(asc(educations.sortOrder))
    .limit(1);
  return {
    degree: row.degree,
    institution: row.institution,
    period: row.period,
    cgpa: row.cgpa,
  };
}

export async function getAchievementStats(): Promise<
  import("@/types/content").AchievementStat[]
> {
  "use cache";
  cacheTag(CACHE_TAGS.profile);
  cacheLife(CONTENT_CACHE_LIFE);
  const rows = await db
    .select()
    .from(achievementStats)
    .orderBy(asc(achievementStats.sortOrder));
  return rows.map((row) => ({
    value: row.value,
    label: row.label,
    detail: row.detail ?? undefined,
  }));
}
