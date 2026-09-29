import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { HomePage } from "@/pages/home";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function Page() {
  return <HomePage />;
}
