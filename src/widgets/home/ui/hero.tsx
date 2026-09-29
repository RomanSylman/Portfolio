import { useTranslations } from "next-intl";

import { DownloadCv } from "@/features/download-cv";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import { Reveal } from "@/shared/ui/reveal";
import { RevealText } from "@/shared/ui/reveal-text";
import { Section } from "@/shared/ui/section";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <Section id="hero">
      <Container>
        <RevealText
          as="p"
          trigger="intro"
          className="text-accent mb-4 text-sm font-medium tracking-[0.2em] uppercase"
        >
          {t("eyebrow")}
        </RevealText>
        <RevealText
          as="h1"
          trigger="intro"
          className="text-foreground max-w-4xl text-5xl font-semibold tracking-tight sm:text-7xl"
        >
          {t("title")}
        </RevealText>
        <RevealText
          as="p"
          trigger="intro"
          className="text-muted mt-6 max-w-xl text-lg leading-relaxed"
        >
          {t("subtitle")}
        </RevealText>
        <Reveal trigger="intro" className="mt-10">
          <div className="flex flex-wrap gap-4">
            <Button href="#contact">{t("ctaContact")}</Button>
            <DownloadCv label={t("ctaCv")} />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
