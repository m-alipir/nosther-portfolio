import { dictionaries } from "@/content/dictionaries";
import type { Locale } from "@/content/types";

export const locales: Locale[] = ["en", "tr"];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
