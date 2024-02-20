import { Hero } from "@/components/home/Hero";
import { Community } from "@/components/home/Community";
import Footer from "@/components/layout/Footer";
import { DEFAULT_LOCALE } from "@/constants";
import { ChallengeList } from "@/components/challenges/ChallengeList";
import { getChallenges } from "@/db/challenge";

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
      <main className="h-full grow px-4 pb-16 sm:px-6 md:order-1">
        <div className="mx-auto max-w-screen-xl">
          <Hero />
          <div className="py-8" />
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-bold">Recently Added</h3>
              <p className="text-fg-subtle">The newest challenges added by the community</p>
            </div>
            <ChallengeList showTypeIcon challenges={sortedChallenges} />
          </div>
        </div>
      </main>
      <Community />
      <Footer />
    </>
  );
}
