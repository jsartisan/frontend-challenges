"use client";

import { useSearchParams } from "next/navigation";

import { ChallengeList } from "~/entities/challenge/ui/ChallengeList";
import { ChallengesFilters } from "~/features/challenge-filter/ui/ChallengesFilters";
import { type ChallengeList as ChallengeListType } from "~/entities/challenge/model/types";
import { getChallengesWithFilters } from "~/entities/challenge/lib/getChallengesWithFilters";

type ChallengeListWithFiltersProps = {
  challenges: ChallengeListType;
  excludes?: ("category" | "difficulty" | "type")[];
};

export function ChallengeListWithFilters(props: ChallengeListWithFiltersProps) {
  const { challenges, excludes = [] } = props;
  const searchParams = useSearchParams();
  const filtered = getChallengesWithFilters(challenges, searchParams as URLSearchParams);

  return (
    <div className="flex flex-col gap-3">
      <ChallengesFilters excludes={excludes} />
      <ChallengeList challenges={filtered} />
    </div>
  );
}
