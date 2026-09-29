import { useTranslations } from "next-intl";

import { Link } from "@/shared/i18n";
import { DistortionImage } from "@/shared/ui/distortion-image";

import type { Project } from "../model/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations("projects");
  const title = t(`items.${project.slug}.title`);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group border-line hover:border-accent focus-visible:outline-accent flex flex-col overflow-hidden rounded-2xl border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <DistortionImage src={project.image} alt={title} />
      </div>
      <div className="bg-surface/60 flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-foreground text-lg font-semibold">{title}</h3>
          <span className="text-muted shrink-0 text-sm">
            {t(`items.${project.slug}.period`)}
          </span>
        </div>
        <p className="text-muted text-sm leading-relaxed">
          {t(`items.${project.slug}.summary`)}
        </p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.stack.map((item) => (
            <li
              key={item}
              className="border-line text-muted rounded-full border px-3 py-1 text-xs"
            >
              {item}
            </li>
          ))}
        </ul>
        <span className="text-accent text-sm font-medium group-hover:underline">
          {t("viewCase")}
        </span>
      </div>
    </Link>
  );
}
