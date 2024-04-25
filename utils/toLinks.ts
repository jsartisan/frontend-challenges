import { Question, SupportedLocales } from "@/types";
import { translate } from "../utils/locales";
import { toReadmeShort } from "./url";

export function toLinks(quiz: Question, locale: SupportedLocales) {
  return "\n\n" + `> ${translate(locale, "link.view-on-github")}${toReadmeShort(quiz.no, locale)}`;
}
