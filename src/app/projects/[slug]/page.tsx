import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageTransition } from "@/components/page-transition";
import { ProjectDetail } from "@/components/projects/project-detail";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — Ankit Kumar`,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <PageTransition>
      <SiteNav />
      <main className="pt-14">
        <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
          <Link
            href="/projects"
            transitionTypes={["nav"]}
            className="font-mono text-xs tracking-[0.2em] text-muted uppercase transition-colors hover:text-amber"
          >
            ← All projects
          </Link>
          <div className="mt-8">
            <ProjectDetail project={project} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </PageTransition>
  );
}
