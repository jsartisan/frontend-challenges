import type { ChallengeList } from "~/entities/challenge/model/types";

import { getChallengeInfoByLocale } from "./getChallengeInfoByLocale";

export function getChallengesByTag(challenges: ChallengeList, locale: string, tag: string) {
  return challenges.filter((quiz) => {
    const info = getChallengeInfoByLocale(quiz, locale);

    return !!info.tags?.includes(tag);
  });
}
