import Link from "next/link";
import { Question } from "@/types";

import { Badge, BadgeProps, Card, Icon, IconButton, IconProps, Tooltip, TooltipContent, TooltipTrigger } from "../ui";

function QuestionListItem(props: { question: Question; showTypeIcon?: boolean }) {
  const { question, showTypeIcon } = props;

  return (
    <Card key={question.no} className="flex px-4 py-4 md:px-6" role="listitem">
      <div className="flex grow flex-col gap-2">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Link
              className="text-base font-medium text-[var(--color-fg-accent)] hover:underline"
              href={`/challenges/${question.path}`}
            >
              {question.info.en?.title}
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--color-fg-neutral-subtle)]">#{question.no}</span>
          {showTypeIcon && (
            <Badge variant="question" className="px-1">
              <Icon name="code" size="sm" />
            </Badge>
          )}
          <div className="flex items-center gap-2">
            <Badge variant={question.difficulty as BadgeProps["variant"]}>{question.difficulty}</Badge>
            {question.info.en?.tags?.map((tag, index) => (
              <Badge key={index} variant="secondary" className="w-max">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        {/* <p className="text-sm text-[var(--color-fg-neutral-subtle)]">{question.info.en?.excerpt}</p> */}
      </div>
      <div className="hidden items-center sm:flex">
        <div className="flex items-center gap-1">
          {Object.keys(question.templateFiles).map((framework) => {
            return (
              <Tooltip key={framework}>
                <TooltipTrigger asChild>
                  <IconButton size="lg" key={framework} asChild variant="tertiary">
                    <Link href={`challenges/${question.path}?template=${framework}`}>
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
    </Card>
  );
}

export { QuestionListItem };
