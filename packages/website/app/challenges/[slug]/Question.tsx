"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useChallengeFiles } from "@/web/hooks/useChallengeFiles";
import { SandpackRoot } from "@/web/components/editor/SandpackRoot";
import { DynamicLayout } from "@/web/components/editor/DynamicLayout";
import { TEMPLATES, Question, SupportedTemplates, STORAGE_KEY } from "@/shared";

import { AnswerList } from "@/web/components/questions/AnswerList";
import { useChallengeLayout } from "./useChallengeLayout";

import { TemplateChanger } from "./TemplateChanger";
import { MarkCompleteButton } from "./MarkCompleteButton";
import { ShareSolutionButton } from "./ShareSolutionButton";
import { Card, Separator, Skeleton, TabsList, TabsTrigger, TabsContent } from "packages/website/components/ui";
import { LayoutChanger } from "packages/website/components/questions/LayoutChanger";
import { ResizableLayout } from "packages/website/components/editor/ResizableLayout";
import Description from "packages/website/components/editor/Description";
import { ResizableLayoutTab as Tabs } from "packages/website/components/editor/ResizableLayoutTab";

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
  const [template, setTemplate] = useState(Object.keys(props.challenge.templateFiles)[0] as SupportedTemplates);
  const { allFiles, availableFiles } = useChallengeFiles(challenge, template);
  // we need original files to be able to reset the files to the original state.
  const originalFiles = { ...TEMPLATES[template].files, ...challenge.templateFiles[template] };
  const { layout, setLayout, componentsMap } = useChallengeLayout(challenge, template, allFiles);

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
            <Tabs defaultValue="description">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="submissions">Submissions</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
              <TabsContent value="description">
                <Description challenge={challenge} />
              </TabsContent>
              <TabsContent value="submissions">
                <AnswerList challenge={challenge} className="p-3" />
              </TabsContent>
              <TabsContent value="notes">
                <Notes path={`/challenges/${challenge.path}`} />
              </TabsContent>
            </Tabs>

            <Tabs defaultValue={Object.keys(availableFiles)[0]}>
              <TabsList>
                {Object.keys(availableFiles).map((file) => (
                  <TabsTrigger key={file} value={file}>
                    {file}
                  </TabsTrigger>
                ))}
              </TabsList>
              {Object.keys(availableFiles).map((file) => (
                <TabsContent key={file} value={file}>
                  <CodeEditor path={`/challenges/${challenge.path}`} template={template} file={file} />
                </TabsContent>
              ))}
            </Tabs>
            <Tabs defaultValue="preview">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="preview">
                <Preview template={template} />
              </TabsContent>
            </Tabs>
            <Tabs defaultValue="console">
              <TabsList>
                <TabsTrigger value="console">Console</TabsTrigger>
              </TabsList>
              <TabsContent value="console">
                <Console />
              </TabsContent>
            </Tabs>
          </ResizableLayout>
        </div>
      </div>
    </SandpackRoot>
  );
}

export { QuestionChallenge as Question };
