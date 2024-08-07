import Link from "next/link";
import { Challenge } from "@frontend-challenges/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cn } from "../../utils/helpers";
import { useCompletions } from "../..//hooks/useCompletions";
import { createCompletion, deleteCompletion } from "../../db/completions";
import { Badge, BadgeProps, Card, Icon, IconButton, IconProps, Tooltip, TooltipContent, TooltipTrigger } from "../ui";

function ChallengeListItem(props: { challenge: Challenge; showTypeIcon?: boolean }) {
  const { challenge, showTypeIcon = true } = props;
  const queryClient = useQueryClient();
  const { completions } = useCompletions();
  const isCompleted = completions.includes(`challenge-${challenge.no}`);

  const mutation = useMutation({
    mutationFn: isCompleted ? deleteCompletion : createCompletion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["completions"] });
    },
  });

  const onMarkComplete = () => {
    if (mutation.isPending) return;

    mutation.mutate({ challenge_id: challenge.no });
  };

  return (
    <Card
      key={challenge.no}
      className={cn({
        "group/challenge flex px-4 py-3 md:px-4": true,
      })}
      data-completed={isCompleted ? "true" : undefined}
      role="listitem"
    >
      <div className="flex grow flex-col gap-2">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Link
              className="text-base font-medium text-[var(--color-fg-accent)] hover:underline"
              href={`/challenges/${challenge.path}`}
            >
              {challenge.info.en?.title}
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--color-fg-subtle)]">#{challenge.no}</span>
          {showTypeIcon && (
            <Tooltip delayDuration={300}>
              <TooltipTrigger>
                <Badge variant={challenge.type == "question" ? "question" : "quiz"} className="px-1">
                  <Icon name={challenge.type === "question" ? "code" : "file-text"} size="sm" />
                </Badge>
              </TooltipTrigger>
              <TooltipContent className="capitalize">{challenge.type}</TooltipContent>
            </Tooltip>
          )}
          <div className="flex items-center gap-2">
            <Badge variant={challenge.difficulty as BadgeProps["variant"]}>{challenge.difficulty}</Badge>
            {challenge.info.en?.tags?.map((tag, index) => (
              <Badge key={index} variant="secondary" className="w-max">
                {tag}
              </Badge>
            ))}
          </div>
          {challenge.type === "question" && (
            <div className="flex items-center gap-1">
              {Object.keys(challenge.templateFiles).map((framework) => {
                return (
                  <Tooltip key={framework} delayDuration={300}>
                    <TooltipTrigger asChild>
                      <span>
                        <Icon size="default" name={`${framework}-color` as IconProps["name"]} />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>Available in {framework}</TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          )}
        </div>
        {/* <p className="text-sm text-[var(--color-fg-neutral-subtle)]">{challenge.info.en?.excerpt}</p> */}
      </div>
      {
        <div className="hidden items-center sm:flex">
          <IconButton
            onClick={onMarkComplete}
            variant="tertiary"
            className="text-[var(--color-fg-neutral-subtle)] hover:bg-transparent active:bg-transparent"
            size="lg"
          >
            <Icon
              name={isCompleted ? "check" : "check-circle"}
              className="rounded-full group-[[data-completed]]/challenge:bg-[var(--color-bg-positive)] group-[[data-completed]]/challenge:text-[var(--color-fg-on-positive)]"
            />
          </IconButton>
        </div>
      }
    </Card>
  );
}

export { ChallengeListItem };
