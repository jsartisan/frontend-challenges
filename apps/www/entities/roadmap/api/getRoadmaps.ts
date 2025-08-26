import fs from "fs";

import type { Roadmap } from "~/entities/roadmap/model/types";

import { ROADMAP_ROOT } from "../model/constants";
import { getRoadmapByPath } from "./getRoadmapByPath";

export async function getRoadmaps(): Promise<Roadmap[]> {
  const folders = fs.readdirSync(ROADMAP_ROOT);

  const studyPlans = await Promise.all(folders.map(async (dir: string) => getRoadmapByPath(dir)));

  return studyPlans;
}
