import { useTranslations } from "next-intl";

import { projects } from "@/entities/project";
import { Container } from "@/shared/ui/container";
import { Heading } from "@/shared/ui/heading";
import { Reveal } from "@/shared/ui/reveal";
import { Section } from "@/shared/ui/section";

import { sceneCopyClass } from "../lib/scene-copy";
import { ProjectCardLink } from "./project-card-link";

export function Projects() {
  const t = useTranslations("projects");

  return (
    <Section id="projects">
      <Container>
        <Heading className={sceneCopyClass} eyebrow={t("eyebrow")}>
          {t("title")}
        </Heading>
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <Reveal key={project.slug}>
              <ProjectCardLink project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
