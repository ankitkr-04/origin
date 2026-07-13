"use server";

import { getIdentity } from "@/db/identity";
import { getExperiences, getSkills } from "@/db/profile";
import { getProjects } from "@/db/projects";

export async function execWhoami() {
  const identity = await getIdentity();
  return `${identity.name} - ${identity.headline}\n${identity.location}\n\n${identity.positioning}`;
}

export async function execCatAbout() {
  const identity = await getIdentity();
  return `NAME\n  ${identity.name}\n\nDESCRIPTION\n  ${identity.positioning}\n\n[System] Type \`go about\` to view the full page.`;
}

export async function execLsProjects() {
  const projects = await getProjects();
  const flagships = projects.filter((p) => p.tier === "flagship");
  const notables = projects.filter((p) => p.tier === "notable");

  let out = "flagship/\n";
  flagships.forEach((p) => {
    out += `  ${p.slug}/  - ${p.name}\n`;
  });

  out += "\nnotable/\n";
  notables.forEach((p) => {
    out += `  ${p.slug}/  - ${p.name}\n`;
  });

  return out.trim();
}

export async function execGrep(term: string) {
  if (!term || term.trim() === "") return "grep: missing operand";

  const query = term.toLowerCase();
  const [projects, skills, experiences] = await Promise.all([
    getProjects(),
    getSkills(),
    getExperiences(),
  ]);

  const hits: string[] = [];

  projects.forEach((p) => {
    if (
      p.name.toLowerCase().includes(query) ||
      p.summary.toLowerCase().includes(query) ||
      p.stack.toLowerCase().includes(query)
    ) {
      hits.push(`projects/${p.slug}: ${p.summary.substring(0, 80)}...`);
    }
  });

  skills.forEach((s) => {
    if (
      s.name.toLowerCase().includes(query) ||
      s.category.toLowerCase().includes(query)
    ) {
      hits.push(`skills/${s.category.toLowerCase()}: ${s.name}`);
    }
  });

  experiences.forEach((e) => {
    if (
      e.company.toLowerCase().includes(query) ||
      e.role.toLowerCase().includes(query) ||
      e.summary.toLowerCase().includes(query)
    ) {
      hits.push(
        `experience/${e.company.toLowerCase()}: ${e.role} - ${e.summary.substring(0, 60)}...`,
      );
    }
  });

  if (hits.length === 0) return "";
  return hits.join("\n");
}
