import { ChallengeList } from "~/entities/challenge/model/types";

import { getChallengeInfoByLocale } from "./getChallengeInfoByLocale";

export function getAllChallengesTags(challenges: ChallengeList, locale: string) {
  const set = new Set<string>();
  for (const quiz of challenges) {
    const info = getChallengeInfoByLocale(quiz, locale);
    for (const tag of info?.tags || []) set.add(tag);
  }
  return Array.from(set).sort();
}
