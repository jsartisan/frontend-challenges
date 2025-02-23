"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Challenge, SupportedTemplates } from "@/shared";

import { cn } from "@/web/utils/helpers";
import { useCompletions } from "@/web/hooks/useCompletions";
import { createCompletion, deleteCompletion } from "@/web/db/completions";
import { Button, Icon, Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from "@/web/components/ui";
import { useAuth } from "packages/website/hooks/useAuth";
import { useUiStore } from "packages/website/store/ui";

type ShareSolutionProps = {
  challenge: Challenge;
  template?: SupportedTemplates;
};

export function MarkCompleteButton(props: ShareSolutionProps) {
  const { challenge } = props;
  const ui = useUiStore();
  const auth = useAuth();
  const queryClient = useQueryClient();
  const { completions, isLoading: isCompletionsLoading } = useCompletions();
  const isCompleted = completions.includes(challenge.no);

  const mutation = useMutation({
    mutationFn: isCompleted ? deleteCompletion : createCompletion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["completions"] });
    },
  });

  const onClick = () => {
    if (!auth.user) {
      ui.toggleLoginModal(true);

      return;
    }

    if (mutation.isPending) return;

    mutation.mutate({ challenge_id: challenge.no, user_id: auth.user.id });
  };

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Button
          isLoading={mutation.isPending || isCompletionsLoading}
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
