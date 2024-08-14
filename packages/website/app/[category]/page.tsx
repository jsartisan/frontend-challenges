import { CATEGORIES } from "@frontend-challenges/shared";
import { getChallenges } from "@frontend-challenges/backend";

import Footer from "../../components/layout/Footer";
import { Layout } from "../../components/layout/Layout";
import CompletionStats from "../challenges/CompletionStats";
import { ChallengeListWithFilters } from "../../components/challenges/ChallengeListWithFilters";

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
      <Layout className="pb-12 pt-6">
        <div className="flex">
          <div>
            <div className="text-3xl font-bold">Challenges</div>
            <div className="w-full pb-6 pt-3 leading-relaxed text-gray-500 md:w-2/4">
              Frontend Challenges is a collection of frontend interview questions and answers. It is designed to help
              you prepare for frontend interviews. It&apos;s free and open source.
            </div>
          </div>
          <CompletionStats challenges={challengesByCategory} />
        </div>
        <ChallengeListWithFilters includes={["difficulty"]} challenges={challengesByCategory} />
      </Layout>
      <Footer />
    </>
  );
}
