import { getChallenges } from "@frontend-challenges/backend";

import { Client } from "./client";
import { getSortedChallengesByDate } from "../utils/challenges";

export const dynamic = "force-static";

export default async function Page() {
  const challenges = await getChallenges();
  const sortedChallenges = getSortedChallengesByDate(challenges, 5);

  return <Client challenges={challenges} sortedChallenges={sortedChallenges} />;
}
