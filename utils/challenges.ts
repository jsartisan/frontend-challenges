import { DEFAULT_LOCALE, DIFFICULTY_RANK } from "@/constants";
import { Challenge } from "@/types";

export function sortChallengesByDate(challenges: Challenge[], sort_order?: "asc" | "desc") {
  return challenges.sort((a, b) => {
    const aDate = new Date(a.info[DEFAULT_LOCALE]?.published_date || "1970-01-01");
    const bDate = new Date(b.info[DEFAULT_LOCALE]?.published_date || "1970-01-01");

    return (bDate.getTime() - aDate.getTime()) * (sort_order === "asc" ? 1 : -1);
  });
}

export function sortChallengesByDifficulty(challenges: Challenge[], sort_order?: "asc" | "desc") {
  return challenges.sort(
    (a, b) =>
      (DIFFICULTY_RANK.indexOf(a.difficulty) - DIFFICULTY_RANK.indexOf(b.difficulty)) * (sort_order === "asc" ? 1 : -1),
  );
}
