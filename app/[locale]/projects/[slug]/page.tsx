import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getProjectCase,
  getProjectParams,
  ProjectCasePage,
} from "@/pages/project-case";
import { type Locale, routing } from "@/shared/i18n";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return getProjectParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();

  const { metadata } = await getProjectCase(slug, locale as Locale);
  return { title: metadata.title, description: metadata.role };
}

export default async function Page({ params }: PageProps) {
  const { locale, slug } = await params;

  return <ProjectCasePage slug={slug} locale={locale as Locale} />;
}
