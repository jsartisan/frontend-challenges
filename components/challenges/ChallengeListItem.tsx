import Link from "next/link";
import { Challenge } from "@/types";

import { Badge, BadgeProps, Card, Icon, IconButton, IconProps, Tooltip, TooltipContent, TooltipTrigger } from "../ui";

function ChallengeListItem(props: { challenge: Challenge; showTypeIcon?: boolean }) {
  const { challenge, showTypeIcon } = props;

  return (
    <Card key={challenge.no} className="flex px-4 py-3 md:px-4" role="listitem">
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
          <span className="text-xs text-[var(--color-fg-neutral-subtle)]">#{challenge.no}</span>
          {showTypeIcon && (
            <Badge variant={challenge.type == "question" ? "question" : "quiz"} className="px-1">
              <Icon name="code" size="sm" />
            </Badge>
          )}
          <div className="flex items-center gap-2">
            <Badge variant={challenge.difficulty as BadgeProps["variant"]}>{challenge.difficulty}</Badge>
            {challenge.info.en?.tags?.map((tag, index) => (
              <Badge key={index} variant="secondary" className="w-max">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        {/* <p className="text-sm text-[var(--color-fg-neutral-subtle)]">{challenge.info.en?.excerpt}</p> */}
      </div>
      {challenge.type === "question" && (
        <div className="hidden items-center sm:flex">
          <div className="flex items-center gap-1">
            {Object.keys(challenge.templateFiles).map((framework) => {
              return (
                <Tooltip key={framework}>
                  <TooltipTrigger asChild>
                    <IconButton size="lg" key={framework} asChild variant="tertiary">
                      <Link href={`challenges/${challenge.path}?template=${framework}`}>
                        <Icon name={`${framework}-color` as IconProps["name"]} />
                      </Link>
                    </IconButton>
                  </TooltipTrigger>

                  <TooltipContent>Available in {framework}</TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
}

export { ChallengeListItem };
