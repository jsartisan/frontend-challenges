import path from "path";

import { DEFAULT_LOCALE } from "~/shared/config/locale";
import { ChallengeSlim } from "~/entities/challenge/model/types";
import { CATEGORIES } from "~/entities/category/model/constants";
import { CHALLENGES_ROOT } from "~/entities/challenge/model/constants";
import { parseMetaInfo } from "~/entities/challenge/lib/parseMetaInfo";
import { getLocaleVariations } from "~/shared/lib/i18n/getLocaleVariations";
import { getTemplatesAvailable } from "~/entities/challenge/api/templates/getTemplatesAvailable";

export async function getChallengeByPathSlim(dir: string): Promise<ChallengeSlim> {
  const no = Number(dir.replace(/^(\d+)-.*/, "$1"));
  const info = await getLocaleVariations(path.join(CHALLENGES_ROOT, dir, "info.yml"), [parseMetaInfo]);
  const category = (() => {
    return (
      CATEGORIES.find((category) => {
        return info?.en?.tags?.includes(category) || info?.en?.related?.includes(category);
      }) ?? undefined
    );
  })();
  const readme = await getLocaleVariations(path.join(CHALLENGES_ROOT, dir, "README.md"), []);

  return {
    no,
    difficulty: info?.[DEFAULT_LOCALE]?.difficulty ?? "easy",
    path: dir,
    category,
    info,
    type: info?.[DEFAULT_LOCALE]?.type ?? "question",
    readme,
    templatesAvailable: await getTemplatesAvailable(path.join(CHALLENGES_ROOT, dir, "template.md")),
  };
}
