/** Shared view models for portfolio content. */

export type ProjectStatus = "active" | "stable";

export interface FeaturedProject {
  /** Zero-padded index used by the numbered-doc section styling. */
  id: string;
  name: string;
  stack: string;
  tagline: string;
  description: string;
  highlights: string[];
  /** Short verified figures rendered as mono data chips. */
  metrics: string[];
  repoUrl: string;
  status: ProjectStatus;
}

export interface SecondaryProject {
  name: string;
  stack: string;
  description: string;
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

export interface ProofItem {
  value: string;
  label: string;
  detail?: string;
}

export interface SocialLink {
  label: string;
  href: string;
}
