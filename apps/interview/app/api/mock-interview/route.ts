import { Framework, Round } from "entities/interview/context/InterviewContext";
import { getChallengesForQuizLevel } from "features/mock-interview/lib/getChallengesForQuizLevel";
import { getChallengeForMachineRound } from "features/mock-interview/lib/getChallengeForMachineRound";

import { Level } from "~/entities/challenge/model/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const level = searchParams.get("level") as Level | null;
  const framework = searchParams.get("framework") as Framework | null;
  const round = searchParams.get("round") as Round | null;
  // Ensure we parse the count as a decimal number (radix 10). Radix 1 is invalid and returns NaN.

  if (!level || !framework || !round) {
    return new Response("Missing required parameters", { status: 400 });
  }

  let selected: any;

  if (round == "quiz") {
    selected = await getChallengesForQuizLevel(level, framework, 3);
  }

  if (round == "matching-coding") {
    selected = await getChallengeForMachineRound(level, framework);
  }

  return new Response(JSON.stringify(selected), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
