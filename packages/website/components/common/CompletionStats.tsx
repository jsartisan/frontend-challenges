"use client";

import React, { CSSProperties } from "react";
import { ChallengeSlim } from "@frontend-challenges/shared";
import { useCompletions } from "packages/website/hooks/useCompletions";

import { Icon, IconButton } from "../ui";
import { cn } from "../../utils/helpers";
import { useStats } from "../../hooks/useStats";
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from "../ui/popover";

type CompletionStatsProps = {
  challenges: ChallengeSlim[];
};

export default function CompletionStats(props: CompletionStatsProps) {
  const { completions } = useCompletions();
  const { challenges } = props;
  const { stats } = useStats({ challenges });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconButton
          variant="tertiary"
          className="rounded-full bg-[var(--color-bg-neutral)] text-[var(--color-fg-positive)]"
        >
          <Icon name="check-circle" size="sm" />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0" align="center">
        <div className="flex flex-col gap-4 p-3">
          <div className="flex h-[1cap] items-center text-lg font-bold text-[var(--color-fg-neutral)]">Completions</div>
          <div className="flex flex-col gap-3">
            <div className="flex items-end gap-1">
              <div className="flex h-[1cap] items-center text-3xl font-bold">{completions.length}</div>
              <div className="flex h-[1cap] items-center text-[var(--color-fg-neutral-subtle)]">/</div>
              <div className="flex h-[1cap] items-center text-[var(--color-fg-neutral-subtle)]">
                {challenges.length}
              </div>
            </div>
            <div className="flex h-[1cap] items-center text-[var(--color-fg-subtle)]">Challenges Solved</div>
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
                    "relative h-2 flex-grow overflow-hidden rounded-sm ": true,
                    "bg-[var(--color-bg-easy-subtle)]": difficulty === "easy",
                    "bg-[var(--color-bg-medium-subtle)]": difficulty === "medium",
                    "bg-[var(--color-bg-hard-subtle)]": difficulty === "hard",
                    "bg-[var(--color-bg-extreme-subtle)]": difficulty === "extreme",
                  })}
                >
                  <div
                    className={cn({
                      "h-full": true,
                      "bg-[var(--color-bg-easy)]": difficulty === "easy",
                      "bg-[var(--color-bg-medium)]": difficulty === "medium",
                      "bg-[var(--color-bg-hard)]": difficulty === "hard",
                      "bg-[var(--color-bg-extreme)]": difficulty === "extreme",
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
