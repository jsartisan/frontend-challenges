import type { ChallengeSlim } from "~/entities/challenge/model/types";

import { toDescription } from "~/shared/lib/seo";
import { DEFAULT_LOCALE } from "~/shared/config/locale";

const TYPE_LABEL: Record<string, string> = {
  question: "coding challenge",
  quiz: "quiz",
  theory: "theory question",
};

/**
 * Builds a page description for a challenge from facts in its info.yml (excerpt, difficulty, type, tags).
 * Only values that exist are used, so nothing is invented for challenges without an excerpt.
 */
export function describeChallenge(challenge: Pick<ChallengeSlim, "info" | "type" | "difficulty">): string {
  const info = challenge.info?.[DEFAULT_LOCALE];
  const title = info?.title ?? "Frontend challenge";
  const difficulty = (challenge.difficulty || info?.difficulty || "").toString().trim();
  const typeLabel = TYPE_LABEL[challenge.type] ?? "challenge";
  const tags = (info?.tags ?? []).filter(Boolean).slice(0, 4);
  const excerpt = (info?.excerpt ?? "").toString().trim();

  const kind = [difficulty, typeLabel].filter(Boolean).join(" ");
  const article = /^[aeiou]/i.test(kind) ? "an" : "a";
  const topics = tags.length ? ` Topics: ${tags.join(", ")}.` : "";

  if (excerpt) {
    const sentence = /[.!?]$/.test(excerpt) ? excerpt : `${excerpt}.`;

    return toDescription(
      `${sentence} ${article[0].toUpperCase()}${article.slice(1)} ${kind} on Frontend Challenges.${topics}`,
    );
  }

  return toDescription(`${title} is ${article} ${kind} on Frontend Challenges.${topics} Free and open source.`);
}
