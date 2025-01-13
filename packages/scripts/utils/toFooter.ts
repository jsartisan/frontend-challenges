import { translate } from "@/shared";
import { Question, SupportedLocales } from "@/shared";
import { getShareAnswerURL, getSolutionsURL, getRepoREADMEUrl } from "@/shared";

export const toFooter = function (quiz: Question, locale: SupportedLocales) {
  return (
    "\n\n" +
    `> ${translate(locale, "link.share-solutions")}${getShareAnswerURL({ challenge: quiz, locale })}\n` +
    `> ${translate(locale, "link.checkout-solutions")}${getSolutionsURL(quiz.no)}\n` +
    `> ${translate(locale, "link.more-challenges")}${getRepoREADMEUrl(locale)}\n`
  );
};
