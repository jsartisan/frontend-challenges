import path from "path";
import fg from "fast-glob";

import { parseMetaInfo, cleanUpReadme } from "@frontend-challenges/shared";
import type { Category, Challenge, QuestionMetaInfo } from "@frontend-challenges/shared";
import { CATEGORIES, CHALLENGES_ROOT, DEFAULT_LOCALE, REPO } from "@frontend-challenges/shared";

import { getLocaleVariations } from "./locales";
import { getCodeFilesByTemplate } from "./templates";

export async function getChallenges(): Promise<Challenge[]> {
  const folders = await fg("{0..9}*-*", {
    onlyDirectories: true,
    cwd: CHALLENGES_ROOT,
  });

  const challenges = await Promise.all(folders.map(async (path: string) => getChallengeByPath(path)));

  return challenges;
}

export async function getChallengeByPath(dir: string): Promise<Challenge> {
  const no = Number(dir.replace(/^(\d+)-.*/, "$1"));
  const difficulty = dir.replace(/^\d+-(.+?)-.*$/, "$1") as any;
  const info = await getLocaleVariations(path.join(CHALLENGES_ROOT, dir, "info.yml"), [parseMetaInfo]);
  const readme = await getLocaleVariations(path.join(CHALLENGES_ROOT, dir, "README.md"), [cleanUpReadme]);
  const category = (() => {
    return CATEGORIES.find((category) => {
      return info?.en?.tags?.includes(category) || info?.en?.related?.includes(category);
    });
  })() as Category;
  const discussionURL = `${REPO}/discussions/${info?.[DEFAULT_LOCALE]?.discussionNo}`;
  const githubURL = `${REPO}/tree/main/challenges/${dir}`;

  const challenge = {
    no,
    difficulty,
    path: dir,
    info,
    category,
    discussionURL,
    githubURL,
  } as any;

  if (info?.[DEFAULT_LOCALE]?.type === "quiz") {
    const solution = await getLocaleVariations(path.join(CHALLENGES_ROOT, dir, "solution.md"), [cleanUpReadme]);

    return {
      ...challenge,
      readme,
      type: "quiz",
      solution,
    };
  }

  const templateFiles = await getCodeFilesByTemplate(path.join(CHALLENGES_ROOT, dir, "template.md"));

  // TODO
  // const answers = await getAnswersOfQuestion(no, templateFiles);

  return {
    ...challenge,
    templateFiles,
    answers: [],
    readme,
    type: info?.en?.type || "question",
  };
}

export function getChallengeInfoByLocale(quiz: Challenge, locale: string = DEFAULT_LOCALE) {
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

export function getChallengesByTag(quizzes: Challenge[], locale: string, tag: string) {
  return quizzes.filter((quiz) => {
    const info = getChallengeInfoByLocale(quiz, locale);

    return !!info.tags?.includes(tag);
  });
}

export function getAllTags(quizzes: Challenge[], locale: string) {
  const set = new Set<string>();
  for (const quiz of quizzes) {
    const info = getChallengeInfoByLocale(quiz, locale);
    for (const tag of info?.tags || []) set.add(tag as string);
  }
  return Array.from(set).sort();
}
