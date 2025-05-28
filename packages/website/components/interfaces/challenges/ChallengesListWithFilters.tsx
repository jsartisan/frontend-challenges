"use client";

import { Challenge } from "@/shared/src/types";
import { useSearchParams } from "next/navigation";
import { ChallengesFilters } from "./ChallengesFilters";
import { getChallengesWithFilters } from "~/utils/challenges";
import { ChallengeList } from "~/components/interfaces/challenges/ChallengeList";

type ChallengeListWithFiltersProps = {
  challenges: Challenge[];
};

export function ChallengeListWithFilters(props: ChallengeListWithFiltersProps) {
  const { challenges } = props;
  const searchParams = useSearchParams();
  const filtered = getChallengesWithFilters(challenges, searchParams);

  return (
    <div className="flex flex-col gap-3">
      <ChallengesFilters />
      <ChallengeList challenges={filtered} />
    </div>
  );
}
