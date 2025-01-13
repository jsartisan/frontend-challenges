import fs from "fs";
import path from "path";
import YAML from "js-yaml";
import { DEFAULT_LOCALE, STUDY_PLANS_ROOT, Roadmap, RoadmapInfo } from "@/shared";

import { getLocaleVariations } from "./locales";
import { getChallengeByPath } from "./challenges";

export async function getRoadmaps(): Promise<Roadmap[]> {
  const folders = fs.readdirSync(STUDY_PLANS_ROOT);

  const studyPlans = await Promise.all(folders.map(async (dir: string) => getRoadmapByPath(dir)));

  return studyPlans;
}

export async function getRoadmapByPath(dir: string): Promise<Roadmap> {
  const info = await getLocaleVariations(path.join(STUDY_PLANS_ROOT, dir, "info.yml"), [parseRoadmap]);

  if (!info) {
    throw new Error(`Roadmap not found: ${dir}`);
  }

  const topics = await Promise.all(
    info[DEFAULT_LOCALE].topics.map(async (topic) => {
      return {
        ...topic,
        challenges: await Promise.all(
          topic.challenges.map(async (challengePath: string) => {
            const challenge = await getChallengeByPath(challengePath);

            return challenge;
          }),
        ),
      };
    }),
  );

  return { title: info[DEFAULT_LOCALE].title, topics, path: dir, info };
}

export function parseRoadmap(s: string): RoadmapInfo {
  const object = YAML.load(s) as any;

  const arrayKeys = ["tags", "related"];

  for (const key of arrayKeys) {
    if (object && object[key]) {
      object[key] = (object[key] || "")
        .toString()
        .split(",")
        .map((i: string) => i.trim())
        .filter(Boolean);
    }
  }

  return object;
}
