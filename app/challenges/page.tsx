import { getChallenges } from "@/db/challenge";
import Footer from "@/components/layout/Footer";
import { Layout } from "@/components/layout/Layout";
import { ChallengeListWithFilters } from "@/components/challenges/ChallengeListWithFilters";

export default async function Page() {
  const challenges = await getChallenges();

  return (
    <>
      <Layout className="pb-12 pt-8">
        <div className="text-3xl font-bold">Challenges</div>
        <div className="w-full pb-6 pt-3 leading-relaxed text-gray-500 md:w-2/4">
          Frontend Challenges is a collection of frontend interview questions and answers. It is designed to help you
          prepare for frontend interviews. It&apos;s free and open source.
        </div>
        <ChallengeListWithFilters challenges={challenges} />
      </Layout>
      <Footer />
    </>
  );
}
