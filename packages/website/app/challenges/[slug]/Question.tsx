"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useChallengeFiles } from "@/web/hooks/useChallengeFiles";
import { TEMPLATES, Question, SupportedTemplates } from "@/shared";

import { AnswerList } from "@/web/components/questions/AnswerList";

import { TemplateChanger } from "./TemplateChanger";
import { MarkCompleteButton } from "./MarkCompleteButton";
import { ShareSolutionButton } from "./ShareSolutionButton";
import { Separator, Skeleton } from "packages/website/components/ui";
import { useLayout } from "packages/website/providers/LayoutProvider";
import Description from "packages/website/components/editor/Description";
import { SandpackRoot } from "packages/website/components/editor/SandpackRoot";
import { LayoutChanger } from "packages/website/components/questions/LayoutChanger";
import { ResizableLayout } from "packages/website/components/editor/ResizableLayout";
import { ResizableLayoutTab } from "packages/website/components/editor/ResizableLayoutTab";

const Breadcrumb = dynamic(() => import("./Breadcrumb").then((mod) => mod.Breadcrumb), {
  ssr: false,
  loading: () => <Skeleton className="h-8 w-28" />,
});

const Notes = dynamic(() => import("../../../components/editor/Notes"), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full flex-grow rounded-none" />,
});

const CodeEditor = dynamic(() => import("../../../components/editor/CodeEditor"), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full flex-grow" />,
});

const Preview = dynamic(() => import("../../../components/editor/Preview"), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full flex-grow" />,
});

const Console = dynamic(() => import("../../../components/editor/Console"), {
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
  // we need original files to be able to reset the files to the original state.
  const originalFiles = { ...TEMPLATES[template].files, ...challenge.templateFiles[template] };

  return (
    <SandpackRoot
      files={allFiles}
      template={template}
      path={`/challenges/${challenge.path}`}
      originalFiles={originalFiles}
    >
      <div className="flex h-full w-full flex-col gap-4 p-4">
        <div className="relative flex !min-h-[auto] w-full justify-between">
          <Breadcrumb challenge={challenge} />
          <LayoutChanger className="absolute left-[calc(50%-125px)] w-[250px]" layout={layout} setLayout={setLayout} />
          <div className="ms-auto hidden items-center gap-2 md:flex">
            <TemplateChanger template={template} setTemplate={setTemplate} challenge={challenge} />
            {Object.keys(challenge.templateFiles).length > 1 && <Separator orientation="vertical" className="mx-1" />}
            <MarkCompleteButton challenge={challenge} />
            <ShareSolutionButton template={template} challenge={challenge} />
          </div>
        </div>
        <div className="w-full flex-grow">
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
                {
                  title: "Notes",
                  value: "notes",
                  children: <Notes path={`challenges/${challenge.path}`} />,
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
