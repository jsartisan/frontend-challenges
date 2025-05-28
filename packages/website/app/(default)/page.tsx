import { getChallenges } from "@frontend-challenges/backend";

import { Hero } from "~/components/interfaces/home/Hero";
import { getSortedChallengesByDate } from "~/utils/challenges";
import { Community } from "~/components/interfaces/home/Community";
import { getCategoriesWithChallengesCount } from "~/utils/categories";
import { CategoryList } from "~/components/interfaces/home/CategoryList";
import { RecentlyAddedChallenges } from "~/components/interfaces/home/RecentlyAddedChallenges";

export const dynamic = "force-static";

export default async function Page() {
  const challenges = await getChallenges();
  const sortedChallenges = getSortedChallengesByDate(challenges, 5);
  const categories = getCategoriesWithChallengesCount(challenges);

  return (
    <>
      <Hero />
      <CategoryList categories={categories} />
      <RecentlyAddedChallenges challenges={sortedChallenges} />
      <Community />
    </>
  );
}
