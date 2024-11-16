"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { TEMPLATES, Question, SupportedTemplates, Challenge } from "@frontend-challenges/shared";

import { Card } from "../../../components/ui/card";
import { TemplateChanger } from "./TemplateChanger";
import Description from "../../../components/editor/Description";
import SandpackRoot from "../../../components/editor/SandpackRoot";
import { AnswerList } from "../../../components/questions/AnswerList";
import { LayoutChanger } from "../../../components/questions/LayoutChanger";
import { ShareSolutionButton } from "../../../components/editor/ShareSolutionButton";
import { useLocalStorageChallengeFiles } from "../../../hooks/useLocalStorageChallengeFiles";
import { Tabs, TabsContent, TabsList, TabsTrigger, Separator, Skeleton } from "../../../components/ui";
import { DynamicResizableLayout, LayoutGroup } from "packages/website/components/editor/DynamicResizableLayout";

const MarkCompleteButton = dynamic(() => import("../../../components/editor/MarkCompleteButton"), {
  ssr: false,
  loading: () => <Skeleton className="h-8 w-32" />,
});

const Notes = dynamic(() => import("../../../components/editor/Notes"), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full flex-grow" />,
});

const CodeEditor = dynamic(() => import("../../../components/editor/CodeEditor"), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full flex-grow" />,
});

const Console = dynamic(() => import("../../../components/editor/Console"), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full" />,
});

const Preview = dynamic(() => import("../../../components/editor/Preview"), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full flex-grow" />,
});

const Breadcrumb = dynamic(() => import("./Breadcrumb"), {
  ssr: false,
  loading: () => <Skeleton className="h-8 w-28" />,
});

type QuestionProps = {
  question: Question;
  challenges: Challenge[];
};

function QuestionChallenge(props: QuestionProps) {
  const { question, challenges } = props;
  const [template, setTemplate] = useState(Object.keys(question.templateFiles)[0] as SupportedTemplates);
  const savedChallengeFiles = useLocalStorageChallengeFiles(`/challenges/${question.path}-${template}`);
  const files = {
    ...TEMPLATES[template].files,
    ...question.templateFiles[template],
    ...savedChallengeFiles,
  };

  const layout: LayoutGroup = {
    id: "root",
    direction: "horizontal",
    children: [
      {
        id: crypto.randomUUID(),
        children: (
          <Card className="h-full min-h-0 overflow-hidden" key="description">
            <Tabs defaultValue="description" className="flex h-full flex-col">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="solutions">Submissions</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="flex-grow overflow-y-auto">
                <Description challenge={question} />
              </TabsContent>
              <TabsContent value="solutions">
                <AnswerList challenge={question} />
              </TabsContent>
              <TabsContent value="notes" className="p-0">
                <Notes path={`/challenges/${question.path}`} />
              </TabsContent>
            </Tabs>
          </Card>
        ),
      },
      {
        id: crypto.randomUUID(),
        direction: "vertical",
        children: [
          {
            id: crypto.randomUUID(),
            children: (
              <CodeEditor
                key="editor"
                path={`/challenges/${question.path}`}
                exclude={["/package.json"]}
                className="min-h-0"
                template={template}
                originalFiles={{
                  ...TEMPLATES[template].files,
                  ...question.templateFiles[template],
                }}
              />
            ),
          },
          {
            id: crypto.randomUUID(),
            children: <Preview key="preview" className="min-h-0" template={template} />,
          },
          {
            id: crypto.randomUUID(),
            defaultCollapsed: true,
            children: <Console />,
          },
        ],
      },
    ],
  };

  return (
    <>
      <SandpackRoot
        files={files}
        template={template}
        path={`/challenges/${question.path}`}
        originalFiles={{
          ...TEMPLATES[template].files,
          ...question.templateFiles[template],
        }}
      >
        <div className="flex h-full w-full flex-col gap-4 p-4">
          <div className="relative flex w-full justify-between">
            <Breadcrumb currentChallenge={question} challenges={challenges} />
            <LayoutChanger className="absolute left-[calc(50%-125px)] w-[250px]" />
            <div className="ms-auto hidden items-center gap-2 md:flex">
              <TemplateChanger template={template} setTemplate={setTemplate} question={question} />
              {Object.keys(question.templateFiles).length > 1 && <Separator orientation="vertical" className="mx-1" />}
              <MarkCompleteButton challenge={question} />
              <ShareSolutionButton template={template} challenge={question} />
            </div>
          </div>
          <div className="min-h-0 w-full flex-grow">
            <DynamicResizableLayout layout={layout} />
          </div>
        </div>
      </SandpackRoot>
    </>
  );
}

export { QuestionChallenge as Question };
