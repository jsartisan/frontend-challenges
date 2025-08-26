import fs from "fs-extra";

import { DOMAIN, REPO } from "~/shared/config/paths";
import { translate } from "~/shared/lib/i18n/translate";
import { DEFAULT_LOCALE } from "~/shared/config/locale";
import { escapeHtml } from "~/shared/lib/string/escapeHtml";
import { getChallengeInfoByLocale } from "~/entities/challenge/api";
import { getFileNameByLocale } from "~/shared/lib/i18n/getFileNameByLocale";
import { SUPPORTED_LOCALES, type SupportedLocales } from "~/shared/config/locale";
import { generateShareAnswerURL } from "~/entities/challenge/lib/generateShareAnswerURL";
import { DIFFICULTY_COLORS, DEFAULT_TEMPLATE } from "~/entities/challenge/model/constants";
import { Challenge, ChallengeSlim, Difficulty, QuestionMetaInfo } from "~/entities/challenge/model/types";

/**------------------------------------------------------------------------------
 *  BADGE related functions
 * ------------------------------------------------------------------------------ */
export function getDifficultyBadge(difficulty: Difficulty, locale: SupportedLocales) {
  return getBadge("", translate(locale, `difficulty.${difficulty}`), DIFFICULTY_COLORS[difficulty]);
}

export function getBadge(label: string, text: string, color: string, args = "") {
  return `<img src="${getBadgeURL(label, text, color, args)}" alt="${text}"/>`;
}

export function getBadgeURL(label: string, text: string, color: string, args = "") {
  return `https://img.shields.io/badge/${encodeURIComponent(label.replace(/-/g, "--"))}-${encodeURIComponent(
    text.replace(/-/g, "--"),
  )}-${color}${args}`;
}

export function getBadgeLink(url: string, label: string, text: string, color: string, args = "") {
  return `<a href="${url}" target="_blank">${getBadge(label, text, color, args)}</a> `;
}

export function getPlainTextLink(url: string, _label: string, text: string) {
  return `<a href="${url}" target="_blank">${text}</a> `;
}

export function toAuthorInfo(author: Partial<QuestionMetaInfo["author"]> = {}) {
  return `by ${author.name}${
    author.github ? ` <a href="https://github.com/${author.github}" target="_blank">@${author.github}</a>` : ""
  }`;
}

export function getDifficultyBadgeInverted(difficulty: Difficulty, locale: SupportedLocales, count: number) {
  return getBadge(translate(locale, `difficulty.${difficulty}`), count.toString(), DIFFICULTY_COLORS[difficulty]);
}

export function getDifficultyPlainText(difficulty: string, locale: SupportedLocales, count: number) {
  return `${translate(locale, `difficulty.${difficulty}`)} (${count.toString()})`;
}

export function getChallengeBadge(challenge: ChallengeSlim, locale: string, absolute = false, badge = true) {
  const fn = badge ? getBadgeLink : getPlainTextLink;

  return fn(
    getChallengeReadmeURL(challenge, locale, absolute),
    "",
    `${challenge.no}・${challenge.info[locale]?.title || challenge.info[DEFAULT_LOCALE]?.title}`,
    DIFFICULTY_COLORS[challenge.difficulty],
  );
}

export function quizNoToBadges(
  ids: (string | number)[],
  challenges: ChallengeSlim[],
  locale: string,
  absolute = false,
) {
  return ids
    .map((i) => challenges.find((q) => q.no === Number(i)))
    .filter(Boolean)
    .map((i) => getChallengeBadge(i as ChallengeSlim, locale, absolute))
    .join(" ");
}

/**------------------------------------------------------------------------------
 *  URL related functions
 * ------------------------------------------------------------------------------ */

export function getChallengeReadmeURL(quiz: ChallengeSlim, locale?: string, absolute = false) {
  const prefix = absolute ? `${REPO}/blob/main` : ".";

  return locale && locale !== DEFAULT_LOCALE && quiz.readme[locale]
    ? `${prefix}/challenges/${quiz.path}/README.${locale}.md`
    : `${prefix}/challenges/${quiz.path}/README.md`;
}

export function getNearbyReadmeURL(quiz: ChallengeSlim, locale?: string) {
  return locale && locale !== DEFAULT_LOCALE && quiz.readme[locale] ? `./README.${locale}.md` : "./README.md";
}

export function getReadmeShortURL(no: number, locale?: string) {
  return locale !== DEFAULT_LOCALE ? `${DOMAIN}/${no}/${locale}` : `${DOMAIN}/${no}`;
}

export function getQuestionURL(path: string) {
  return `${DOMAIN}/challenges/${path}`;
}

export function getSolutionsURL(no: number) {
  return `${REPO}/issues?q=label%3A${no}+label%3Aanswer+sort%3Areactions-%2B1-desc`;
}

/**------------------------------------------------------------------------------
 * README related functions
 * ------------------------------------------------------------------------------ */

export function cleanUpReadme(text: string) {
  return text
    .replace(/<!--info-header-start-->[\s\S]*<!--info-header-end-->/, "")
    .replace(/<!--info-footer-start-->[\s\S]*<!--info-footer-end-->/, "")
    .trim();
}

export async function insertInfoReadme(
  filepath: string,
  quiz: ChallengeSlim,
  locale: SupportedLocales,
  quizzes: ChallengeSlim[],
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
              .map((l) => getBadgeLink(getNearbyReadmeURL(quiz, l), "", translate(l, "display"), "gray"))
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
          generateShareAnswerURL({
            challenge: quiz as unknown as Challenge,
            locale,
            template: quiz.info["en"]?.template ?? DEFAULT_TEMPLATE,
            files: {},
          }) || "",
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
