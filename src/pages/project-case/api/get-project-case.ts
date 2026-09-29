import { readFileSync } from "node:fs";
import path from "node:path";

import { evaluate } from "@mdx-js/mdx";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import * as runtime from "react/jsx-runtime";

import { projects } from "@/entities/project";
import { type Locale, locales } from "@/shared/i18n";

export interface CaseMetadata {
  title: string;
  role: string;
  stack: string[];
  period: string;
  demo?: string;
  source?: string;
}

export interface ProjectCase {
  Content: ComponentType;
  metadata: CaseMetadata;
}

interface CaseModule {
  default: ComponentType;
  metadata: CaseMetadata;
}

export function getProjectSlugs() {
  return projects.map((project) => project.slug);
}

export function getProjectParams() {
  return getProjectSlugs().flatMap((slug) =>
    locales.map((locale) => ({ locale, slug })),
  );
}

export async function getProjectCase(
  slug: string,
  locale: Locale,
): Promise<ProjectCase> {
  const known = projects.some((project) => project.slug === slug);
  if (!known) notFound();

  const filePath = path.join(
    process.cwd(),
    "content",
    "projects",
    slug,
    `${locale}.mdx`,
  );

  const source = readFileSync(filePath, "utf8");
  const caseModule = (await evaluate(source, runtime)) as unknown as CaseModule;

  return { Content: caseModule.default, metadata: caseModule.metadata };
}
