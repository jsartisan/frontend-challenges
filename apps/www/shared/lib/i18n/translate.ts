import { DEFAULT_LOCALE, TRANSLATIONS, type SupportedLocales } from "~/shared/config/locale";

export function translate(locale: SupportedLocales, key: string): string {
  const result = (TRANSLATIONS[locale] && TRANSLATIONS[locale][key]) || TRANSLATIONS[DEFAULT_LOCALE][key];

  if (!result) throw new Error(`Missing message for key "${key}"`);

  return result;
}
