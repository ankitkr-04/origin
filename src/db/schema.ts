import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import type { ProjectStatus, ProjectTier } from "@/types/content";

const createdAt = () =>
  timestamp("created_at", { withTimezone: true }).defaultNow().notNull();
const updatedAt = () =>
  timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull();

/**
 * Portfolio projects — one row per case study. `slug` is the natural key and
 * the public URL segment (/projects/[slug]).
 */
export const projects = pgTable(
  "projects",
  {
    slug: varchar("slug", { length: 64 }).primaryKey(),
    name: text("name").notNull(),
    /** Display tier: flagship rows get the wide editorial layout */
    tier: varchar("tier", { length: 16 }).$type<ProjectTier>().notNull(),
    status: varchar("status", { length: 16 }).$type<ProjectStatus>().notNull(),
    year: varchar("year", { length: 8 }).notNull(),
    stack: text("stack").notNull(),
    tagline: text("tagline").notNull(),
    summary: text("summary").notNull(),
    /** Long-form case-study paragraphs, in reading order */
    story: text("story").array().notNull(),
    highlights: text("highlights").array().notNull(),
    /** Verified figures rendered as mono data chips */
    metrics: text("metrics").array().notNull(),
    repoUrl: text("repo_url").notNull(),
    demoUrl: text("demo_url"),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [index("projects_tier_sort_idx").on(t.tier, t.sortOrder)],
);

export const achievements = pgTable("achievements", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  value: text("value").notNull(),
  context: text("context").notNull(),
  note: text("note").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const experiences = pgTable("experiences", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  company: text("company").notNull(),
  role: text("role").notNull(),
  period: text("period").notNull(),
  summary: text("summary").notNull(),
  highlights: text("highlights").array().notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const certifications = pgTable("certifications", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export type ProjectRow = typeof projects.$inferSelect;
export type AchievementRow = typeof achievements.$inferSelect;
export type ExperienceRow = typeof experiences.$inferSelect;
export type CertificationRow = typeof certifications.$inferSelect;

export const identity = pgTable("identity", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  headline: text("headline").notNull(),
  headlineParts: text("headline_parts").array().notNull(),
  positioning: text("positioning").notNull(),
  location: text("location").notNull(),
  email: text("email").notNull(),
  githubUrl: text("github_url").notNull(),
  aboutNarrative: text("about_narrative").array().notNull(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const socialLinks = pgTable("social_links", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  label: text("label").notNull(),
  href: text("href").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const educations = pgTable("educations", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  degree: text("degree").notNull(),
  institution: text("institution").notNull(),
  period: text("period").notNull(),
  cgpa: text("cgpa").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const achievementStats = pgTable("achievement_stats", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  value: text("value").notNull(),
  label: text("label").notNull(),
  detail: text("detail"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export type IdentityRow = typeof identity.$inferSelect;
export type SocialLinkRow = typeof socialLinks.$inferSelect;
export type EducationRow = typeof educations.$inferSelect;
export type AchievementStatRow = typeof achievementStats.$inferSelect;

export const resumes = pgTable(
  "resumes",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    label: text("label").notNull(),
    fileUrl: text("file_url").notNull(),
    focusAreas: text("focus_areas").array().notNull(),
    isPublic: boolean("is_public").notNull().default(true),
    isCurrent: boolean("is_current").notNull().default(false),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [
    uniqueIndex("resumes_one_current_idx")
      .on(t.isCurrent)
      .where(sql`${t.isCurrent} = true`),
  ],
);

export type ResumeRow = typeof resumes.$inferSelect;
