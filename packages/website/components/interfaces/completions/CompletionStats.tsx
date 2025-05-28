"use client";

import React from "react";
import { ChallengeSlim } from "@/shared";
import { useCompletions } from "~/hooks/useCompletions";

type CompletionStatsProps = {
  challenges: ChallengeSlim[];
};

export default function CompletionStats(props: CompletionStatsProps) {
  const { completions } = useCompletions();
  const { challenges } = props;
  const completionsByCategory = challenges.filter((challenge) => completions.includes(`challenge-${challenge.no}`));

  return (
    <div className="flex flex-col justify-center gap-3">
      <div className="flex items-end gap-1">
        <div className="flex h-[1cap] items-center text-3xl font-bold">{completionsByCategory.length}</div>
        <div className="flex h-[1cap] items-center text-[var(--color-fg-neutral-subtle)]">/</div>
        <div className="flex h-[1cap] items-center text-[var(--color-fg-neutral-subtle)]">{challenges.length}</div>
      </div>
      <div className="flex h-[1cap] w-max items-center text-[var(--color-fg-subtle)]">Challenges Solved</div>
    </div>
  );
}
