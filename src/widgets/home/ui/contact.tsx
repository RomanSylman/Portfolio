import { useTranslations } from "next-intl";

import { DownloadCv } from "@/features/download-cv";
import { socialLinks } from "@/shared/config";
import { Container } from "@/shared/ui/container";
import { Heading } from "@/shared/ui/heading";
import { Reveal } from "@/shared/ui/reveal";
import { Section } from "@/shared/ui/section";

import { sceneCopyClass } from "../lib/scene-copy";

const channels = [
  { key: "email", href: socialLinks.email, label: "Email" },
  { key: "telegram", href: socialLinks.telegram, label: "Telegram" },
  { key: "github", href: socialLinks.github, label: "GitHub" },
] as const;

export function Contact() {
  const t = useTranslations("contact");

  return (
    <Section id="contact">
      <Container>
        <div className={sceneCopyClass}>
          <Heading eyebrow={t("eyebrow")}>{t("title")}</Heading>
          <Reveal>
            <p className="text-muted text-lg leading-relaxed">{t("body")}</p>
          </Reveal>
          <ul className="mt-8 flex flex-wrap gap-6">
            {channels.map((channel) => (
              <li key={channel.key}>
                <a
                  href={channel.href}
                  target={channel.key === "email" ? undefined : "_blank"}
                  rel={channel.key === "email" ? undefined : "noreferrer"}
                  className="text-foreground decoration-line hover:text-accent hover:decoration-accent underline underline-offset-4 transition-colors"
                >
                  {channel.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <DownloadCv label={t("ctaCv")} variant="primary" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
