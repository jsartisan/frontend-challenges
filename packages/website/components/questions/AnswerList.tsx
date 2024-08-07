"use client";

import Link from "next/link";
import { Question, TEMPLATES } from "@frontend-challenges/shared";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Icon,
  IconButton,
  Button,
} from "../ui";

import Preview from "../editor/Preview";
import SandpackRoot from "../editor/SandpackRoot";
import { CodeEditor } from "../editor/CodeEditor";
import { useAnswers } from "packages/website/hooks/useAnswers";

type QuestionListProps = {
  challenge: Question;
};

export function AnswerList(props: QuestionListProps) {
  const { challenge } = props;
  const { isLoading, answers } = useAnswers(challenge);

  if (isLoading) {
    return (
      <div className="flex h-full flex-col justify-center gap-2 text-center">
        <p className="animate-spin text-3xl">⚙️</p>
        <p className="text-lg font-semibold">Loading answers...</p>
      </div>
    );
  }

  if ((answers || []).length === 0) {
    return (
      <div className="flex h-full flex-col justify-center gap-2 text-center">
        <p className="text-3xl">📋</p>
        <p className="text-lg font-semibold">No answers yet.</p>
        <p className="text-muted-foreground text-sm">Be the first to answer this question!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {(answers || []).map((answer, index) => (
        <div className="flex items-center" key={index}>
          <span className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full">
            <img className="aspect-square h-full w-full" alt="Avatar" src={answer.author_avatar_url} />
          </span>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none text-[var(--color-fg-subtle)]">{answer.author}</p>
            <Link
              href={answer.url}
              target="_blank"
              className="group flex items-center gap-1 underline decoration-[var(--color-bd)] underline-offset-4 hover:decoration-[var(--color-bd-hover)]"
            >
              <div className="flex items-center gap-2">
                <p className="text-muted-foreground text-sm">{answer.title}</p>
                <p className="text-[var(--color-fg-subtle)]">#{answer.no}</p>
              </div>
            </Link>
          </div>
          <div className="ml-auto">
            <Sheet>
              <SheetTrigger>
                <IconButton variant="secondary">
                  <Icon name="play" />
                </IconButton>
              </SheetTrigger>
              <SheetContent>
                <SandpackRoot
                  files={{
                    ...TEMPLATES[answer.template].files,
                    ...answer.files,
                  }}
                  className="flex !h-full flex-col"
                >
                  <SheetHeader className="h-20">
                    <SheetTitle>{answer.title}</SheetTitle>
                    <SheetDescription className="flex items-center">
                      <div>
                        <a href={answer.author_url} target="_blank" className="flex items-center" rel="noreferrer">
                          <span className="relative flex h-5 w-5 shrink-0 overflow-hidden rounded-full">
                            <img className="aspect-square h-full w-full" alt="Avatar" src={answer.author_avatar_url} />
                          </span>
                          <div className="ml-2 space-y-1">
                            <p className="text-sm font-medium leading-none">{answer.author}</p>
                          </div>
                        </a>
                      </div>
                      {/* view on github button */}
                      <div className="ml-auto">
                        <Button asChild variant="tertiary" className="flex gap-2">
                          <a href={answer.url} target="_blank" rel="noreferrer">
                            View on <Icon name="github" /> GitHub
                          </a>
                        </Button>
                      </div>
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid h-[calc(100%-theme(spacing.20))] flex-grow grid-cols-1 grid-rows-2 gap-3">
                    <CodeEditor
                      path={`/answers/${answer.no}`}
                      exclude={["/package.json"]}
                      className="flex-grow"
                      files={answer.files || {}}
                      template={answer.template}
                    />
                    <Preview template={answer.template} className="" />
                  </div>
                </SandpackRoot>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      ))}
    </div>
  );
}
