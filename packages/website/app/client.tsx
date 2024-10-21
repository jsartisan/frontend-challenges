"use client";

import { Challenge } from "@frontend-challenges/shared";

import { Hero } from "../components/home/Hero";
import Footer from "../components/layout/Footer";
import { Layout } from "../components/layout/Layout";
import { useSyncScopeToSessionStorage } from "../hooks";
import { Community } from "../components/home/Community";
import { CategoryList } from "../components/home/CategoryList";
import { getCategoriesWithChallengesCount } from "../utils/categories";
import { RecentlyAddedChallenges } from "../components/home/RecentlyAddedChallenges";

type ClientProps = {
  challenges: Challenge[];
  sortedChallenges: Challenge[];
};

export function Client(props: ClientProps) {
  const { challenges, sortedChallenges } = props;
  const categories = getCategoriesWithChallengesCount(challenges);

  useSyncScopeToSessionStorage("all");

  return (
    <>
      <Layout>
        <Hero />
        <CategoryList categories={categories} />
        <RecentlyAddedChallenges challenges={sortedChallenges} />
        <Community />
      </Layout>
      <Footer />
    </>
  );
}
