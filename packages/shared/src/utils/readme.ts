import { translate } from "./locales";
import { getChallengeReadmeURL } from "./url";
import { DEFAULT_LOCALE, DIFFICULTY_COLORS } from "../constants";
import { Challenge, Difficulty, QuestionMetaInfo, SupportedLocales } from "../types";

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
 * returns badge for a difficulty
 *
 * @returns
 */
export function getDifficultyBadge(difficulty: Difficulty, locale: SupportedLocales) {
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
export function getDifficultyBadgeInverted(difficulty: Difficulty, locale: SupportedLocales, count: number) {
  return getBadge(translate(locale, `difficulty.${difficulty}`), count.toString(), DIFFICULTY_COLORS[difficulty]);
}

/**
 * returns plain text with difficulty and count
 *
 * @returns
 */
export function getDifficultyPlainText(difficulty: string, locale: SupportedLocales, count: number) {
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
