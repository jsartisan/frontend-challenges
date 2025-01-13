import fs from "fs-extra";

import {
  escapeHtml,
  getBadge,
  getBadgeLink,
  getDifficultyBadge,
  quizNoToBadges,
  toAuthorInfo,
  SUPPORTED_LOCALES,
  Challenge,
  SupportedLocales,
  getFileNameByLocale,
  translate,
  toNearborREADME,
  getQuestionURL,
  getShareAnswerURL,
  getSolutionsURL,
} from "@/shared";

import { getChallengeInfoByLocale } from "../db/challenges";

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
  locale: SupportedLocales,
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
