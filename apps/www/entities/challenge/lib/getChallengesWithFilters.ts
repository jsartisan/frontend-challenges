import { ChallengeList } from "~/entities/challenge/model/types";
import { sortChallengesByDate } from "~/entities/challenge/lib/sortChallengesByDate";
import { sortChallengesByDifficulty } from "~/entities/challenge/lib/sortChallengesByDifficulty";

export function getChallengesWithFilters(challenges: ChallengeList, searchParams: URLSearchParams) {
  const search = searchParams.get("search") ?? "";
  const sortBy = searchParams.get("sort_by") ?? "published_date";
  const sortOrder = (searchParams.get("sort_order") ?? "desc") as "asc" | "desc";
  const type = (searchParams.get("type") ?? "all") as "all" | "question" | "quiz";

  let filtered = challenges.filter((challenge) => {
    const category = searchParams.get("category")?.split(",") ?? [];
    const difficulty = searchParams.get("difficulty")?.split(",") ?? [];

    return (
      (category.length === 0 || category.includes(challenge.category as any)) &&
      (difficulty.length === 0 || difficulty.includes(challenge.difficulty)) &&
      (type === "all" || type === challenge.type)
    );
  });

  filtered = filtered.filter((question) => {
    return question?.info?.en?.title?.toLowerCase().includes(search.toLowerCase());
  });

  if (sortBy === "difficulty") {
    filtered = sortChallengesByDifficulty(filtered, sortOrder);
  }

  if (sortBy === "published_date") {
    filtered = sortChallengesByDate(filtered, sortOrder);
  }

  if (type !== "all") {
    filtered = filtered.filter((question) => question.type === type);
  }

  return filtered;
}
