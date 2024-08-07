"use client";

import { Challenge } from "@frontend-challenges/shared";
import { ChallengeListItem } from "./ChallengeListItem";

type ChallengeListProps = {
  challenges: Challenge[];
  showTypeIcon?: boolean;
};

export function ChallengeList(props: ChallengeListProps) {
  const { challenges } = props;

  return (
    <div className="flex flex-col gap-3">
      {challenges.map((challenge) => (
        <ChallengeListItem key={challenge.path} challenge={challenge} />
      ))}
    </div>
  );
}
