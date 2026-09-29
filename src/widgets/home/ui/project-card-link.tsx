"use client";

import { type Project, ProjectCard } from "@/entities/project";
import { useOpenProject } from "@/features/open-project";

interface ProjectCardLinkProps {
  project: Project;
}

export function ProjectCardLink({ project }: ProjectCardLinkProps) {
  const onOpen = useOpenProject(`/projects/${project.slug}`);

  return <ProjectCard onOpen={onOpen} project={project} />;
}
