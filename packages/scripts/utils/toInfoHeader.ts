import { translate } from "@frontend-challenges/shared";
import { getChallengeInfoByLocale } from "@frontend-challenges/backend";
import { Question, SupportedLocales } from "@frontend-challenges/shared";

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
