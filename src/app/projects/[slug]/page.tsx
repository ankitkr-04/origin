import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { ProjectDetail } from "@/components/projects/project-detail";
import { getIdentity } from "@/db/identity";
import { getProject, getProjects } from "@/db/projects";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, identity] = await Promise.all([
    getProject(slug),
    getIdentity(),
  ]);
  if (!project) notFound();

  return (
    <>
      <SiteNav githubUrl={identity.githubUrl} />
      <main className="pt-14">
        <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
          <Link
            href="/projects"
            transitionTypes={["nav"]}
            className="font-mono text-xs tracking-[0.2em] text-mist uppercase transition-colors hover:text-ember"
          >
            ← All projects
          </Link>
          <div className="mt-8">
            <ProjectDetail project={project} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
