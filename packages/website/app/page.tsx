import { getChallenges } from "@frontend-challenges/backend";

import { Client } from "./client";
import { Hero } from "../components/home/Hero";
import Footer from "../components/layout/Footer";
import { Layout } from "../components/layout/Layout";
import { Community } from "../components/home/Community";
import { CategoryList } from "../components/home/CategoryList";
import { getSortedChallengesByDate } from "../utils/challenges";
import { getCategoriesWithChallengesCount } from "../utils/categories";
import { RecentlyAddedChallenges } from "../components/home/RecentlyAddedChallenges";

export const dynamic = "force-static";

export default async function Page() {
  const challenges = await getChallenges();
  const sortedChallenges = getSortedChallengesByDate(challenges, 5);
  const categories = getCategoriesWithChallengesCount(challenges);

  return (
    <Client>
      <Layout>
        <Hero />
        <CategoryList categories={categories} />
        <RecentlyAddedChallenges challenges={sortedChallenges} />
        <Community />
      </Layout>
      <Footer />
    </Client>
  );
}
