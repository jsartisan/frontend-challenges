"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Round } from "features/mock-interview/model/constants";
import { useInterview } from "entities/interview/context/InterviewContext";
import { NextRoundButton } from "features/mock-interview/ui/NextRoundButton";
import { useChallengesForMockInterview } from "features/mock-interview/hooks/useChallengesForMockInterview";

import { MDXComponent } from "~/shared/ui/mdx/MDXComponent";
import { TEMPLATES } from "~/entities/challenge/model/templates";
import { Description } from "~/entities/challenge/ui/Description";
import { ResourceList } from "~/entities/resource/ui/ResourceList";
import { useLayout } from "~/features/code-editor/hooks/useLayout";
import { Button, Card, Separator, Skeleton } from "~/components/ui";
import { SandpackRoot } from "~/features/code-editor/ui/SandpackRoot";
import { LayoutChanger } from "~/features/code-editor/ui/LayoutChanger";
import { ResizableLayout } from "~/features/code-editor/ui/ResizableLayout";
import { TemplateChanger } from "~/features/code-editor/ui/TemplateChanger";
import { useChallengeFiles } from "~/features/code-editor/hooks/useChallengeFiles";
import { ResizableLayoutPanel } from "~/features/code-editor/ui/ResizableLayoutPanel";
import { Challenge, Question as QuestionType, SupportedTemplates } from "~/entities/challenge/model/types";

const Preview = dynamic(() => import("~/features/code-editor/ui/Preview").then((mod) => mod.Preview), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full grow" />,
});

const Console = dynamic(() => import("~/features/code-editor/ui/Console").then((mod) => mod.Console), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full" />,
});

const Editor = dynamic(() => import("~/entities/challenge/ui/Editor").then((mod) => mod.Editor), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full" />,
});

export function MockInterviewMachingCodingRoundPage() {
  const { currentRound, framework, level } = useInterview();

  const {
    data: question,
    error,
    isLoading,
  } = useChallengesForMockInterview<QuestionType>({
    framework,
    level,
    round: currentRound,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>some error</div>;
  }

  if (!question) {
    return null;
  }

  return <Question challenge={question} />;
}

type QuestionProps = {
  challenge: QuestionType;
};

export function Question(props: QuestionProps) {
  const { challenge } = props;
  const [template, setTemplate] = useState(Object.keys(props.challenge.templateFiles)[0] as SupportedTemplates);
  const { allFiles } = useChallengeFiles(challenge, template);

  return (
    <SandpackRoot
      files={allFiles}
      template={template}
      path={`/challenges/${challenge.path}`}
      originalFiles={{
        ...TEMPLATES[template].files,
        ...challenge.templateFiles[template],
      }}
      className="p-6!"
    >
      <QuestionInner challenge={challenge} template={template} setTemplate={setTemplate} />
    </SandpackRoot>
  );
}

type QuestionInnerProps = {
  challenge: QuestionType;
  template: SupportedTemplates;
  setTemplate: (template: SupportedTemplates) => void;
};

function QuestionInner(props: QuestionInnerProps) {
  const { challenge, setTemplate, template } = props;
  const { answers, currentRound, nextRound, saveAnswers } = useInterview();
  const { layout, setLayout } = useLayout();

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="min-h-auto! relative flex w-full justify-between">
        <div>
          <h1 className="h-8 text-2xl font-bold">Round {currentRound}: Coding Round</h1>
          <p className="text-fg-subtle mt-1">
            In this round, we will test your knowledge around Javascript/Typescript.
          </p>
        </div>
        <LayoutChanger className="absolute left-[calc(50%-125px)] w-[250px]" layout={layout} setLayout={setLayout} />
        <div className="ms-auto hidden items-center gap-2 md:flex">
          <TemplateChanger template={template} setTemplate={setTemplate} challenge={challenge} />
          {Object.keys(challenge.templateFiles).length > 1 && <Separator orientation="vertical" className="mx-1" />}
        </div>
        <NextRoundButton />
      </div>
      <div className="w-full grow">
        <ResizableLayout>
          <ResizableLayoutPanel defaultValue="description">
            {[
              {
                title: "Description",
                value: "description",
                children: (
                  <div className="flex flex-col gap-3 overflow-auto p-3">
                    <h1 className="box-trim flex items-baseline gap-2 text-2xl font-bold">
                      {challenge.info["en"]?.title}
                    </h1>
                    <div className="mt-1 flex flex-col gap-2">
                      <MDXComponent code={challenge.readme["en"]} />
                    </div>
                  </div>
                ),
              },
            ]}
          </ResizableLayoutPanel>

          <Editor
            challenge={challenge}
            template={template}
            onChange={(file, string) => {
              saveAnswers({
                ...answers,
                [currentRound]: {
                  ...answers[currentRound],
                  [file]: string,
                },
              });
            }}
          />

          <ResizableLayoutPanel defaultValue="preview">
            {[
              {
                title: "Preview",
                value: "preview",
                children: <Preview template={template} />,
              },
            ]}
          </ResizableLayoutPanel>

          <ResizableLayoutPanel defaultValue="console">
            {[
              {
                title: "Console",
                value: "console",
                children: <Console />,
              },
            ]}
          </ResizableLayoutPanel>
        </ResizableLayout>
      </div>
    </div>
  );
}
