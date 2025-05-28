import { CATEGORIES } from "@/shared";
import { getChallenges } from "@frontend-challenges/backend";
import { filterChallengesByCategory } from "../../../utils/challenges";

import Client from "../../(editor)/challenges/client";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    category,
  }));
}

export default async function Page(props: any) {
  const challenges = await getChallenges();
  const challengesByCategory = filterChallengesByCategory(challenges, props.params.category);

  return <Client challenges={challengesByCategory} scope={props.params.category} include={["difficulty"]} />;
}
