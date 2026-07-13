import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { ProjectList } from "@/components/projects/project-list";
import { ProjectListSkeleton } from "@/components/projects/project-list-skeleton";
import { getIdentity } from "@/db/identity";
import { getProjects } from "@/db/projects";
import type { Project } from "@/types/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Storage engines, servers, and systems: StrataDB, Axiom, TicketLedger, and the rest of the shelf.",
};

export default async function ProjectsPage() {
  const projectsPromise = getProjects();
  const identity = await getIdentity();
  return (
    <>
      <SiteNav githubUrl={identity.githubUrl} />
      <Suspense fallback={<ProjectListSkeleton />}>
        <ProjectsListContainer projectsPromise={projectsPromise} />
      </Suspense>
      <SiteFooter />
    </>
  );
}

async function ProjectsListContainer({
  projectsPromise,
}: {
  projectsPromise: Promise<Project[]>;
}) {
  const projects = await projectsPromise;
  return <ProjectList projects={projects} />;
}
