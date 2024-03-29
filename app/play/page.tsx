import { getChallenges } from "@/db/challenge";
import { Header } from "@/components/layout/Header";

import Client from "./client";

export default async function Page() {
  const challenges = await getChallenges();
  return (
    <>
      <Header challenges={challenges.map((challenge) => ({ path: challenge.path, title: challenge.info.en?.title }))} />
      <Client />
    </>
  );
}
