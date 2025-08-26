import YAML from "js-yaml";

import { RoadmapInfo } from "~/entities/roadmap/model/types";

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
