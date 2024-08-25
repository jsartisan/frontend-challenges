import { getChallenges } from "@frontend-challenges/backend";

import Client from "./client";

export default async function Page() {
  const challenges = await getChallenges();

  return <Client challenges={challenges} scope="all" />;
}
