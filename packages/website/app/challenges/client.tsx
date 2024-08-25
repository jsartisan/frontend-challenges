"use client";

import { Challenge } from "@frontend-challenges/shared";

import CompletionStats from "./CompletionStats";
import Footer from "../../components/layout/Footer";
import { Layout } from "../../components/layout/Layout";
import { ChallengeListWithFilters } from "../../components/challenges/ChallengeListWithFilters";
import type { ChallengeListWithFiltersProps } from "../../components/challenges/ChallengeListWithFilters";

type ClientProps = {
  challenges: Challenge[];
  scope?: string;
  filters?: Partial<ChallengeListWithFiltersProps["filters"]>;
};

export default function Client(props: ClientProps) {
  const { challenges, scope } = props;

  return (
    <>
      <Layout className="pb-12 pt-6">
        <div className="flex justify-between">
          <div>
            <div className="text-3xl font-bold">Challenges</div>
            <div className="w-full pb-6 pt-3 leading-relaxed text-gray-500 md:w-2/4">
              Frontend Challenges is a collection of frontend interview questions and answers. It is designed to help
              you prepare for frontend interviews. It&apos;s free and open source.
            </div>
          </div>
          <CompletionStats challenges={challenges} />
        </div>
        <ChallengeListWithFilters challenges={challenges} scope={scope} includes={["difficulty"]} />
      </Layout>
      <Footer />
    </>
  );
}
