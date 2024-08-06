import path from "path";
import { loadFile } from "./fs";
import { pipe } from "@/website/utils/helpers";
import { SupportedLocales } from "@/types";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, TRANSLATIONS } from "@/constants";

export function translate(locale: SupportedLocales, key: string): string {
  const result = (TRANSLATIONS[locale] && TRANSLATIONS[locale][key]) || TRANSLATIONS[DEFAULT_LOCALE][key];

  if (!result) throw new Error(`Missing message for key "${key}"`);

  return result;
}

export function getFileNameByLocale(name: string, locale: string, ext: string) {
  if (locale === DEFAULT_LOCALE) return `${name}.${ext}`;

  return `${name}.${locale}.${ext}`;
}

export async function getLocaleVariations<T = string>(filepath: string, fns: ((s: string) => T)[]) {
  const { ext, dir, name } = path.parse(filepath);
  const data: Record<string, T> = {};

  for (const locale of SUPPORTED_LOCALES) {
    const file = pipe((await loadFile(path.join(dir, `${name}.${locale}${ext}`))) || "", ...fns);

    if (file) data[locale] = file;
  }

  if (!data[DEFAULT_LOCALE]) {
    // default version
    const file = pipe((await loadFile(filepath)) || "", ...fns);
    if (file) data[DEFAULT_LOCALE] = file;
  }

  return data;
}
