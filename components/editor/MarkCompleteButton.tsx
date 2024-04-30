"use client";

import { Challenge, SupportedTemplates } from "@/types";
import { Icon, IconButton, Tooltip, TooltipArrow } from "@/components/ui";
import { cn } from "@/utils/helpers";
import { TooltipContent, TooltipTrigger } from "@/components/ui";
import { useUiStore } from "@/store/ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCompletion, deleteCompletion } from "@/db/completions";
import { useCompletions } from "@/hooks/useCompletions";
import { useAuth } from "@/hooks/useAuth";

type ShareSolutionProps = {
  challenge: Challenge;
  template?: SupportedTemplates;
};

export default function MarkCompleteButton(props: ShareSolutionProps) {
  const { challenge } = props;
  const ui = useUiStore();
  const auth = useAuth();
  const queryClient = useQueryClient();
  const { completions } = useCompletions();
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
      <TooltipTrigger>
        <IconButton
          isLoading={mutation.isPending}
          variant="tertiary"
          onClick={onClick}
          className={cn({
            "text-foreground-success": isCompleted,
            "text-foreground-neutral-subtle hover:text-foreground-neutral-subtle-hover": !isCompleted,
          })}
        >
          <Icon name="check-circle" />
        </IconButton>
      </TooltipTrigger>

      <TooltipContent side="right">
        {isCompleted ? "Mark as incomplete" : "Mark as complete"}
        <TooltipArrow />
      </TooltipContent>
    </Tooltip>
  );
}
