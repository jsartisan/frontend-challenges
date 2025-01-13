import { translate } from "@/shared";
import { DEFAULT_LOCALE } from "@/shared";
import { Question, SupportedLocales } from "@/shared";

import { toCommentBlock } from "./toCommentBlock";
import { toInfoHeader } from "./toInfoHeader";
import { toLinks } from "./toLinks";
import { toDivider } from "./toDivider";
import { toFooter } from "./toFooter";

export const formatToCode = (quiz: Question, locale: SupportedLocales) => {
  return `${
    toCommentBlock(
      toInfoHeader(quiz, locale) + (quiz.readme[locale] || quiz.readme[DEFAULT_LOCALE]) + toLinks(quiz, locale),
    ) + toDivider(translate(locale, "divider.code-start"))
  }\n${toDivider(translate(locale, "divider.further-steps"))}${toCommentBlock(toFooter(quiz, locale))}`;
};
