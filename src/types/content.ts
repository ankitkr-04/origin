/** Shared view models for portfolio content. */

export type ProjectTier = "flagship" | "notable" | "archive";
export type ProjectStatus = "active" | "stable";

export interface Project {
  slug: string;
  name: string;
  tier: ProjectTier;
  status: ProjectStatus;
  year: string;
  stack: string;
  tagline: string;
  /** Card-length copy. */
  summary: string;
  /** Long-form paragraphs for the detail view. */
  story: string[];
  highlights: string[];
  /** Short verified figures rendered as mono data chips. */
  metrics: string[];
  repoUrl: string;
  demoUrl?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
}

export interface AchievementStat {
  value: string;
  label: string;
  detail?: string;
}

export interface Achievement {
  value: string;
  context: string;
  note: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface Identity {
  name: string;
  headline: string;
  headlineParts: string[];
  positioning: string;
  location: string;
  email: string;
  githubUrl: string;
  githubHandle: string;
  leetcodeHandle: string;
  codeforcesHandle: string;
  aboutNarrative: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  cgpa: string;
}

export interface SystemMetrics {
  githubCommits: number;
  dsaSolved: number;
  leetcodeSolved: number;
  codeforcesSolved: number;
}
