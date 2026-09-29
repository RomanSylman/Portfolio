import { useTranslations } from "next-intl";

import { type SkillLevel, skillLevels, skills } from "@/entities/profile";
import { cn } from "@/shared/lib/cn";
import { Container } from "@/shared/ui/container";
import { Heading } from "@/shared/ui/heading";
import { Reveal } from "@/shared/ui/reveal";
import { Section } from "@/shared/ui/section";

export function Skills() {
  const t = useTranslations("skills");

  const grouped = skillLevels
    .map((level) => ({
      level,
      items: skills.filter((skill) => skill.level === level),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <Section id="skills">
      <Container>
        <Heading eyebrow={t("eyebrow")}>{t("title")}</Heading>
        <div className="flex max-w-3xl flex-col gap-8">
          {grouped.map(({ level, items }) => (
            <Reveal key={level}>
              <SkillGroup level={level} label={t(`groups.${level}`)}>
                {items.map((skill) => skill.name)}
              </SkillGroup>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

interface SkillGroupProps {
  level: SkillLevel;
  label: string;
  children: string[];
}

function SkillGroup({ level, label, children }: SkillGroupProps) {
  return (
    <div>
      <h3 className="text-accent mb-4 text-sm font-medium tracking-widest uppercase">
        {label}
      </h3>
      <ul className="flex flex-wrap gap-2">
        {children.map((name) => (
          <li
            key={`${level}-${name}`}
            className={cn(
              "rounded-full border px-3 py-1 text-sm",
              level === "daily"
                ? "text-foreground border-accent/40"
                : "text-muted border-line",
            )}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
