import { getChallenges } from "@/utils/challenges";
import { CATEGORIES, DEFAULT_LOCALE } from "@/constants";
import { Layout } from "@/website/components/layout/Layout";
import Footer from "@/website/components/layout/Footer";
import { Hero } from "@/website/components/home/Hero";
import { Community } from "@/website/components/home/Community";
import { ChallengeList } from "@/website/components/challenges/ChallengeList";
import { CategoryList } from "@/website/components/home/CategoryList";

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
        <CategoryList challenges={challenges} categories={CATEGORIES as any} />
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
