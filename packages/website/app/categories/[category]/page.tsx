import { CATEGORIES } from "@frontend-challenges/shared";
import { getChallenges } from "@frontend-challenges/backend";

import Client from "../../challenges/client";
import Footer from "../../../../website/components/layout/Footer";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    category,
  }));
}

export default async function Page(props: any) {
  const challenges = await getChallenges();
  const challengesByCategory = challenges.filter((challenge) =>
    challenge.info?.en?.tags?.includes(props.params.category),
  );

  return (
    <>
      <Client challenges={challengesByCategory} scope={props.params.category} />
      <Footer />
    </>
  );
}
