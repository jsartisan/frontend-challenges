import { ChallengeList } from "~/entities/challenge/model/types";
import { CATEGORIES } from "~/entities/category/model/constants";

export function mapCategoriesWithCount(challenges: ChallengeList) {
  return CATEGORIES.map((category) => ({
    name: category,
    challengesCount: challenges.filter((challenge) => challenge.category === category).length,
  }));
}
