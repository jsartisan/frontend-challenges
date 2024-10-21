import { CATEGORIES, Challenge } from "@frontend-challenges/shared";

export function getCategoriesWithChallengesCount(challenges: Challenge[]) {
  return CATEGORIES.map((category) => ({
    name: category,
    challengesCount: challenges.filter((challenge) => challenge.category === category).length,
  }));
}
