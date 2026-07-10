import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProjectDetail } from "@/components/projects/project-detail";
import { ProjectModal } from "@/components/projects/project-modal";
import { getProject } from "@/db/queries";

async function ModalContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <ProjectModal>
      <ProjectDetail project={project} />
    </ProjectModal>
  );
}

export default function InterceptedProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // cacheComponents: params is request-time data, so it must resolve inside
  // a Suspense boundary; the modal simply doesn't render until it's ready.
  return (
    <Suspense fallback={null}>
      <ModalContent params={params} />
    </Suspense>
  );
}
