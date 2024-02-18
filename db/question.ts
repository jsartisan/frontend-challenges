import path from "path";
import fg from "fast-glob";

import { cleanUpReadme } from "@/utils";
import { parseMetaInfo } from "@/utils/questions";
import { Challenge, Question, QuestionMetaInfo } from "@/types";
import { getLocaleVariations } from "@/utils/locales";
import { DEFAULT_LOCALE, QUESTION_ROOT } from "@/constants";

import { getAnswersOfQuestion } from "./answers";
import { getCodeFilesByTemplate } from "./template";
import { bundleMarkdown } from "@/utils/markdown";

/**
 * get all questions
 *
 * @returns
 */
export async function getQuestions(): Promise<Question[]> {
  const folders = await fg("{0..9}*-*", {
    onlyDirectories: true,
    cwd: QUESTION_ROOT,
  });

  const quizzes = await Promise.all(folders.map(async (path: string) => getQuestionByPath(path)));

  return quizzes;
}

/**
 * get question by path
 *
 * @param path
 * @returns
 */
export async function getQuestionByPath(dir: string): Promise<Question> {
  const no = Number(dir.replace(/^(\d+)-.*/, "$1"));
  const difficulty = dir.replace(/^\d+-(.+?)-.*$/, "$1") as any;
  const info = await getLocaleVariations(path.join(QUESTION_ROOT, dir, "info.yml"), [parseMetaInfo]);
  const readme = await getLocaleVariations(path.join(QUESTION_ROOT, dir, "README.md"), [cleanUpReadme]);
  const templateFiles = await getCodeFilesByTemplate(path.join(QUESTION_ROOT, dir, "template.md"));
  const answers = await getAnswersOfQuestion(no, templateFiles);

  for (const locale of Object.keys(readme)) {
    readme[locale] = (await bundleMarkdown(readme[locale])).code;
  }

  return {
    no,
    difficulty,
    path: dir,
    info,
    readme,
    templateFiles,
    answers,
    type: "question",
  };
}

export function getQuestionInfoByLocale(quiz: Challenge, locale: string = DEFAULT_LOCALE) {
  const info = Object.assign({}, quiz.info[DEFAULT_LOCALE], quiz.info[locale]);
  info.tags = quiz.info[locale]?.tags || quiz.info[DEFAULT_LOCALE]?.tags || [];
  info.related = quiz.info[locale]?.related || quiz.info[DEFAULT_LOCALE]?.related || [];

  if (typeof info.tags === "string")
    info.tags = info.tags
      // @ts-expect-error type mismatch
      .split(",")
      .map((i: string) => i.trim())
      .filter(Boolean);

  return info as QuestionMetaInfo;
}

/**
 * get quizzes grouped by tag
 *
 * @param quizzes
 * @param locale
 * @param tag
 * @returns
 */
export function getQuizesByTag(quizzes: Challenge[], locale: string, tag: string) {
  return quizzes.filter((quiz) => {
    const info = getQuestionInfoByLocale(quiz, locale);

    return !!info.tags?.includes(tag);
  });
}

/**
 * get all tags from questions
 *
 * @param quizzes
 * @param locale
 * @returns
 */
export function getAllTags(quizzes: Challenge[], locale: string) {
  const set = new Set<string>();
  for (const quiz of quizzes) {
    const info = getQuestionInfoByLocale(quiz, locale);
    for (const tag of info?.tags || []) set.add(tag as string);
  }
  return Array.from(set).sort();
}
