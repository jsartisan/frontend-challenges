import { getChallenges } from "@/db/challenge";
import { DEFAULT_LOCALE } from "@/constants";
import { Layout } from "@/components/layout/Layout";
import Footer from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Community } from "@/components/home/Community";
import { ChallengeList } from "@/components/challenges/ChallengeList";

export default async function Page() {
  const challenges = await getChallenges();

  const sortedChallenges = challenges
    .sort((a, b) => {
      const aDate = new Date(a.info[DEFAULT_LOCALE]?.published_date || "1970-01-01");
      const bDate = new Date(b.info[DEFAULT_LOCALE]?.published_date || "1970-01-01");

      return bDate.getTime() - aDate.getTime();
    })
    .slice(0, 5);

  return (
    <>
      <Layout>
        <Hero />
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold">Recently Added</h3>
            <p className="text-fg-subtle">The newest challenges added by the community</p>
          </div>
          <ChallengeList showTypeIcon challenges={sortedChallenges} />
        </div>
      </Layout>
      <Community />
      <Footer />
    </>
  );
}
