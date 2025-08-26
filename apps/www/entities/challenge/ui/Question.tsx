"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import { Separator, Skeleton } from "~/components/ui";
import { AnswerList } from "~/entities/answer/ui/AnswerList";
import { Description } from "~/entities/challenge/ui/Description";
import { useLayout } from "~/features/code-editor/hooks/useLayout";
import { SandpackRoot } from "~/features/code-editor/ui/SandpackRoot";
import { LayoutChanger } from "~/features/code-editor/ui/LayoutChanger";
import { ResizableLayout } from "~/features/code-editor/ui/ResizableLayout";
import { TemplateChanger } from "~/features/code-editor/ui/TemplateChanger";
import { Question, SupportedTemplates } from "~/entities/challenge/model/types";
import { ResizableLayoutTab } from "~/features/code-editor/ui/ResizableLayoutTab";
import { MarkCompleteButton } from "~/entities/completions/ui/MarkCompleteButton";
import { useChallengeFiles } from "~/features/code-editor/hooks/useChallengeFiles";
import { ShareSolutionButton } from "~/features/code-editor/ui/ShareSolutionButton";

const Breadcrumb = dynamic(() => import("~/screens/challenge/ui/Breadcrumb").then((mod) => mod.Breadcrumb), {
  ssr: false,
  loading: () => <Skeleton className="h-8 w-28" />,
});

const CodeEditor = dynamic(() => import("~/features/code-editor/ui/CodeEditor").then((mod) => mod.CodeEditor), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full grow" />,
});

const Preview = dynamic(() => import("~/features/code-editor/ui/Preview").then((mod) => mod.Preview), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full grow" />,
});

const Console = dynamic(() => import("~/features/code-editor/ui/Console").then((mod) => mod.Console), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full" />,
});

type QuestionChallengeProps = {
  challenge: Question;
};

function QuestionChallenge(props: QuestionChallengeProps) {
  const { challenge } = props;
  const { layout, setLayout } = useLayout();
  const [template, setTemplate] = useState(Object.keys(props.challenge.templateFiles)[0] as SupportedTemplates);
  const { allFiles, availableFiles } = useChallengeFiles(challenge, template);

  return (
    <SandpackRoot files={allFiles} template={template} path={`/challenges/${challenge.path}`}>
      <div className="flex h-full w-full flex-col gap-4 p-4">
        <div className="min-h-auto! relative flex w-full justify-between">
          <Breadcrumb challenge={challenge} />
          <LayoutChanger className="absolute left-[calc(50%-125px)] w-[250px]" layout={layout} setLayout={setLayout} />
          <div className="ms-auto hidden items-center gap-2 md:flex">
            <TemplateChanger template={template} setTemplate={setTemplate} challenge={challenge} />
            {Object.keys(challenge.templateFiles).length > 1 && <Separator orientation="vertical" className="mx-1" />}
            <MarkCompleteButton challenge={challenge} />
            <ShareSolutionButton template={template} challenge={challenge} />
          </div>
        </div>
        <div className="w-full grow">
          <ResizableLayout>
            <ResizableLayoutTab defaultValue="description">
              {[
                {
                  title: "Description",
                  value: "description",
                  children: <Description challenge={challenge} />,
                },
                {
                  title: "Submissions",
                  value: "submissions",
                  children: <AnswerList challenge={challenge} className="p-3" />,
                },
              ]}
            </ResizableLayoutTab>

            <ResizableLayoutTab
              defaultValue={
                Object.keys(availableFiles).find((file) => availableFiles[file].active) ||
                Object.keys(availableFiles)[0]
              }
            >
              {Object.keys(availableFiles)
                .filter((file) => {
                  return !(availableFiles[file].hidden || file === "/package.json");
                })
                .map((file) => ({
                  title: file,
                  value: file,
                  children: (
                    <CodeEditor
                      path={`/challenges/${challenge.path}`}
                      template={template}
                      file={file}
                      key={`${challenge.path}-${file}`}
                    />
                  ),
                }))}
            </ResizableLayoutTab>

            <ResizableLayoutTab defaultValue="preview">
              {[
                {
                  title: "Preview",
                  value: "preview",
                  children: <Preview template={template} />,
                },
              ]}
            </ResizableLayoutTab>

            <ResizableLayoutTab defaultValue="console">
              {[
                {
                  title: "Console",
                  value: "console",
                  children: <Console />,
                },
              ]}
            </ResizableLayoutTab>
          </ResizableLayout>
        </div>
      </div>
    </SandpackRoot>
  );
}

export { QuestionChallenge as Question };
