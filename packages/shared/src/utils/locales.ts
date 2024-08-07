import { SupportedLocales } from "../types";
import { DEFAULT_LOCALE, TRANSLATIONS } from "../constants";

export function translate(locale: SupportedLocales, key: string): string {
  const result = (TRANSLATIONS[locale] && TRANSLATIONS[locale][key]) || TRANSLATIONS[DEFAULT_LOCALE][key];

  if (!result) throw new Error(`Missing message for key "${key}"`);

  return result;
}

export function getFileNameByLocale(name: string, locale: string, ext: string) {
  if (locale === DEFAULT_LOCALE) return `${name}.${ext}`;

  return `${name}.${locale}.${ext}`;
}
