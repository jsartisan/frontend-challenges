import { ChallengeList } from "~/entities/challenge/model/types";

/**
 * Keeps only the fields that client-side lists (search, breadcrumb, completion stats) read.
 * The full list is serialized into every statically exported page, so every extra field
 * is multiplied by the page count.
 */
export function toClientChallengeList(challenges: ChallengeList): ChallengeList {
  return challenges.map(({ category, difficulty, info, no, path, templatesAvailable, type }) => ({
    no,
    difficulty,
    path,
    category,
    type,
    templatesAvailable,
    info: Object.fromEntries(
      Object.entries(info).map(([locale, meta]) => [
        locale,
        meta && { title: meta.title, tags: meta.tags, published_date: meta.published_date },
      ]),
    ),
  }));
}
