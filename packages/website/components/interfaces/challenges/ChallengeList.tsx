"use client";

import { cn } from "~/utils/helpers";
import { ChallengeListItem } from "./ChallengeListItem";
import type { ChallengeListItemProps } from "./ChallengeListItem";
import { type ChallengeList as ChallengeListType } from "@/shared";

type ChallengeListProps = {
  showTypeIcon?: boolean;
  challenges: ChallengeListType;
  variant?: ChallengeListItemProps["variant"];
};

export function ChallengeList(props: ChallengeListProps) {
  const { variant = "default", challenges } = props;

  return (
    <div className={cn("flex flex-col", variant === "compact" ? "gap-2" : "gap-3")}>
      {challenges.map((challenge) => (
        <ChallengeListItem variant={variant} key={challenge.path} challenge={challenge} />
      ))}
    </div>
  );
}
