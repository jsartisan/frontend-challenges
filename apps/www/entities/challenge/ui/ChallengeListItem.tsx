import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useUiStore } from "~/shared/model/store";
import { useAuth } from "~/features/auth/hooks/useAuth";
import { ChallengeSlim } from "~/entities/challenge/model/types";
import { useCompletions } from "~/entities/completions/hooks/useCompletions";
import { createCompletion } from "~/entities/completions/api/createCompletions";
import { deleteCompletion } from "~/entities/completions/api/deleteCompletions";
import { Badge, BadgeProps } from "~/components/ui/badge";
import { Card } from "~/components/ui/card";
import { Icon, IconProps } from "~/components/ui/icon";
import { IconButton } from "~/components/ui/icon-button";
import { Link } from "~/components/ui/link";
import { Tooltip, TooltipTrigger } from "~/components/ui/tooltip";

export type ChallengeListItemProps = {
  challenge: ChallengeSlim;
  showTypeIcon?: boolean;
  variant?: "default" | "compact";
};

function ChallengeListItem(props: ChallengeListItemProps) {
  const { challenge, showTypeIcon = true, variant } = props;
  const queryClient = useQueryClient();
  const { completions } = useCompletions();
  const { user } = useAuth();
  const ui = useUiStore();

  const isCompleted = completions.includes(challenge.no);

  const mutation = useMutation({
    mutationFn: isCompleted ? deleteCompletion : createCompletion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["completions"] });
    },
  });

  const onMarkComplete = () => {
    if (!user) {
      ui.toggleLoginModal(true);

      return;
    }

    if (mutation.isPending) return;

    mutation.mutate({ challenge_id: challenge.no, user_id: user.id });
  };

  if (variant === "compact") {
    return (
      <Link href={`/challenges/${challenge.path}`} key={challenge.path}>
        <Card className="hover:bg-accent flex items-center justify-between gap-2 p-2">
          <span className="font-semibold">{challenge.info.en?.title}</span>
          <Badge variant={challenge.difficulty as BadgeProps["variant"]}>{challenge.difficulty}</Badge>
        </Card>
      </Link>
    );
  }

  return (
    <Card
      className="group/challenge flex px-4 py-3 md:px-4"
      data-completed={isCompleted ? "true" : undefined}
      role="listitem"
    >
      <div className="flex grow flex-col gap-2">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Link
              prefetch={false}
              className="text-primary text-base font-medium hover:underline"
              href={`/challenges/${challenge.path}`}
            >
              {challenge.info.en?.title}
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-xs">#{challenge.no}</span>
          {showTypeIcon && (
            <TooltipTrigger delay={300}>
              <Badge variant={challenge.type == "question" ? "question" : "quiz"} className="px-1">
                <Icon name={challenge.type === "question" ? "code" : "file-text"} size="sm" />
              </Badge>
              <Tooltip placement="bottom" className="capitalize">
                {challenge.type}
              </Tooltip>
            </TooltipTrigger>
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
              {challenge.templatesAvailable.map((framework) => {
                return (
                  <TooltipTrigger key={framework} delay={300}>
                    <span>
                      <Icon size="default" name={`${framework}-color` as IconProps["name"]} />
                    </span>
                    <Tooltip>Available in {framework}</Tooltip>
                  </TooltipTrigger>
                );
              })}
            </div>
          )}
        </div>
        {/* <p className="text-sm text-(--color-fg-neutral-subtle)">{challenge.info.en?.excerpt}</p> */}
      </div>
      <div className="hidden items-center sm:flex">
        <IconButton
          onPress={onMarkComplete}
          variant="ghost"
          className="text-muted-foreground/60 hover:bg-transparent active:bg-transparent [&>svg]:size-6"
          size="lg"
        >
          <Icon
            name={isCompleted ? "check" : "check-circle"}
            className="group-data-completed/challenge:bg-(--color-bg-positive) group-data-completed/challenge:text-(--color-fg-on-positive) rounded-full"
          />
        </IconButton>
      </div>
    </Card>
  );
}

export { ChallengeListItem };
