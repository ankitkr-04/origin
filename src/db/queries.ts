import { asc, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/db";
import {
  achievements,
  certifications,
  experiences,
  type ProjectRow,
  projects,
} from "@/db/schema";
import { CACHE_TAGS, CONTENT_CACHE_LIFE } from "@/lib/cache-config";
import type { Achievement, Experience, Project } from "@/types/content";

/** Map DB rows to view models — DB shapes never reach the UI directly. */
function toProject(row: ProjectRow): Project {
  return {
    slug: row.slug,
    name: row.name,
    tier: row.tier,
    status: row.status,
    year: row.year,
    stack: row.stack,
    tagline: row.tagline,
    summary: row.summary,
    story: row.story,
    highlights: row.highlights,
    metrics: row.metrics,
    repoUrl: row.repoUrl,
    demoUrl: row.demoUrl ?? undefined,
  };
}

export async function getProjects(): Promise<Project[]> {
  "use cache";
  cacheTag(CACHE_TAGS.projects);
  cacheLife(CONTENT_CACHE_LIFE);
  const rows = await db
    .select()
    .from(projects)
    .orderBy(asc(projects.sortOrder));
  return rows.map(toProject);
}

export async function getProject(slug: string): Promise<Project | undefined> {
  "use cache";
  cacheTag(CACHE_TAGS.projects);
  cacheLife(CONTENT_CACHE_LIFE);
  const [row] = await db
    .select()
    .from(projects)
    .where(eq(projects.slug, slug))
    .limit(1);
  return row ? toProject(row) : undefined;
}

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
