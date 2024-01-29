import path from "path";
import { loadFile } from "./fs";
import { pipe } from "./helpers";

export const DEFAULT_LOCALE = "en";
export const SUPPORTED_LOCALES = ["en"] as const;

export const messages = {
  en: require("../locales/en.json"),
};

export type SupportedLocale = keyof typeof messages;

/**
 * return translated message from locale by key
 *
 * @param locale
 * @param key
 * @returns
 */
export function translate(locale: SupportedLocale, key: string): string {
  const result = (messages[locale] && messages[locale][key]) || messages[DEFAULT_LOCALE][key];

  if (!result) throw new Error(`Missing message for key "${key}"`);

  return result;
}

/**
 * return filename with locale
 *
 * @param name
 * @param locale
 * @param ext
 * @returns
 */
export function getFileNameByLocale(name: string, locale: string, ext: string) {
  if (locale === DEFAULT_LOCALE) return `${name}.${ext}`;

  return `${name}.${locale}.${ext}`;
}

/**
 * parse files and group by locale
 *
 * @param filepath
 * @param preprocessor
 * @returns
 */
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
