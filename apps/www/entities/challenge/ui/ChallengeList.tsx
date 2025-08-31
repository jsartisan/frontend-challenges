"use client";

import type { ChallengeListItemProps } from "~/entities/challenge/ui/ChallengeListItem";

import { cn } from "~/utils/helpers";
import { ChallengeListItem } from "~/entities/challenge/ui/ChallengeListItem";
import { ChallengeList as ChallengeListType } from "~/entities/challenge/model/types";

type ChallengeListProps = {
  showTypeIcon?: boolean;
  challenges: ChallengeListType;
  variant?: ChallengeListItemProps["variant"];
};

export function ChallengeList(props: ChallengeListProps) {
  const { challenges, variant = "default" } = props;

  return (
    <div className={cn("flex flex-col", variant === "compact" ? "gap-2" : "gap-3.5")}>
      {challenges.map((challenge) => (
        <ChallengeListItem variant={variant} key={challenge.path} challenge={challenge} />
      ))}
    </div>
  );
}
