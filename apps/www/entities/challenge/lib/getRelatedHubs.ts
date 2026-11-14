import type { ChallengeSlim } from "~/entities/challenge/model/types";

import { DEFAULT_LOCALE } from "~/shared/config/locale";
import { getRoadmaps } from "~/entities/roadmap/api/getRoadmaps";
import { CATEGORY_METADATA } from "~/entities/category/config/metadata";

export type RelatedHub = { href: string; label: string };

/** Crawlable links from a challenge to the category hub and every roadmap that lists it. */
export async function getRelatedHubs(challenge: Pick<ChallengeSlim, "path" | "category">): Promise<RelatedHub[]> {
  const hubs: RelatedHub[] = [];

  if (challenge.category) {
    hubs.push({
      href: `/categories/${challenge.category}`,
      label: `All ${CATEGORY_METADATA[challenge.category].title} interview questions`,
    });
  }

  for (const roadmap of await getRoadmaps()) {
    const listed = roadmap.topics.some((topic) => topic.challenges.some((c) => c.path === challenge.path));

    if (listed) {
      hubs.push({
        href: `/roadmaps/${roadmap.path}`,
        label: roadmap.info[DEFAULT_LOCALE]?.heading ?? `${roadmap.title} roadmap`,
      });
    }
  }

  return hubs;
}
