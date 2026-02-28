"use client";

import React from "react";

import { ChallengeSlim } from "~/entities/challenge/model/types";
import { useCompletions } from "~/entities/completions/hooks/useCompletions";

type CompletionStatsProps = {
  challenges: ChallengeSlim[];
};

export default function CompletionStats(props: CompletionStatsProps) {
  const { completions } = useCompletions();
  const { challenges } = props;
  const completionsByCategory = challenges.filter((challenge) => completions.includes(challenge.no));

  return (
    <div className="flex flex-col justify-center gap-3">
      <div className="flex items-end gap-1">
        <div className="box-trim flex items-center text-3xl font-bold">{completionsByCategory.length}</div>
        <div className="text-muted-foreground/60 box-trim flex items-center">/</div>
        <div className="text-muted-foreground/60 box-trim flex items-center">{challenges.length}</div>
      </div>
      <div className="text-muted-foreground box-trim flex w-max items-center">Challenges Solved</div>
    </div>
  );
}
