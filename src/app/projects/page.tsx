import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectList } from "@/components/projects/project-list";
import { ProjectListSkeleton } from "@/components/projects/project-list-skeleton";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { getIdentity, getProjects } from "@/db/queries";
import type { Project } from "@/types/content";

export async function generateMetadata(): Promise<Metadata> {
  const identity = await getIdentity();
  return {
    title: `Projects — ${identity.name}`,
    description:
      "Storage engines, servers, and systems: StrataDB, Axiom, TicketLedger, and the rest of the shelf.",
  };
}

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
