import type { Category } from "~/entities/category/model/types";
import type { ChallengeList } from "~/entities/challenge/model/types";

import { getChallenges } from "~/entities/challenge/api/getChallenges";

/**
 * Filters challenges by category
 * @param challenges - Array of challenges to filter
 * @param category - Category to filter by
 * @returns Filtered array of challenges
 */
export function filterChallengesByCategory(challenges: ChallengeList, category: Category): ChallengeList {
  return challenges.filter((challenge) => challenge.category === category);
}

/**
 * Fetches all challenges filtered by a specific category
 * @param category - Category to filter by
 * @returns Promise resolving to filtered challenges
 */
export async function getChallengesByCategory(category: Category): Promise<ChallengeList> {
  const challenges = await getChallenges();
  return filterChallengesByCategory(challenges, category);
}
