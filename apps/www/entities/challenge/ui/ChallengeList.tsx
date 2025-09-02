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

  if (challenges.length === 0) {
    return (
      <div className={cn("flex flex-col justify-center gap-2 py-20 text-center")}>
        <p className="text-3xl">📋</p>
        <p className="text-lg font-semibold">No challenges for the applied filters.</p>
        <p className="text-muted-foreground text-sm">Try with different filters.</p>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col", variant === "compact" ? "gap-2" : "gap-4")}>
      {challenges.map((challenge) => (
        <ChallengeListItem variant={variant} key={challenge.path} challenge={challenge} />
      ))}
    </div>
  );
}
