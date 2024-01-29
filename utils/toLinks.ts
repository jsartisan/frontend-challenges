import { Question } from "@/types";
import type { SupportedLocale } from "../utils/locales";
import { translate } from "../utils/locales";
import { toReadmeShort } from "./url";

export function toLinks(quiz: Question, locale: SupportedLocale) {
  return "\n\n" + `> ${translate(locale, "link.view-on-github")}${toReadmeShort(quiz.no, locale)}`;
}
