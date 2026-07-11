import type { Metadata } from "next";
import { ProjectList } from "@/components/projects/project-list";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { getProjects } from "@/db/queries";

export const metadata: Metadata = {
  title: "Projects — Ankit Kumar",
  description:
    "Storage engines, servers, and systems: StrataDB, Axiom, TicketLedger, and the rest of the shelf.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <SiteNav />
      <ProjectList projects={projects} />
      <SiteFooter />
    </>
  );
}
