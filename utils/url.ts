import lzs from "lz-string";

import { CodeFile, Question } from "@/types";
import { DEFAULT_LOCALE, DOMAIN, REPO } from "@/constants";
import { getQuestionInfoByLocale } from "@/db/question";

export const PLAYGROUND = `${DOMAIN}/play`;

export function toPlaygroundUrl(code: string, config: object = {}, site = PLAYGROUND) {
  return `${site}?${Object.entries(config)
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join("&")}#code/${lzs.compressToEncodedURIComponent(code)}`;
}

export function toSolutionsFull(no: number) {
  return `${REPO}/issues?q=label%3A${no}+label%3Aanswer+sort%3Areactions-%2B1-desc`;
}

export function toQuizREADME(quiz: Question, locale?: string, absolute = false) {
  const prefix = absolute ? `${REPO}/blob/main` : ".";
  return locale && locale !== DEFAULT_LOCALE && quiz.readme[locale]
    ? `${prefix}/questions/${quiz.path}/README.${locale}.md`
    : `${prefix}/questions/${quiz.path}/README.md`;
}

export function toRawREADME(quiz: Question, locale?: string) {
  const provider = "https://cdn.jsdelivr.net/gh/type-challenges/type-challenges";
  // const provider = 'https://raw.githubusercontent.com/type-challenges/type-challenges/main'
  return locale && locale !== DEFAULT_LOCALE && quiz.readme[locale]
    ? `${provider}/questions/${quiz.path}/README.${locale}.md`
    : `${provider}/questions/${quiz.path}/README.md`;
}

export function toQuestionsRawREADME(locale?: string) {
  const provider = "https://cdn.jsdelivr.net/gh/type-challenges/type-challenges";
  return locale && locale !== DEFAULT_LOCALE ? `${provider}/README.${locale}.md` : `${provider}/README.md`;
}

export function toNearborREADME(quiz: Question, locale?: string) {
  return locale && locale !== DEFAULT_LOCALE && quiz.readme[locale] ? `./README.${locale}.md` : "./README.md";
}

export function toShareAnswerFull(quiz: Question, locale: string = DEFAULT_LOCALE, files: Record<string, CodeFile>) {
  const info = getQuestionInfoByLocale(quiz, locale);

  const readme = "";

  if (locale === DEFAULT_LOCALE)
    return `${REPO}/issues/new?labels=answer,${encodeURIComponent(
      locale,
    )}&template=0-answer.md&title=${encodeURIComponent(`${quiz.no} - ${info.title}`)}`;
  else
    return `${REPO}/issues/new?labels=answer,${encodeURIComponent(
      locale,
    )}&template=1-answer.${locale}.md&title=${encodeURIComponent(`${quiz.no} - ${info.title}`)}`;
}

// Short

export function toReadmeShort(no: number, locale?: string) {
  return locale !== DEFAULT_LOCALE ? `${DOMAIN}/${no}/${locale}` : `${DOMAIN}/${no}`;
}

export function toSolutionsShort(no: number) {
  return `${DOMAIN}/${no}/solutions`;
}

export function toPlayShort(path: string) {
  return `${DOMAIN}/questions/${path}`;
}

export function toAnswerShort(no: number, locale?: string) {
  return locale !== DEFAULT_LOCALE ? `${DOMAIN}/${no}/answer/${locale}` : `${DOMAIN}/${no}/answer`;
}

export function toHomepageShort(locale?: string) {
  return locale !== DEFAULT_LOCALE ? `${DOMAIN}/${locale}` : `${DOMAIN}`;
}
