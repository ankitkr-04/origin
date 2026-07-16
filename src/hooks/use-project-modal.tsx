import { useCallback, useState } from "react";
import { ProjectDetail } from "@/components/projects/project-detail";
import { ProjectModal } from "@/components/projects/project-modal";
import type { Project } from "@/types/content";

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
