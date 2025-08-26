import { DEFAULT_LOCALE } from "~/shared/config/locale";

export function getFileNameByLocale(name: string, locale: string, ext: string) {
  if (locale === DEFAULT_LOCALE) return `${name}.${ext}`;

  return `${name}.${locale}.${ext}`;
}
