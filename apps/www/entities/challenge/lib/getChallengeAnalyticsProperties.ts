import type { Challenge, ChallengeSlim } from "~/entities/challenge/model/types";

import { DEFAULT_LOCALE } from "~/shared/config/locale";

export function getChallengeAnalyticsProperties(challenge: Challenge | ChallengeSlim) {
  const info = challenge.info[DEFAULT_LOCALE];

  return {
    challenge_id: challenge.no,
    challenge_path: challenge.path,
    challenge_title: info?.title,
    challenge_type: challenge.type,
    difficulty: challenge.difficulty,
    category: challenge.category,
    tags: info?.tags?.filter(Boolean),
  };
}
