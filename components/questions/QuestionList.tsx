"use client";

import Link from "next/link";
import { Question } from "@/types";
import { Badge, BadgeProps, Card, Icon, IconButton, IconProps, Tooltip, TooltipContent, TooltipTrigger } from "../ui";

type QuestionListProps = {
  questions: Question[];
};

export function QuestionList(props: QuestionListProps) {
  const { questions } = props;

  return (
    <div className="flex flex-col gap-3">
      {questions.map((question) => {
        return (
          <Card key={question.no} className="flex items-center space-x-6 px-4 py-4 md:px-6" role="listitem">
            <div className="flex grow flex-col gap-2">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Link
                    className="text-base font-medium text-[var(--color-fg-accent)] hover:underline"
                    href={`questions/${question.path}`}
                  >
                    {question.info.en?.title}
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--color-fg-neutral-subtle)]">#{question.no}</span>
                <div className="flex items-center gap-1">
                  <Badge variant={question.difficulty as BadgeProps["variant"]}>{question.difficulty}</Badge>
                  {question.info.en?.tags?.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              {/* <p className="text-sm text-[var(--color-fg-neutral-subtle)]">{question.info.en?.excerpt}</p> */}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {Object.keys(question.templateFiles).map((framework) => {
                  return (
                    <Tooltip key={framework}>
                      <TooltipTrigger>
                        <IconButton size="lg" key={framework} asChild variant="tertiary">
                          <Link href={`questions/${question.path}?template=${framework}`}>
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
      })}
    </div>
  );
}
