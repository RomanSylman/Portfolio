import { notFound } from "next/navigation";
import { locale as getLocaleParam } from "next/root-params";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { type Locale, routing } from "./routing";

const messagesByLocale = {
  uk: () => import("../../../messages/uk.json"),
  en: () => import("../../../messages/en.json"),
} satisfies Record<Locale, () => Promise<{ default: unknown }>>;

export default getRequestConfig(async () => {
  const paramValue = await getLocaleParam();

  if (!hasLocale(routing.locales, paramValue)) {
    notFound();
  }

  return {
    locale: paramValue,
    messages: (await messagesByLocale[paramValue]()).default,
  };
});
