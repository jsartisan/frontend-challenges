import { translate } from "@frontend-challenges/shared";
import { Question, SupportedLocales } from "@frontend-challenges/shared";
import { getShareAnswerURL, getSolutionsURL, getRepoREADMEUrl } from "@frontend-challenges/shared";

export const toFooter = function (quiz: Question, locale: SupportedLocales) {
  return (
    "\n\n" +
    `> ${translate(locale, "link.share-solutions")}${getShareAnswerURL({ challenge: quiz, locale })}\n` +
    `> ${translate(locale, "link.checkout-solutions")}${getSolutionsURL(quiz.no)}\n` +
    `> ${translate(locale, "link.more-challenges")}${getRepoREADMEUrl(locale)}\n`
  );
};
