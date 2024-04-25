import { Question, SupportedLocales } from "@/types";
import { translate } from "../utils/locales";
import { getShareAnswerURL, getSolutionsURL, getRepoREADMEUrl } from "./url";

export const toFooter = function (quiz: Question, locale: SupportedLocales) {
  return (
    "\n\n" +
    `> ${translate(locale, "link.share-solutions")}${getShareAnswerURL({ challenge: quiz, locale })}\n` +
    `> ${translate(locale, "link.checkout-solutions")}${getSolutionsURL(quiz.no)}\n` +
    `> ${translate(locale, "link.more-challenges")}${getRepoREADMEUrl(locale)}\n`
  );
};
