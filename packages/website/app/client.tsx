"use client";

import { Hero } from "../components/home/Hero";
import Footer from "../components/layout/Footer";
import { Layout } from "../components/layout/Layout";
import { useSyncScopeToSessionStorage } from "../hooks";
import { Community } from "../components/home/Community";
import { CategoryList } from "../components/home/CategoryList";
import { CATEGORIES, Challenge } from "@frontend-challenges/shared";
import { RecentlyAddedChallenges } from "../components/home/RecentlyAddedChallenges";

type ClientProps = {
  challenges: Challenge[];
  sortedChallenges: Challenge[];
};

export function Client(props: ClientProps) {
  const { challenges, sortedChallenges } = props;

  useSyncScopeToSessionStorage("all");

  return (
    <>
      <Layout>
        <Hero />
        <CategoryList challenges={challenges} categories={CATEGORIES as any} />
        <RecentlyAddedChallenges challenges={sortedChallenges} />
        <Community />
      </Layout>
      <Footer />
    </>
  );
}
