import path from "path";

import type { Challenge } from "~/entities/challenge/model/types";

import { REPO } from "~/shared/config/paths";
import { DEFAULT_LOCALE } from "~/shared/config/locale";
import { bundleMarkdown } from "~/shared/lib/bundleMarkdown";
import { CATEGORIES } from "~/entities/category/model/constants";
import { CHALLENGES_ROOT } from "~/entities/challenge/model/constants";
import { parseMetaInfo } from "~/entities/challenge/lib/parseMetaInfo";
import { cleanUpReadme } from "~/entities/challenge/lib/cleanUpReadme";
import { getLocaleVariations } from "~/shared/lib/i18n/getLocaleVariations";
import { getCodeFilesByTemplate } from "~/entities/challenge/api/templates/getCodeFilesByTemplates";

export async function getChallengeByPath(dir: string): Promise<Challenge> {
  const no = Number(dir.replace(/^(\d+)-.*/, "$1"));
  const info = await getLocaleVariations(path.join(CHALLENGES_ROOT, dir, "info.yml"), [parseMetaInfo]);
  const readmeRaw = await getLocaleVariations(path.join(CHALLENGES_ROOT, dir, "README.md"), [cleanUpReadme]);
  const category = (() => {
    return CATEGORIES.find((category) => {
      return info?.en?.tags?.includes(category) || info?.en?.related?.includes(category);
    });
  })();
  const discussionURL = `${REPO}/discussions/${info?.[DEFAULT_LOCALE]?.discussionNo}`;
  const githubURL = `${REPO}/tree/main/challenges/${dir}`;
  const editURL = `${REPO}/blob/main/challenges/${dir}`.replace(".com", ".dev");

  const readme = {};

  for (const locale of Object.keys(readmeRaw)) {
    readme[locale] = (await bundleMarkdown(readmeRaw[locale])).code;
  }

  const challenge = {
    no,
    difficulty: info?.[DEFAULT_LOCALE]?.difficulty,
    path: dir,
    info,
    category,
    discussionURL,
    githubURL,
    editURL,
  } as any;

  if (info?.[DEFAULT_LOCALE]?.type === "quiz") {
    const solutionRaw = await getLocaleVariations(path.join(CHALLENGES_ROOT, dir, "solution.md"), [cleanUpReadme]);

    const solution = {};

    for (const locale of Object.keys(solutionRaw)) {
      solution[locale] = (await bundleMarkdown(solutionRaw[locale])).code;
    }

    return {
      ...challenge,
      readme,
      readmeRaw,
      type: "quiz",
      solution,
      solutionRaw,
    };
  }

  const templateFiles = await getCodeFilesByTemplate(path.join(CHALLENGES_ROOT, dir, "template.md"));

  return {
    ...challenge,
    templateFiles,
    answers: [],
    readme,
    readmeRaw,
    type: info?.en?.type || "question",
  };
}
