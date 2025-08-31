import { Hero } from "~/screens/home/ui/Hero";
import { Community } from "~/screens/home/ui/Community";
import { CategoryList } from "~/entities/category/ui/CategoryList";
import { Leaderboard } from "~/features/leaderboard/ui/Leaderboard";
import { getChallenges } from "~/entities/challenge/api/getChallenges";
import { RecentlyAddedChallenges } from "~/screens/home/ui/RecentlyAddedChallenges";
import { sortChallengesByDate } from "~/entities/challenge/lib/sortChallengesByDate";
import { mapCategoriesWithCount } from "~/entities/category/lib/mapCategoriesWithCount";

export const dynamic = "force-static";

export async function HomePage() {
  const challenges = await getChallenges();
  const sortedChallenges = sortChallengesByDate(challenges, "desc").slice(0, 5);
  const categories = mapCategoriesWithCount(challenges);

  return (
    <>
      <Hero />
      <CategoryList categories={categories} />
      <div className="flex gap-6 py-4">
        <div className="flex-grow">
          <RecentlyAddedChallenges challenges={sortedChallenges} />
        </div>
        <div className="min-w-1/3">
          <Leaderboard />
        </div>
      </div>
      <Community />
    </>
  );
}
