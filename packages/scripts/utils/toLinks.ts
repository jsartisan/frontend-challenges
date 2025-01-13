import { translate } from "@/shared";
import { toReadmeShort } from "@/shared";
import { Question, SupportedLocales } from "@/shared";

export function toLinks(quiz: Question, locale: SupportedLocales) {
  return "\n\n" + `> ${translate(locale, "link.view-on-github")}${toReadmeShort(quiz.no, locale)}`;
}
