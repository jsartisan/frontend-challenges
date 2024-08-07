import fs from "fs";
import path from "path";
import YAML from "js-yaml";
import { DEFAULT_LOCALE, STUDY_PLANS_ROOT, StudyPlan, StudyPlanInfo } from "@frontend-challenges/shared";

import { getLocaleVariations } from "./locales";
import { getChallengeByPath } from "./challenges";

export async function getStudyPlans(): Promise<StudyPlan[]> {
  const folders = fs.readdirSync(STUDY_PLANS_ROOT);

  const studyPlans = await Promise.all(folders.map(async (dir: string) => getStudyPlanByPath(dir)));

  return studyPlans;
}

export async function getStudyPlanByPath(dir: string): Promise<StudyPlan> {
  const info = await getLocaleVariations(path.join(STUDY_PLANS_ROOT, dir, "info.yml"), [parseStudyPlan]);

  if (!info) {
    throw new Error(`Study plan not found: ${dir}`);
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

export function parseStudyPlan(s: string): StudyPlanInfo {
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
