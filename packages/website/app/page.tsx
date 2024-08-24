import { getChallenges } from "@frontend-challenges/backend";
import { DEFAULT_LOCALE } from "@frontend-challenges/shared";

import { Client } from "./client";

export const dynamic = "force-static";

export default async function Page() {
  const challenges = await getChallenges();

  const sortedChallenges = challenges
    .sort((a, b) => {
      const aDate = new Date(a.info[DEFAULT_LOCALE]?.published_date || "1970-01-01");
      const bDate = new Date(b.info[DEFAULT_LOCALE]?.published_date || "1970-01-01");

      return bDate.getTime() - aDate.getTime();
    })
    .slice(0, 5);

  return <Client challenges={challenges} sortedChallenges={sortedChallenges} />;
}
