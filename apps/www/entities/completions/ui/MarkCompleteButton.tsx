"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cn } from "~/utils/helpers";
import { useUiStore } from "~/shared/model/store";
import { useAuth } from "~/features/auth/hooks/useAuth";
import { useCompletions } from "~/entities/completions/hooks/useCompletions";
import { deleteCompletion } from "~/entities/completions/api/deleteCompletions";
import { createCompletion } from "~/entities/completions/api/createCompletions";
import { type Challenge, type SupportedTemplates } from "~/entities/challenge/model/types";
import { Button, Icon } from "~/components/ui";
import { Tooltip, TooltipTrigger } from "~/components/ui/tooltip";

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
    <TooltipTrigger delay={0}>
      <Button
        isPending={mutation.isPending || isCompletionsLoading}
        variant="secondary"
        onPress={onClick}
        className={cn({
          "hidden md:flex": true,
          "border-(--color-bd-positive) bg-(--color-bg-positive-subtle)": isCompleted,
          "hover:text-foreground-neutral-subtle-hover text-foreground": !isCompleted,
        })}
      >
        <Icon
          name="check-circle"
          className={cn({
            "text-(--color-fg-positive)": isCompleted,
          })}
        />
        {isCompleted ? "Completed" : "Mark as complete"}
      </Button>
      <Tooltip placement="bottom">
        {isCompleted ? "Mark as incomplete" : "Mark as complete"}
      </Tooltip>
    </TooltipTrigger>
  );
}
