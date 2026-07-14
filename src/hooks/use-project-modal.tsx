import { useState, useCallback } from "react";
import type { Project } from "@/types/content";
import { ProjectModal } from "@/components/projects/project-modal";
import { ProjectDetail } from "@/components/projects/project-detail";

export function useProjectModal() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const close = useCallback(() => setActiveProject(null), []);

  const modal = (
    <ProjectModal project={activeProject} onClose={close}>
      {activeProject ? <ProjectDetail project={activeProject} /> : null}
    </ProjectModal>
  );

  return {
    setActiveProject,
    modal,
  };
}
