import fs from "fs-extra";

import { escapeHtml } from "./helpers";
import { getFileNameByLocale, translate } from "./locales";
import { getChallengeInfoByLocale } from "@/db/challenge";
import { Challenge, Difficulty, QuestionMetaInfo, SupportedLocale } from "@/types";
import { DEFAULT_LOCALE, DIFFICULTY_COLORS, SUPPORTED_LOCALES } from "@/constants";
import { toNearborREADME, getQuestionURL, getChallengeReadmeURL, getShareAnswerURL, getSolutionsURL } from ".";

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
 *
 * @param filepath
 * @param quiz
 * @param locale
 * @param quizzes
 * @returns
 */
export async function insertInfoReadme(
  filepath: string,
  quiz: Challenge,
  locale: SupportedLocale,
  quizzes: Challenge[],
) {
  if (!fs.existsSync(filepath)) return;
  let text = await fs.readFile(filepath, "utf-8");
  /* eslint-disable prefer-template */

  if (!text.match(/<!--info-header-start-->[\s\S]*<!--info-header-end-->/))
    text = `<!--info-header-start--><!--info-header-end-->\n\n${text}`;
  if (!text.match(/<!--info-footer-start-->[\s\S]*<!--info-footer-end-->/))
    text = `${text}\n\n<!--info-footer-start--><!--info-footer-end-->`;

  const info = getChallengeInfoByLocale(quiz, locale);

  const availableLocales = SUPPORTED_LOCALES.filter((l) => l !== locale).filter((l) => !!quiz.readme[l]);

  text = text
    .replace(
      /<!--info-header-start-->[\s\S]*<!--info-header-end-->/,
      "<!--info-header-start-->" +
        `<h1>${escapeHtml(info.title || "")} ${getDifficultyBadge(quiz.difficulty, locale)} ${(info.tags || [])
          .map((i) => getBadge("", `#${i}`, "999"))
          .join(" ")}</h1>` +
        `<blockquote><p>${toAuthorInfo(info.author)}</p></blockquote>` +
        "<p>" +
        getBadgeLink(
          getQuestionURL(quiz.path),
          "",
          translate(locale, "badge.take-the-challenge"),
          "0d99ff",
          "?logo=javascript&logoColor=white",
        ) +
        (availableLocales.length
          ? "&nbsp;&nbsp;&nbsp;" +
            availableLocales
              .map((l) => getBadgeLink(toNearborREADME(quiz, l), "", translate(l, "display"), "gray"))
              .join(" ")
          : "") +
        "</p>" +
        "<!--info-header-end-->",
    )
    .replace(
      /<!--info-footer-start-->[\s\S]*<!--info-footer-end-->/,
      "<!--info-footer-start--><br>" +
        getBadgeLink(
          `../../${getFileNameByLocale("README", locale, "md")}`,
          "",
          translate(locale, "badge.back"),
          "grey",
        ) +
        getBadgeLink(
          getShareAnswerURL({ challenge: quiz, locale }),
          "",
          translate(locale, "badge.share-your-solutions"),
          "teal",
        ) +
        getBadgeLink(
          getSolutionsURL(quiz.no),
          "",
          translate(locale, "badge.checkout-solutions"),
          "de5a77",
          "?logo=awesome-lists&logoColor=white",
        ) +
        (Array.isArray(info.related) && info.related.length
          ? `<hr><h3>${translate(locale, "readme.related-challenges")}</h3>${quizNoToBadges(
              info.related,
              quizzes,
              locale,
              true,
            )}`
          : "") +
        "<!--info-footer-end-->",
    );

  /* eslint-enable prefer-template */

  await fs.writeFile(filepath, text, "utf-8");
}

/**
 * returns badge for a difficulty
 *
 * @returns
 */
export function getDifficultyBadge(difficulty: Difficulty, locale: SupportedLocale) {
  return getBadge("", translate(locale, `difficulty.${difficulty}`), DIFFICULTY_COLORS[difficulty]);
}

/**
 * returns badge based on label, text and color
 *
 * @returns
 */
export function getBadge(label: string, text: string, color: string, args = "") {
  return `<img src="${getBadgeURL(label, text, color, args)}" alt="${text}"/>`;
}

/**
 * returns badge url based on color, label and text
 *
 * @returns
 */
export function getBadgeURL(label: string, text: string, color: string, args = "") {
  return `https://img.shields.io/badge/${encodeURIComponent(label.replace(/-/g, "--"))}-${encodeURIComponent(
    text.replace(/-/g, "--"),
  )}-${color}${args}`;
}

/**
 * returns link with badge
 *
 * @returns
 */
export function getBadgeLink(url: string, label: string, text: string, color: string, args = "") {
  return `<a href="${url}" target="_blank">${getBadge(label, text, color, args)}</a> `;
}

/**
 * returns link with plain text
 *
 * @returns
 */
export function getPlainTextLink(url: string, _label: string, text: string) {
  return `<a href="${url}" target="_blank">${text}</a> `;
}

export function toAuthorInfo(author: Partial<QuestionMetaInfo["author"]> = {}) {
  return `by ${author.name}${
    author.github ? ` <a href="https://github.com/${author.github}" target="_blank">@${author.github}</a>` : ""
  }`;
}

/**
 * returns difficulty badge with count
 *
 * @returns
 */
export function getDifficultyBadgeInverted(difficulty: Difficulty, locale: SupportedLocale, count: number) {
  return getBadge(translate(locale, `difficulty.${difficulty}`), count.toString(), DIFFICULTY_COLORS[difficulty]);
}

/**
 * returns plain text with difficulty and count
 *
 * @returns
 */
export function getDifficultyPlainText(difficulty: string, locale: SupportedLocale, count: number) {
  return `${translate(locale, `difficulty.${difficulty}`)} (${count.toString()})`;
}

/**
 * returns badge for a challenge.
 * It can be plain text or image based on the `badge` parameter
 *
 * @returns
 */
export function getChallengeBadge(quiz: Challenge, locale: string, absolute = false, badge = true) {
  const fn = badge ? getBadgeLink : getPlainTextLink;

  return fn(
    getChallengeReadmeURL(quiz, locale, absolute),
    "",
    `${quiz.no}・${quiz.info[locale]?.title || quiz.info[DEFAULT_LOCALE]?.title}`,
    DIFFICULTY_COLORS[quiz.difficulty],
  );
}

export function quizNoToBadges(ids: (string | number)[], quizzes: Challenge[], locale: string, absolute = false) {
  return ids
    .map((i) => quizzes.find((q) => q.no === Number(i)))
    .filter(Boolean)
    .map((i) => getChallengeBadge(i!, locale, absolute))
    .join(" ");
}
