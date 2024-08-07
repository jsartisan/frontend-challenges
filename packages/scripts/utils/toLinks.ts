import { translate } from "@frontend-challenges/shared";
import { toReadmeShort } from "@frontend-challenges/shared";
import { Question, SupportedLocales } from "@frontend-challenges/shared";

export function toLinks(quiz: Question, locale: SupportedLocales) {
  return "\n\n" + `> ${translate(locale, "link.view-on-github")}${toReadmeShort(quiz.no, locale)}`;
}
