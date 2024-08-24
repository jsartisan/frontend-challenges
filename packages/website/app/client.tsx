"use client";

import { useEffect } from "react";

import { Hero } from "../components/home/Hero";
import Footer from "../components/layout/Footer";
import { Layout } from "../components/layout/Layout";
import { Community } from "../components/home/Community";
import { CategoryList } from "../components/home/CategoryList";
import { ChallengeList } from "../components/challenges/ChallengeList";
import { CATEGORIES, Challenge, STORAGE_KEY } from "@frontend-challenges/shared";

type ClientProps = {
  challenges: Challenge[];
  sortedChallenges: Challenge[];
};

export function Client(props: ClientProps) {
  const { challenges, sortedChallenges } = props;

  useEffect(() => {
    sessionStorage.setItem(`${STORAGE_KEY}:scope`, "all");
  }, []);

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
