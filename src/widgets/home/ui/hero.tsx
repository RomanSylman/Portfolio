import { useTranslations } from "next-intl";

import { DownloadCv } from "@/features/download-cv";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import { Reveal } from "@/shared/ui/reveal";
import { RevealText } from "@/shared/ui/reveal-text";
import { Section } from "@/shared/ui/section";

import { sceneCopyClass } from "../lib/scene-copy";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <Section id="hero">
      <Container>
        <div className={sceneCopyClass}>
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
            className="text-foreground text-[clamp(1.75rem,calc(100cqi*0.14),3rem)] leading-none font-semibold tracking-tight whitespace-nowrap sm:text-6xl"
          >
            {t("title")}
          </RevealText>
          <RevealText
            as="p"
            trigger="intro"
            className="text-muted mt-6 text-lg leading-relaxed"
          >
            {t("subtitle")}
          </RevealText>
          <Reveal trigger="intro" className="mt-10">
            <div className="flex flex-wrap gap-4">
              <Button href="#contact">{t("ctaContact")}</Button>
              <DownloadCv label={t("ctaCv")} />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
