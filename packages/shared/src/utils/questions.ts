import YAML from "js-yaml";

import { QuestionMetaInfo } from "../types";

/**
 * parses meta info from the yaml file
 *
 * @param s
 * @returns
 */
export function parseMetaInfo(s: string): Partial<QuestionMetaInfo> | undefined {
  const object = YAML.load(s) as any;
  if (!object) return undefined;

  const arrayKeys = ["tags", "related"];

  for (const key of arrayKeys) {
    if (object[key]) {
      object[key] = (object[key] || "")
        .toString()
        .split(",")
        .map((i: string) => i.trim())
        .filter(Boolean);
    } else {
      object[key] = undefined;
    }
  }

  return object;
}
