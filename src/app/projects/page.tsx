import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectList } from "@/components/projects/project-list";
import { ProjectListSkeleton } from "@/components/projects/project-list-skeleton";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { getProjects } from "@/db/queries";

export const metadata: Metadata = {
  title: "Projects — Ankit Kumar",
  description:
    "Storage engines, servers, and systems: StrataDB, Axiom, TicketLedger, and the rest of the shelf.",
};

export default function ProjectsPage() {
  return (
    <>
      <SiteNav />
      <Suspense fallback={<ProjectListSkeleton />}>
        <ProjectsListContainer />
      </Suspense>
      <SiteFooter />
    </>
  );
}

async function ProjectsListContainer() {
  const projects = await getProjects();
  return <ProjectList projects={projects} />;
}
