import path from "path";
import fg from "fast-glob";

import { Quiz } from "@/types";
import { QUIZ_ROOT } from "@/constants";
import { cleanUpReadme, getLocaleVariations } from "@/utils";
import { parseMetaInfo } from "@/utils/questions";
import { bundleMarkdown } from "@/utils/markdown";
import { getAnswersOfQuiz } from "./answers";

/**
 * get all questions
 *
 * @returns
 */
export async function getQuizes(): Promise<Quiz[]> {
  const folders = await fg("{0..9}*-*", {
    onlyDirectories: true,
    cwd: QUIZ_ROOT,
  });

  const quizzes = await Promise.all(folders.map(async (path: string) => getQuizByPath(path)));

  return quizzes;
}

/**
 * get question by path
 *
 * @param path
 * @returns
 */
export async function getQuizByPath(dir: string): Promise<Quiz> {
  const no = Number(dir.replace(/^(\d+)-.*/, "$1"));
  const difficulty = dir.replace(/^\d+-(.+?)-.*$/, "$1") as any;
  const info = await getLocaleVariations(path.join(QUIZ_ROOT, dir, "info.yml"), [parseMetaInfo]);
  const readme = await getLocaleVariations(path.join(QUIZ_ROOT, dir, "README.md"), [cleanUpReadme]);
  const answers = await getAnswersOfQuiz(no);

  for (const locale of Object.keys(readme)) {
    readme[locale] = (await bundleMarkdown(readme[locale])).code;
  }

  return {
    no,
    difficulty,
    path: dir,
    info,
    readme,
    type: "quiz",
    answers,
  };
}
