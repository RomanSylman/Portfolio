"use client";

import { useLocale } from "next-intl";

import { cvPathByLocale } from "@/shared/config";
import { type Locale } from "@/shared/i18n";
import { Button } from "@/shared/ui/button";

interface DownloadCvProps {
  label: string;
  variant?: "primary" | "ghost";
}

export function DownloadCv({ label, variant = "ghost" }: DownloadCvProps) {
  const locale = useLocale() as Locale;

  return (
    <Button href={cvPathByLocale[locale]} download variant={variant}>
      {label}
    </Button>
  );
}
