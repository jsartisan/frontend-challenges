import { DEFAULT_LOCALE } from "~/shared/config/locale";
import { ChallengeList } from "~/entities/challenge/model/types";

export function sortChallengesByDate(challenges: ChallengeList, sortOrder: "asc" | "desc") {
  const sorted = challenges.sort((a, b) => {
    const aDate = new Date(a.info[DEFAULT_LOCALE]?.published_date || "1970-01-01");
    const bDate = new Date(b.info[DEFAULT_LOCALE]?.published_date || "1970-01-01");

    return sortOrder === "asc" ? aDate.getTime() - bDate.getTime() : bDate.getTime() - aDate.getTime();
  });

  return sorted;
}
