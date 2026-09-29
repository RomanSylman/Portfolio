import { getTranslations } from "next-intl/server";

import { profile } from "@/entities/profile";
import { DownloadCv } from "@/features/download-cv";
import { Link, type Locale } from "@/shared/i18n";
import { Container } from "@/shared/ui/container";
import { SiteHeader } from "@/widgets/home";

import { getProjectCase } from "../api/get-project-case";

interface ProjectCasePageProps {
  slug: string;
  locale: Locale;
}

export async function ProjectCasePage({ slug, locale }: ProjectCasePageProps) {
  const { Content, metadata } = await getProjectCase(slug, locale);
  const t = await getTranslations({ locale, namespace: "case" });

  return (
    <>
      <SiteHeader />
      <article className="py-24">
        <Container className="max-w-3xl">
          <Link
            href="/#projects"
            className="text-muted hover:text-accent text-sm transition-colors"
          >
            ← {t("back")}
          </Link>

          <header className="mt-8">
            <p className="text-muted text-sm">{metadata.period}</p>
            <h1 className="text-foreground mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
              {metadata.title}
            </h1>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-accent text-xs tracking-widest uppercase">
                  {t("role")}
                </dt>
                <dd className="text-foreground mt-1">{metadata.role}</dd>
              </div>
              <div>
                <dt className="text-accent text-xs tracking-widest uppercase">
                  {t("stack")}
                </dt>
                <dd className="text-foreground mt-1">
                  {metadata.stack.join(", ")}
                </dd>
              </div>
            </dl>
            <div className="mt-6 flex gap-6 text-sm">
              {metadata.demo && (
                <a
                  href={metadata.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent underline underline-offset-4"
                >
                  {t("demo")}
                </a>
              )}
              {metadata.source && (
                <a
                  href={metadata.source}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent underline underline-offset-4"
                >
                  {t("source")}
                </a>
              )}
            </div>
          </header>

          <div className="prose-case text-muted [&_h2]:text-foreground [&_strong]:text-foreground mt-12 flex flex-col gap-4 [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_li]:ml-5 [&_li]:list-disc [&_li]:leading-relaxed [&_strong]:font-semibold [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2">
            <Content />
          </div>

          <footer className="border-line mt-16 flex items-center justify-between gap-4 border-t pt-8">
            <p className="text-muted text-sm">{profile.name}</p>
            <DownloadCv label={t("downloadCv")} />
          </footer>
        </Container>
      </article>
    </>
  );
}
