import { getChallengeInfoByLocale } from "@/db/challenge";
import { translate } from "../utils/locales";
import { Question, SupportedLocales } from "@/types";

export const toInfoHeader = function toInfoHeader(quiz: Question, locale: SupportedLocales) {
  const info = getChallengeInfoByLocale(quiz, locale);

  const author = `${info.author?.name} (@${info?.author?.github})`;

  return (
    `${quiz.no} - ${info.title || ""}\n` +
    "-------\n" +
    `by ${author} #${translate(locale, `difficulty.${quiz.difficulty}`)} ${
      info?.tags?.map((i) => `#${i}`).join(" ") || ""
    }\n\n` +
    `### ${translate(locale, "title.question")}\n\n`
  );
};
