import type { SupportedLocale } from "../utils/locales";
import { translate } from "../utils/locales";
import { toCommentBlock } from "./toCommentBlock";
import { toInfoHeader } from "./toInfoHeader";
import { toLinks } from "./toLinks";
import { toDivider } from "./toDivider";
import { toFooter } from "./toFooter";
import { Question } from "@/types";
import { DEFAULT_LOCALE } from "@/constants";

export const formatToCode = (quiz: Question, locale: SupportedLocale) => {
  return `${
    toCommentBlock(
      toInfoHeader(quiz, locale) + (quiz.readme[locale] || quiz.readme[DEFAULT_LOCALE]) + toLinks(quiz, locale),
    ) + toDivider(translate(locale, "divider.code-start"))
  }\n${toDivider(translate(locale, "divider.further-steps"))}${toCommentBlock(toFooter(quiz, locale))}`;
};
