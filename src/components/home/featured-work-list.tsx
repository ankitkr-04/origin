"use client";

import { useState } from "react";
import { ProjectCase } from "@/components/projects/project-case";
import { ProjectDetail } from "@/components/projects/project-detail";
import { ProjectModal } from "@/components/projects/project-modal";
import type { Project } from "@/types/content";

export function FeaturedWorkList({
  flagshipProjects,
}: {
  flagshipProjects: Project[];
}) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

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

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      >
        {activeProject ? <ProjectDetail project={activeProject} /> : null}
      </ProjectModal>
    </>
  );
}
