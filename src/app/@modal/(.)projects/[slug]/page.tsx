import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/projects/project-detail";
import { ProjectModal } from "@/components/projects/project-modal";
import { getProject } from "@/lib/projects";

export default async function InterceptedProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <ProjectModal>
      <ProjectDetail project={project} />
    </ProjectModal>
  );
}
