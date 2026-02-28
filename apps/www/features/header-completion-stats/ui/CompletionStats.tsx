"use client";

import React, { CSSProperties } from "react";
import { DialogTrigger } from "react-aria-components";

import { cn } from "~/utils/helpers";
import { Icon } from "~/components/ui/icon";
import { IconButton } from "~/components/ui/icon-button";
import { ChallengeSlim } from "~/entities/challenge/model/types";
import { useCompletions } from "~/entities/completions/hooks/useCompletions";
import { Popover } from "~/components/ui/popover";
import { Dialog } from "~/components/ui/dialog";
import { useCompletionStats } from "~/features/header-completion-stats/hooks/useCompletionStats";

type CompletionStatsProps = {
  challenges: ChallengeSlim[];
};

export default function CompletionStats(props: CompletionStatsProps) {
  const { completions } = useCompletions();
  const { challenges } = props;
  const { stats } = useCompletionStats({ challenges });

  return (
    <DialogTrigger>
      <IconButton variant="ghost" className="bg-muted text-(--color-fg-positive) rounded-full">
        <Icon name="check-circle" size="sm" />
      </IconButton>
      <Popover showArrow placement="bottom" className="w-[250px]">
        <Dialog className="p-0">
          <div className="flex flex-col gap-4 p-3">
            <div className="text-muted-foreground box-trim flex items-center text-lg font-bold">Completions</div>
            <div className="flex flex-col gap-3">
              <div className="flex items-end gap-1">
                <div className="box-trim flex items-center text-3xl font-bold">{completions.length}</div>
                <div className="text-muted-foreground/60 box-trim flex items-center">/</div>
                <div className="text-muted-foreground/60 box-trim flex items-center">{challenges.length}</div>
              </div>
              <div className="text-muted-foreground box-trim flex items-center">Challenges Solved</div>
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
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
