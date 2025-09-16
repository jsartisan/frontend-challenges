import { DeepPartial } from "utility-types";
import { Framework, Level } from "entities/interview/context/InterviewContext";

import { getChallenges } from "~/entities/challenge/api";
import { getChallengeByPath } from "~/entities/challenge/api/getChallengeByPath";
import { Difficulty, QuestionMetaInfo, Quiz } from "~/entities/challenge/model/types";

const LEVEL_SELECTION_RULES: Record<Level, { easy: number; medium: number; hard: number }> = {
  junior: { easy: 0.7, medium: 0.3, hard: 0 },
  "mid-level": { easy: 0.4, medium: 0.5, hard: 0.1 },
  senior: { easy: 0.2, medium: 0.5, hard: 0.3 },
};

export async function getChallengesForQuizLevel(level: Level, framework: Framework, total = 5) {
  const challenges = await getChallenges();
  const quizzes = challenges.filter((c) => c.type === "quiz") as unknown as Quiz[];

  const selected = await Promise.all(
    (level ? pickQuestionsForLevel(quizzes, level, framework, total) : quizzes).map(async (c) => {
      return await getChallengeByPath(c.path);
    }),
  );

  return selected;
}

function pickQuestionsForLevel(challenges: Quiz[], level: Level, framework: Framework | null, totalCount = 10): Quiz[] {
  // Split into react-tagged and others (treated as JavaScript)
  const reactQuizzes: Quiz[] = [];
  const jsQuizzes: Quiz[] = [];

  for (const quiz of challenges) {
    const meta = quiz.info["en"] as DeepPartial<QuestionMetaInfo>;
    const tags = meta.tags ?? [];
    if (tags.includes("react")) {
      reactQuizzes.push(quiz);
    } else {
      jsQuizzes.push(quiz);
    }
  }

  // If framework is JavaScript or not specified, select only JS quizzes
  if (framework === "javascript" || !framework) {
    return selectByDifficulty(jsQuizzes, totalCount, level);
  }

  // At this point framework === 'react'
  const reactCount = Math.round(totalCount * 0.7);
  const jsCount = totalCount - reactCount;

  let selectedReact = selectByDifficulty(reactQuizzes, reactCount, level);
  let selectedJS = selectByDifficulty(jsQuizzes, jsCount, level);

  // In case we don't have enough react questions, fill with js and vice-versa
  if (selectedReact.length < reactCount) {
    const additional = selectByDifficulty(jsQuizzes, reactCount - selectedReact.length, level);
    selectedJS = [...selectedJS, ...additional];
  }

  if (selectedJS.length < jsCount) {
    const additional = selectByDifficulty(reactQuizzes, jsCount - selectedJS.length, level);
    selectedReact = [...selectedReact, ...additional];
  }

  return [...selectedReact, ...selectedJS].slice(0, totalCount);
}

// Helper to pick questions based on difficulty rules from a given pool
const selectByDifficulty = (pool: Quiz[], count: number, level: Level = "junior"): Quiz[] => {
  const rules = LEVEL_SELECTION_RULES[level];
  const byDifficulty: Record<Difficulty, Quiz[]> = { easy: [], medium: [], hard: [], extreme: [] };

  for (const quiz of pool) {
    if (quiz.difficulty) {
      byDifficulty[quiz.difficulty]?.push(quiz);
    }
  }

  const selected: Quiz[] = [];
  for (const diff of Object.keys(rules) as Difficulty[]) {
    const portion = Math.round(count * rules[diff]);
    const diffPool = byDifficulty[diff];

    if (diffPool && diffPool.length > 0) {
      const shuffled = [...diffPool].sort(() => Math.random() - 0.5);
      selected.push(...shuffled.slice(0, portion));
    }
  }

  // If after applying the distribution we still need more, fill randomly from remaining pool
  if (selected.length < count) {
    const remaining = pool.filter((q) => !selected.includes(q));
    const shuffled = [...remaining].sort(() => Math.random() - 0.5);
    selected.push(...shuffled.slice(0, count - selected.length));
  }

  return selected.slice(0, count);
};
