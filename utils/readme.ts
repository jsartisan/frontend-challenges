import fs from "fs-extra";

import { escapeHtml } from "./helpers";
import { getFileNameByLocale, translate } from "./locales";
import { getQuestionInfoByLocale } from "@/db/question";
import { Difficulty, Question, QuestionMetaInfo, SupportedLocale } from "@/types";
import { DEFAULT_LOCALE, DIFFICULTY_COLORS, SUPPORTED_LOCALES } from "@/constants";
import { toNearborREADME, getQuestionURL, getQuestionREADME, getShareAnswerURL, getSolutionsURL } from ".";

/**
 * removes the meta info from the readme file
 *
 * @param text
 * @returns
 */
export function cleanUpReadme(text: string) {
  return text
    .replace(/<!--info-header-start-->[\s\S]*<!--info-header-end-->/, "")
    .replace(/<!--info-footer-start-->[\s\S]*<!--info-footer-end-->/, "")
    .trim();
}

/**
 * inserts the meta info into the readme file
 * @param filepath
 * @param quiz
 * @param locale
 * @param quizes
 * @returns
 */
export async function insertInfoReadme(filepath: string, quiz: Question, locale: SupportedLocale, quizes: Question[]) {
  if (!fs.existsSync(filepath)) return;
  let text = await fs.readFile(filepath, "utf-8");
  /* eslint-disable prefer-template */

  if (!text.match(/<!--info-header-start-->[\s\S]*<!--info-header-end-->/))
    text = `<!--info-header-start--><!--info-header-end-->\n\n${text}`;
  if (!text.match(/<!--info-footer-start-->[\s\S]*<!--info-footer-end-->/))
    text = `${text}\n\n<!--info-footer-start--><!--info-footer-end-->`;

  const info = getQuestionInfoByLocale(quiz, locale);

  const availableLocales = SUPPORTED_LOCALES.filter((l) => l !== locale).filter((l) => !!quiz.readme[l]);

  text = text
    .replace(
      /<!--info-header-start-->[\s\S]*<!--info-header-end-->/,
      "<!--info-header-start-->" +
        `<h1>${escapeHtml(info.title || "")} ${toDifficultyBadge(quiz.difficulty, locale)} ${(info.tags || [])
          .map((i) => toBadge("", `#${i}`, "999"))
          .join(" ")}</h1>` +
        `<blockquote><p>${toAuthorInfo(info.author)}</p></blockquote>` +
        "<p>" +
        toBadgeLink(
          getQuestionURL(quiz.path),
          "",
          translate(locale, "badge.take-the-challenge"),
          "0d99ff",
          "?logo=javascript&logoColor=white",
        ) +
        (availableLocales.length
          ? "&nbsp;&nbsp;&nbsp;" +
            availableLocales
              .map((l) => toBadgeLink(toNearborREADME(quiz, l), "", translate(l, "display"), "gray"))
              .join(" ")
          : "") +
        "</p>" +
        "<!--info-header-end-->",
    )
    .replace(
      /<!--info-footer-start-->[\s\S]*<!--info-footer-end-->/,
      "<!--info-footer-start--><br>" +
        toBadgeLink(
          `../../${getFileNameByLocale("README", locale, "md")}`,
          "",
          translate(locale, "badge.back"),
          "grey",
        ) +
        toBadgeLink(
          getShareAnswerURL({ question: quiz, locale }),
          "",
          translate(locale, "badge.share-your-solutions"),
          "teal",
        ) +
        toBadgeLink(
          getSolutionsURL(quiz.no),
          "",
          translate(locale, "badge.checkout-solutions"),
          "de5a77",
          "?logo=awesome-lists&logoColor=white",
        ) +
        (Array.isArray(info.related) && info.related.length
          ? `<hr><h3>${translate(locale, "readme.related-challenges")}</h3>${quizNoToBadges(
              info.related,
              quizes,
              locale,
              true,
            )}`
          : "") +
        "<!--info-footer-end-->",
    );

  /* eslint-enable prefer-template */

  await fs.writeFile(filepath, text, "utf-8");
}

export function toDifficultyBadge(difficulty: Difficulty, locale: SupportedLocale) {
  return toBadge("", translate(locale, `difficulty.${difficulty}`), DIFFICULTY_COLORS[difficulty]);
}

export function toBadge(label: string, text: string, color: string, args = "") {
  return `<img src="${toBadgeURL(label, text, color, args)}" alt="${text}"/>`;
}

export function toBadgeURL(label: string, text: string, color: string, args = "") {
  return `https://img.shields.io/badge/${encodeURIComponent(label.replace(/-/g, "--"))}-${encodeURIComponent(
    text.replace(/-/g, "--"),
  )}-${color}${args}`;
}

export function toBadgeLink(url: string, label: string, text: string, color: string, args = "") {
  return `<a href="${url}" target="_blank">${toBadge(label, text, color, args)}</a> `;
}

export function toPlanTextLink(url: string, _label: string, text: string, _color: string, _args = "") {
  return `<a href="${url}" target="_blank">${text}</a> `;
}

export function toAuthorInfo(author: Partial<QuestionMetaInfo["author"]> = {}) {
  return `by ${author.name}${
    author.github ? ` <a href="https://github.com/${author.github}" target="_blank">@${author.github}</a>` : ""
  }`;
}

export function toDifficultyBadgeInverted(difficulty: Difficulty, locale: SupportedLocale, count: number) {
  return toBadge(translate(locale, `difficulty.${difficulty}`), count.toString(), DIFFICULTY_COLORS[difficulty]);
}

export function toDifficultyPlainText(difficulty: string, locale: SupportedLocale, count: number) {
  return `${translate(locale, `difficulty.${difficulty}`)} (${count.toString()})`;
}

export function quizToBadge(quiz: Question, locale: string, absolute = false, badge = true) {
  const fn = badge ? toBadgeLink : toPlanTextLink;
  return fn(
    getQuestionREADME(quiz, locale, absolute),
    "",
    `${quiz.no}・${quiz.info[locale]?.title || quiz.info[DEFAULT_LOCALE]?.title}`,
    DIFFICULTY_COLORS[quiz.difficulty],
  );
}

export function quizNoToBadges(ids: (string | number)[], quizes: Question[], locale: string, absolute = false) {
  return ids
    .map((i) => quizes.find((q) => q.no === Number(i)))
    .filter(Boolean)
    .map((i) => quizToBadge(i!, locale, absolute))
    .join(" ");
}
