import { useTranslations } from "next-intl";

import { experience } from "@/entities/profile";
import { Container } from "@/shared/ui/container";
import { Heading } from "@/shared/ui/heading";
import { Reveal } from "@/shared/ui/reveal";
import { Section } from "@/shared/ui/section";

function readList(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

export function Experience() {
  const t = useTranslations("experience");

  return (
    <Section id="experience">
      <Container>
        <Heading eyebrow={t("eyebrow")}>{t("title")}</Heading>
        <ol className="border-line relative flex flex-col gap-12 border-l pl-8">
          {experience.map((entry) => {
            const highlights = readList(t.raw(`items.${entry.id}.highlights`));

            return (
              <li key={entry.id}>
                <Reveal className="relative">
                  <span className="border-accent bg-background absolute top-1.5 -left-[39px] size-3 rounded-full border-2" />
                  {entry.period && (
                    <p className="text-muted text-sm">
                      {entry.period.start} — {entry.period.end ?? t("present")}
                    </p>
                  )}
                  <h3
                    className={`text-foreground text-xl font-semibold ${entry.period ? "mt-1" : ""}`}
                  >
                    {t(`items.${entry.id}.role`)}
                  </h3>
                  <p className="text-accent">{entry.company}</p>
                  {highlights.length > 0 && (
                    <ul className="mt-3 flex flex-col gap-1">
                      {highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="text-muted text-sm leading-relaxed"
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
