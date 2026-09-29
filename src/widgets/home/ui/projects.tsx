import { useTranslations } from "next-intl";

import { ProjectCard, projects } from "@/entities/project";
import { Container } from "@/shared/ui/container";
import { Heading } from "@/shared/ui/heading";
import { Reveal } from "@/shared/ui/reveal";
import { Section } from "@/shared/ui/section";

export function Projects() {
  const t = useTranslations("projects");

  return (
    <Section id="projects">
      <Container>
        <Heading eyebrow={t("eyebrow")}>{t("title")}</Heading>
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <Reveal key={project.slug}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
