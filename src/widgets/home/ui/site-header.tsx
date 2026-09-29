"use client";

import { useLocale, useTranslations } from "next-intl";

import { profile } from "@/entities/profile";
import { type Locale, usePathname, useRouter } from "@/shared/i18n";
import { cn } from "@/shared/lib/cn";

const links = ["about", "skills", "experience", "projects", "contact"] as const;

const localeOptions: { locale: Locale; label: string }[] = [
  { locale: "uk", label: "UA" },
  { locale: "en", label: "EN" },
];

export function SiteHeader() {
  const t = useTranslations("nav");
  const localeLabel = useTranslations("locale");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="fixed inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="#hero"
          className="text-foreground text-sm font-semibold tracking-wide"
        >
          {profile.name}
        </a>
        <nav aria-label="Main">
          <ul className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <li key={link}>
                <a
                  href={`#${link}`}
                  className="text-muted hover:text-foreground text-sm transition-colors"
                >
                  {t(link)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div
          role="group"
          aria-label={localeLabel("switchTo")}
          className="border-line flex rounded-full border p-1"
        >
          {localeOptions.map((option) => {
            const active = option.locale === locale;
            return (
              <button
                key={option.locale}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  router.replace(pathname, { locale: option.locale });
                }}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                  active
                    ? "bg-accent text-background"
                    : "text-muted hover:text-foreground",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
