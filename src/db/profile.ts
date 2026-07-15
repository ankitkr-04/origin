import { asc } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/db";
import {
  achievementStats,
  achievements,
  certifications,
  educations,
  experiences,
  skills,
} from "@/db/schema";
import { CACHE_TAGS, CONTENT_CACHE_LIFE } from "@/lib/cache-config";
import type { Achievement, Experience } from "@/types/content";
import { getIdentity } from "@/db/identity";
import { getCodeforcesUserInfo } from "@/lib/api/codeforces";

export async function getAchievements(): Promise<Achievement[]> {
  "use cache";
  cacheTag(CACHE_TAGS.profile);
  cacheLife(CONTENT_CACHE_LIFE);
  const rows = await db
    .select()
    .from(achievements)
    .orderBy(asc(achievements.sortOrder));
  const results = rows.map((row) => ({
    value: row.value,
    context: row.context,
    note: row.note,
  }));

  const cfIndex = results.findIndex((a) =>
    a.context.toLowerCase().includes("codeforces"),
  );
  if (cfIndex !== -1) {
    try {
      const identity = await getIdentity();
      const cfInfo = await getCodeforcesUserInfo(identity.codeforcesHandle);
      if (cfInfo.rating > 0) {
        const rank = cfInfo.rank.charAt(0).toUpperCase() + cfInfo.rank.slice(1);
        results[cfIndex].value = `${rank} · ${cfInfo.rating}`;
      }
    } catch (e) {
      // Fallback to database value
    }
  }

  return results;
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
  const results = rows.map((row) => ({
    value: row.value,
    label: row.label,
    detail: row.detail ?? undefined,
  }));

  const cfIndex = results.findIndex((s) =>
    s.label.toLowerCase().includes("codeforces"),
  );
  if (cfIndex !== -1) {
    try {
      const identity = await getIdentity();
      const cfInfo = await getCodeforcesUserInfo(identity.codeforcesHandle);
      if (cfInfo.rating > 0) {
        const rank = cfInfo.rank.charAt(0).toUpperCase() + cfInfo.rank.slice(1);
        results[cfIndex].label = `Codeforces ${rank}`;
        results[cfIndex].value = cfInfo.rating.toString();
      }
    } catch (e) {
      // Fallback to database value
    }
  }

  return results;
}

export async function getSkills() {
  "use cache";
  cacheTag(CACHE_TAGS.profile);
  cacheLife(CONTENT_CACHE_LIFE);
  return db.select().from(skills).orderBy(asc(skills.sortOrder));
}
