import { CATEGORIES, ChallengeList } from "@/shared";

export function getCategoriesWithChallengesCount(challenges: ChallengeList) {
  return CATEGORIES.map((category) => ({
    name: category,
    challengesCount: challenges.filter((challenge) => challenge.category === category).length,
  }));
}
