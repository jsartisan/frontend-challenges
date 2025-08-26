import path from "path";
import fg from "fast-glob";

import type { ChallengeList } from "~/entities/challenge/model/types";

import { CHALLENGES_ROOT } from "~/entities/challenge/model/constants";

import { getChallengeByPathSlim } from "./getChallengeByPathSlim";

export async function getChallenges(): Promise<ChallengeList> {
  const folders = await fg("{0..9}*-*", {
    onlyDirectories: true,
    cwd: path.join(process.cwd(), CHALLENGES_ROOT),
  });

  const challenges = await Promise.all(
    folders.map(async (dir: string) => {
      const challenge = await getChallengeByPathSlim(dir);

      return challenge;
    }),
  );

  return challenges;
}
