"use client";

import { Challenge } from "@frontend-challenges/shared";

import CompletionStats from "./CompletionStats";
import Footer from "../../components/layout/Footer";
import { Layout } from "../../components/layout/Layout";
import type { ChallengeListWithFiltersProps } from "../../components/challenges/ChallengeListWithFilters";
import dynamic from "next/dynamic";

const ChallengeListWithFilters = dynamic(() => import("../../components/challenges/ChallengeListWithFilters"), {
  ssr: false,
});

type ClientProps = {
  challenges: Challenge[];
  scope?: string;
  filters?: Partial<ChallengeListWithFiltersProps["filters"]>;
  include?: ChallengeListWithFiltersProps["includes"];
};

export default function Client(props: ClientProps) {
  const { challenges, scope, include } = props;

  return (
    <>
      <Layout className="pb-12 pt-6">
        <div className="flex justify-between">
          <div>
            <div className="text-3xl font-bold">Challenges</div>
            <p className="w-full pb-6 pt-3 leading-relaxed text-[var(--color-fg-neutral)] md:w-2/4">
              Frontend Challenges is a collection of frontend interview questions and answers. It is designed to help
              you prepare for frontend interviews. It&apos;s free and open source.
            </p>
          </div>
          <CompletionStats challenges={challenges} />
        </div>
        <ChallengeListWithFilters challenges={challenges} scope={scope} includes={include} />
      </Layout>
      <Footer />
    </>
  );
}
