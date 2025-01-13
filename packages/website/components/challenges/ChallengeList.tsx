"use client";

import { Challenge } from "@/shared";

import { cn } from "../../utils/helpers";
import { ChallengeListItem } from "./ChallengeListItem";
import type { ChallengeListItemProps } from "./ChallengeListItem";

type ChallengeListProps = {
  challenges: Challenge[];
  showTypeIcon?: boolean;
  variant?: ChallengeListItemProps["variant"];
};

export function ChallengeList(props: ChallengeListProps) {
  const { challenges, variant = "default" } = props;

  return (
    <div className={cn("flex flex-col", variant === "compact" ? "gap-2" : "gap-3")}>
      {challenges.map((challenge) => (
        <ChallengeListItem variant={variant} key={challenge.path} challenge={challenge} />
      ))}
    </div>
  );
}
