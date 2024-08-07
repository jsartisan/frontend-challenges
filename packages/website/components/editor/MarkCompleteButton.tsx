"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Challenge, SupportedTemplates } from "@frontend-challenges/shared";

import { cn } from "../../utils/helpers";
import { useCompletions } from "../../hooks/useCompletions";
import { createCompletion, deleteCompletion } from "../../db/completions";
import { Button, Icon, Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from "../ui";

type ShareSolutionProps = {
  challenge: Challenge;
  template?: SupportedTemplates;
};

export default function MarkCompleteButton(props: ShareSolutionProps) {
  const { challenge } = props;
  const queryClient = useQueryClient();
  const { completions } = useCompletions();
  const isCompleted = completions.includes(`challenge-${challenge.no}`);

  const mutation = useMutation({
    mutationFn: isCompleted ? deleteCompletion : createCompletion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["completions"] });
    },
  });

  const onClick = () => {
    if (mutation.isPending) return;

    mutation.mutate({ challenge_id: challenge.no });
  };

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Button
          variant="secondary"
          onClick={onClick}
          className={cn({
            "hidden md:flex": true,
            "border-[var(--color-bd-positive)] bg-[var(--color-bg-positive-subtle)]": isCompleted,
            "hover:text-foreground-neutral-subtle-hover text-[var(--color-fg)]": !isCompleted,
          })}
        >
          <Icon
            name="check-circle"
            className={cn({
              "text-[var(--color-fg-positive)]": isCompleted,
            })}
          />
          {isCompleted ? "Completed" : "Mark as complete"}
        </Button>
      </TooltipTrigger>

      <TooltipContent side="bottom" sideOffset={8}>
        {isCompleted ? "Mark as incomplete" : "Mark as complete"}
        <TooltipArrow />
      </TooltipContent>
    </Tooltip>
  );
}
