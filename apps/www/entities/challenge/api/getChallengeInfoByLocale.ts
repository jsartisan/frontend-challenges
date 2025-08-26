import type { ChallengeSlim, QuestionMetaInfo } from "~/entities/challenge/model/types";

import { DEFAULT_LOCALE } from "~/shared/config/locale";

export function getChallengeInfoByLocale(quiz: ChallengeSlim, locale: string = DEFAULT_LOCALE) {
  const info = Object.assign({}, quiz.info[DEFAULT_LOCALE], quiz.info[locale]);
  info.tags = quiz.info[locale]?.tags || quiz.info[DEFAULT_LOCALE]?.tags || [];
  info.related = quiz.info[locale]?.related || quiz.info[DEFAULT_LOCALE]?.related || [];

  if (typeof info.tags === "string")
    info.tags = info.tags
      // @ts-expect-error type mismatch - TODO: fix this
      .split(",")
      .map((i: string) => i.trim())
      .filter(Boolean);

  return info as QuestionMetaInfo;
}
