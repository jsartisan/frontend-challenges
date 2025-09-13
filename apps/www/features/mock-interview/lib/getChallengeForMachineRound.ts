import { getChallenges } from "~/entities/challenge/api";
import { Difficulty, Question } from "~/entities/challenge/model/types";
import { getChallengeByPath } from "~/entities/challenge/api/getChallengeByPath";
import { Level, Framework } from "~/entities/interview/context/InterviewContext";

const MACHINE_ROUND_RULES: Record<Level, Difficulty[]> = {
  junior: ["easy", "medium"],
  "mid-level": ["medium"],
  senior: ["medium", "hard"],
};

export async function getChallengeForMachineRound(level: Level, framework: Framework, usedPaths: string[] = []) {
  const challenges = (await getChallenges()).filter((c) => c.type === "question");

  // 1. filter by framework
  let frameworkPool;

  if (framework === "javascript") {
    frameworkPool = challenges.filter(
      (c) => c.info["en"]?.tags?.includes("javascript") || c.info["en"]?.tags?.includes("typescript"),
    );
  }

  if (framework === "react") {
    frameworkPool = challenges.filter((c) => c.info["en"]?.tags?.includes("react"));
  }

  console.log({ frameworkPool });

  // 3. Match difficulty for the candidate’s level
  const allowedDiffs = new Set(MACHINE_ROUND_RULES[level]);
  const levelPool = frameworkPool.filter((q) => allowedDiffs.has(q.difficulty));

  // 4. Remove already-used questions
  const freshPool = levelPool.filter((q) => !usedPaths.includes(q.path));

  // 5. Fallback hierarchy
  const pickFrom =
    freshPool.length > 0
      ? freshPool
      : levelPool.length > 0
        ? levelPool // allow repeats if we must
        : frameworkPool; // allow other difficulties if we must

  // 6. Pick one at random
  const chosen = pickFrom[Math.floor(Math.random() * pickFrom.length)];

  // 7. Hydrate with full content
  return getChallengeByPath(chosen.path) as Promise<Question>;
}
