import path from "path";
import fg from "fast-glob";
import fs from "fs";
import YAML from "js-yaml";

import { cleanUpReadme, loadFile } from "@/utils";
import { parseMetaInfo } from "@/utils/questions";
import { Category, Challenge, QuestionMetaInfo, StudyPlan, StudyPlanInfo } from "@/types";
import { getLocaleVariations } from "@/utils/locales";
import { CATEGORIES, CHALLENGES_ROOT, DEFAULT_LOCALE, REPO, STUDY_PLANS_ROOT } from "@/constants";
import { getChallengeByPath } from "./challenge";

export async function getStudyPlans(): Promise<StudyPlan[]> {
  const folders = fs.readdirSync(STUDY_PLANS_ROOT);

  console.log({ folders });
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

  return { title: info[DEFAULT_LOCALE].title, topics };
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
