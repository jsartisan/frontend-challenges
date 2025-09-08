import dynamic from "next/dynamic";
import { ComponentPropsWithoutRef } from "react";

import { cn } from "~/utils/helpers";
import { Preview } from "~/features/code-editor/ui/Preview";
import { useAnswers } from "~/entities/answer/hooks/useAnswers";
import { type Question } from "~/entities/challenge/model/types";
import { TEMPLATES } from "~/entities/challenge/model/templates";
import { SandpackRoot } from "~/features/code-editor/ui/SandpackRoot";
import { ResizableLayoutPanel } from "~/features/code-editor/ui/ResizableLayoutPanel";
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
  Link,
  Skeleton,
  ResizablePanelGroup,
  ResizablePanel,
} from "~/components/ui";

const CodeEditor = dynamic(() => import("~/features/code-editor/ui/File").then((mod) => mod.File), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full" />,
});

type AnswerListProps = ComponentPropsWithoutRef<"div"> & {
  challenge: Question;
};

export function AnswerList(props: AnswerListProps) {
  const { challenge, className, ...rest } = props;
  const { answers, isLoading } = useAnswers(challenge);

  if (isLoading) {
    return (
      <div className={cn("flex flex-col gap-4", className)} {...rest}>
        {[...Array(3)].map((_, index) => (
          <div className="flex items-center gap-4" key={index}>
            <Skeleton className="flex h-9 w-9 shrink-0 overflow-hidden rounded-full" />
            <div className="flex grow flex-col gap-2">
              <Skeleton className="h-4 w-1/2 rounded-sm" />
              <Skeleton className="h-4 w-3/4 rounded-sm" />
            </div>
            <div className="ml-auto">
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if ((answers || []).length === 0) {
    return (
      <div className={cn("flex h-full flex-col justify-center gap-2 text-center", className)} {...rest}>
        <p className="text-3xl">📋</p>
        <p className="text-lg font-semibold">No answers yet.</p>
        <p className="text-muted-foreground text-sm">Be the first to answer this question!</p>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-4", className)} {...rest}>
      {(answers || []).map((answer, index) => (
        <div className="flex items-center" key={index}>
          <span className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full">
            <img className="aspect-square h-full w-full" alt="Avatar" src={answer.author_avatar_url} />
          </span>
          <div className="ml-4 space-y-1">
            <p className="text-(--color-fg-subtle) text-sm font-medium leading-none">{answer.author}</p>
            <Link
              href={answer.url}
              target="_blank"
              className="decoration-(--color-bd) hover:decoration-(--color-bd-hover) group flex items-center gap-1 underline underline-offset-4"
            >
              <div className="flex items-center gap-2">
                <p className="text-muted-foreground text-sm">{answer.title}</p>
                <p className="text-(--color-fg-subtle)">#{answer.no}</p>
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
                  template={answer.template}
                  className="h-full! flex flex-col"
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
                  <div className="grid h-[calc(100%-(--spacing(20)))]">
                    <ResizablePanelGroup direction="vertical" className="flex flex-col gap-3">
                      <ResizablePanel>
                        <ResizableLayoutPanel
                          defaultValue={
                            Object.keys(answer.files).find((file) => answer.files[file].active) ||
                            Object.keys(answer.files)[0]
                          }
                        >
                          {Object.keys(answer.files).map((file) => ({
                            title: file,
                            value: file,
                            children: (
                              <CodeEditor
                                path={`/answers/${answer.no}`}
                                template={answer.template}
                                file={file}
                                key={`${answer.no}-${file}`}
                                originalFiles={{
                                  ...TEMPLATES[answer.template].files,
                                  ...answer.files,
                                }}
                              />
                            ),
                          }))}
                        </ResizableLayoutPanel>
                      </ResizablePanel>
                      <ResizablePanel>
                        <ResizableLayoutPanel defaultValue="preview">
                          {[
                            {
                              title: "Preview",
                              value: "preview",
                              children: <Preview template={answer.template} />,
                            },
                          ]}
                        </ResizableLayoutPanel>
                      </ResizablePanel>
                    </ResizablePanelGroup>
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
