import path from "path";
import fg from "fast-glob";
import YAML from "js-yaml";

import { cleanUpReadme, loadFile } from "@/utils";
import { parseMetaInfo } from "@/utils/questions";
import { Category, Challenge, QuestionMetaInfo, StudyPlan, StudyPlanInfo } from "@/types";
import { getLocaleVariations } from "@/utils/locales";
import { CATEGORIES, CHALLENGES_ROOT, DEFAULT_LOCALE, REPO, STUDY_PLANS_ROOT } from "@/constants";
import { getChallengeByPath } from "./challenge";

export async function getStudyPlans(): Promise<StudyPlan[]> {
  const files = await fg("**.yml", {
    cwd: STUDY_PLANS_ROOT,
  });

  console.log({ files });
  //   const studyPlans = await Promise.all(files.map(async (path: string) => getStudyPlanByPath(path)));

  return [];
}

export async function getStudyPlanByPath(filename: string): Promise<StudyPlan> {
  const file = await loadFile(path.join(STUDY_PLANS_ROOT, `${filename}.yml`));

  if (!file) {
    throw new Error(`Study plan not found: ${filename}`);
  }

  const info = parseStudyPlan(file);

  const challenges = await Promise.all(
    info.challenges.map(async (challengePath: string) => {
      const challenge = await getChallengeByPath(challengePath);
      return challenge;
    }),
  );

  return { ...info, challenges };
}

export function parseStudyPlan(s: string): StudyPlanInfo {
  const object = YAML.load(s) as any;

  const arrayKeys = ["tags", "related"];

  for (const key of arrayKeys) {
    if (object[key]) {
      object[key] = (object[key] || "")
        .toString()
        .split(",")
        .map((i: string) => i.trim())
        .filter(Boolean);
    }
  }

  return object;
}
