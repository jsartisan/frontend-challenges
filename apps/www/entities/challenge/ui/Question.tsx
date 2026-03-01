"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import { Separator, Skeleton } from "~/components/ui";
import { AnswerList } from "~/entities/answer/ui/AnswerList";
import { CommentList } from "~/entities/comment/ui/CommentList";
import { Description } from "~/entities/challenge/ui/Description";
import { useLayout } from "~/features/code-editor/hooks/useLayout";
import { ResourceList } from "~/entities/resource/ui/ResourceList";
import { SandpackRoot } from "~/features/code-editor/ui/SandpackRoot";
import { LayoutChanger } from "~/features/code-editor/ui/LayoutChanger";
import { ResizableLayout } from "~/features/code-editor/ui/ResizableLayout";
import { TemplateChanger } from "~/features/code-editor/ui/TemplateChanger";
import { MarkCompleteButton } from "~/entities/completions/ui/MarkCompleteButton";
import { useChallengeFiles } from "~/features/code-editor/hooks/useChallengeFiles";
import { ShareSolutionButton } from "~/features/code-editor/ui/ShareSolutionButton";
import { ResizableLayoutPanel } from "~/features/code-editor/ui/ResizableLayoutPanel";
import { Question as QuestionType, SupportedTemplates } from "~/entities/challenge/model/types";

import { TEMPLATES } from "../model/templates";

const Breadcrumb = dynamic(() => import("~/screens/challenge/ui/Breadcrumb").then((mod) => mod.Breadcrumb), {
  ssr: false,
  loading: () => <Skeleton className="h-8 w-28" />,
});

const Preview = dynamic(() => import("~/features/code-editor/ui/Preview").then((mod) => mod.Preview), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full grow" />,
});

const Console = dynamic(() => import("~/features/code-editor/ui/Console").then((mod) => mod.Console), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full" />,
});

const Editor = dynamic(() => import("./Editor").then((mod) => mod.Editor), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full" />,
});

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
  const { layout, setLayout } = useLayout();

  return (
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
      <div className="min-h-0 w-full grow">
        <ResizableLayout>
          <ResizableLayoutPanel defaultValue="description">
            {[
              {
                title: "Description",
                id: "description",
                children: <Description challenge={challenge} />,
              },
              {
                title: "Submissions",
                id: "submissions",
                children: <AnswerList challenge={challenge} className="p-3" />,
              },
              {
                title: "Resources",
                id: "resources",
                children: <ResourceList challenge={challenge} />,
              },
              {
                title: "Discussion",
                id: "discussion",
                children: <CommentList challenge={challenge} className="p-3" />,
              },
            ]}
          </ResizableLayoutPanel>

          <Editor challenge={challenge} template={template} />

          <ResizableLayoutPanel defaultValue="preview">
            {[
              {
                title: "Preview",
                id: "preview",
                children: <Preview template={template} />,
              },
            ]}
          </ResizableLayoutPanel>

          <ResizableLayoutPanel defaultValue="console">
            {[
              {
                title: "Console",
                id: "console",
                children: <Console />,
              },
            ]}
          </ResizableLayoutPanel>
        </ResizableLayout>
      </div>
    </div>
  );
}
