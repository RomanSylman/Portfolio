import { useTranslations } from "next-intl";

import { Container } from "@/shared/ui/container";
import { Heading } from "@/shared/ui/heading";
import { Reveal } from "@/shared/ui/reveal";
import { Section } from "@/shared/ui/section";

function readList(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

export function About() {
  const t = useTranslations("about");
  const paragraphs = readList(t.raw("paragraphs"));

  return (
    <Section id="about">
      <Container>
        <Heading eyebrow={t("eyebrow")}>{t("title")}</Heading>
        <Reveal>
          <div className="flex max-w-2xl flex-col gap-4">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-muted text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
