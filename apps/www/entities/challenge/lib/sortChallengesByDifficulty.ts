import { ChallengeList } from "~/entities/challenge/model/types";
import { DIFFICULTY_RANK } from "~/entities/challenge/model/constants";

export function sortChallengesByDifficulty(challenges: ChallengeList, sort_order?: "asc" | "desc") {
  return challenges.sort(
    (a, b) =>
      (DIFFICULTY_RANK.indexOf(a.difficulty) - DIFFICULTY_RANK.indexOf(b.difficulty)) * (sort_order === "asc" ? 1 : -1),
  );
}
