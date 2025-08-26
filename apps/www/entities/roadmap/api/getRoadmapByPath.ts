import path from "path";

import type { Roadmap } from "~/entities/roadmap/model/types";

import { DEFAULT_LOCALE } from "~/shared/config/locale";
import { ROADMAP_ROOT } from "~/entities/roadmap/model/constants";
import { parseRoadmap } from "~/entities/roadmap/lib/parseRoadmap";
import { getLocaleVariations } from "~/shared/lib/i18n/getLocaleVariations";
import { getChallengeByPathSlim } from "~/entities/challenge/api/getChallengeByPathSlim";

export async function getRoadmapByPath(dir: string): Promise<Roadmap> {
  const info = await getLocaleVariations(path.join(ROADMAP_ROOT, dir, "info.yml"), [parseRoadmap]);

  if (!info) {
    throw new Error(`Roadmap not found: ${dir}`);
  }

  if (!info[DEFAULT_LOCALE]) {
    throw new Error(`Roadmap not found: ${dir}`);
  }

  const topics = await Promise.all(
    info[DEFAULT_LOCALE].topics.map(async (topic) => {
      return {
        ...topic,
        challenges: await Promise.all(
          topic.challenges.map(async (challengePath: string) => {
            const challenge = await getChallengeByPathSlim(challengePath);

            return challenge;
          }),
        ),
      };
    }),
  );

  return { title: info[DEFAULT_LOCALE].title, topics, path: dir, info };
}
