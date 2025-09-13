import { Level } from "~/entities/challenge/model/types";
import { Round } from "~/features/mock-interview/model/constants";
import { Framework } from "~/entities/interview/context/InterviewContext";
import { getChallengesForQuizLevel } from "~/features/mock-interview/lib/getChallengesForQuizLevel";
import { getChallengeForMachineRound } from "~/features/mock-interview/lib/getChallengeForMachineRound";

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

  if (round == 1) {
    selected = await getChallengesForQuizLevel(level, framework, 1);
  }

  if (round == 2) {
    selected = await getChallengeForMachineRound(level, framework);
  }

  return new Response(JSON.stringify(selected), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
