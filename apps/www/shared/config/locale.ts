import * as en from "../../../../locales/en.json";

export const TRANSLATIONS = {
  en,
} as const;

export const DEFAULT_LOCALE = "en";
export const SUPPORTED_LOCALES = Object.keys(TRANSLATIONS) as (keyof typeof TRANSLATIONS)[];

export type SupportedLocales = (typeof SUPPORTED_LOCALES)[number];
