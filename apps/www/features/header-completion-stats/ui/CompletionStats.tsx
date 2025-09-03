"use client";

import React, { CSSProperties } from "react";

import { cn } from "~/utils/helpers";
import { Icon, IconButton } from "~/components/ui";
import { ChallengeSlim } from "~/entities/challenge/model/types";
import { useCompletions } from "~/entities/completions/hooks/useCompletions";
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { useCompletionStats } from "~/features/header-completion-stats/hooks/useCompletionStats";

type CompletionStatsProps = {
  challenges: ChallengeSlim[];
};

export default function CompletionStats(props: CompletionStatsProps) {
  const { completions } = useCompletions();
  const { challenges } = props;
  const { stats } = useCompletionStats({ challenges });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconButton variant="tertiary" className="bg-(--color-bg-neutral) text-(--color-fg-positive) rounded-full">
          <Icon name="check-circle" size="sm" />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0" align="center">
        <div className="flex flex-col gap-4 p-3">
          <div className="text-(--color-fg-neutral) box-trim flex items-center text-lg font-bold">Completions</div>
          <div className="flex flex-col gap-3">
            <div className="flex items-end gap-1">
              <div className="box-trim flex items-center text-3xl font-bold">{completions.length}</div>
              <div className="text-(--color-fg-neutral-subtle) box-trim flex items-center">/</div>
              <div className="text-(--color-fg-neutral-subtle) box-trim flex items-center">{challenges.length}</div>
            </div>
            <div className="text-(--color-fg-subtle) box-trim flex items-center">Challenges Solved</div>
          </div>

          <div className="flex gap-2">
            {Object.keys(stats).map((difficulty) => {
              const { percentage } = stats[difficulty];
              const style: CSSProperties = {
                width: `${percentage}%`,
              };

              return (
                <div
                  key={difficulty}
                  className={cn({
                    "relative h-2 grow overflow-hidden rounded-sm": true,
                    "bg-(--color-bg-easy-subtle)": difficulty === "easy",
                    "bg-(--color-bg-medium-subtle)": difficulty === "medium",
                    "bg-(--color-bg-hard-subtle)": difficulty === "hard",
                    "bg-(--color-bg-extreme-subtle)": difficulty === "extreme",
                  })}
                >
                  <div
                    className={cn({
                      "h-full": true,
                      "bg-(--color-bg-easy)": difficulty === "easy",
                      "bg-(--color-bg-medium)": difficulty === "medium",
                      "bg-(--color-bg-hard)": difficulty === "hard",
                      "bg-(--color-bg-extreme)": difficulty === "extreme",
                    })}
                    style={style}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
        <PopoverArrow />
      </PopoverContent>
    </Popover>
  );
}
