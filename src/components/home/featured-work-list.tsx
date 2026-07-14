"use client";

import { ProjectCase } from "@/components/projects/project-case";
import { useProjectModal } from "@/hooks/use-project-modal";
import type { Project } from "@/types/content";

export function FeaturedWorkList({
  flagshipProjects,
}: {
  flagshipProjects: Project[];
}) {
  const { setActiveProject, modal } = useProjectModal();

  return (
    <>
      <div>
        {flagshipProjects.map((project, i) => (
          <ProjectCase
            key={project.slug}
            project={project}
            index={i}
            onSelect={setActiveProject}
          />
        ))}
      </div>

      {modal}
    </>
  );
}
