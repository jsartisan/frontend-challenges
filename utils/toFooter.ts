import type { SupportedLocale } from "../utils/locales";
import { translate } from "../utils/locales";
import { toAnswerShort, toHomepageShort, toSolutionsShort } from "./url";
import { Question } from "@/types";

export const toFooter = function (quiz: Question, locale: SupportedLocale) {
  return (
    "\n\n" +
    `> ${translate(locale, "link.share-solutions")}${toAnswerShort(quiz.no, locale)}\n` +
    `> ${translate(locale, "link.checkout-solutions")}${toSolutionsShort(quiz.no)}\n` +
    `> ${translate(locale, "link.more-challenges")}${toHomepageShort(locale)}\n`
  );
};
