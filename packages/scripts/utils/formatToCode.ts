import { translate } from "@frontend-challenges/shared";
import { DEFAULT_LOCALE } from "@frontend-challenges/shared";
import { Question, SupportedLocales } from "@frontend-challenges/shared";

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
