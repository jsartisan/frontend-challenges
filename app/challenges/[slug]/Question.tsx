"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { TEMPLATES } from "@/templates";
import { Breadcrumb } from "./Breadcrumb";
import { Card } from "@/components/ui/card";
import { DEFAULT_LOCALE } from "@/constants";
import Preview from "@/components/editor/Preview";
import { TemplateChanger } from "./TemplateChanger";
import { Question, SupportedTemplates } from "@/types";
import CodeEditor from "@/components/editor/CodeEditor";
import Description from "@/components/editor/Description";
import SandpackRoot from "@/components/editor/SandpackRoot";
import { AnswerList } from "@/components/questions/AnswerList";
import { LayoutChanger } from "@/components/questions/LayoutChanger";
import { ResizableLayout } from "@/components/editor/ResizableLayout";
import { ShareSolutionButton } from "@/components/editor/ShareSolutionButton";
import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";

const MarkCompleteButton = dynamic(() => import("@/components/editor/MarkCompleteButton"), {
  ssr: false,
});

type QuestionProps = {
  question: Question;
};

function QuestionChallenge(props: QuestionProps) {
  const { question } = props;
  const [template, setTemplate] = useState(Object.keys(question.templateFiles)[0] as SupportedTemplates);

  return (
    <>
      <SandpackRoot
        files={{
          ...TEMPLATES[template].files,
          ...question.templateFiles[template],
        }}
      >
        <div className="flex h-full w-full flex-col gap-4 p-4">
          <div className="relative flex w-full justify-between">
            <Breadcrumb challenge={question} />
            <LayoutChanger className="absolute -top-[2px] left-[calc(50%-125px)] w-[250px]" />
            <div className="hidden items-center gap-2 md:flex">
              <MarkCompleteButton challenge={question} />
              <TemplateChanger template={template} setTemplate={setTemplate} question={question} />
              <ShareSolutionButton template={template} challenge={question} />
            </div>
          </div>
          <div className="min-h-0 w-full flex-grow">
            <ResizableLayout>
              <Card className="h-full min-h-0">
                <Tabs defaultValue="description" className="h-full">
                  <TabsList>
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="solutions">Submissions</TabsTrigger>
                    {question.info[DEFAULT_LOCALE]?.discussionNo && (
                      <Button variant="tertiary" size="sm" asChild>
                        <a href={question.discussionURL} target="_blank" rel="noopener noreferrer">
                          Discussion
                        </a>
                      </Button>
                    )}
                  </TabsList>
                  <TabsContent value="description" className="overflow-y-auto">
                    <Description challenge={question} />
                  </TabsContent>
                  <TabsContent value="solutions">
                    <AnswerList challenge={question} />
                  </TabsContent>
                </Tabs>
              </Card>
              <CodeEditor
                path={`/challenges/${question.path}`}
                exclude={["/package.json"]}
                className="min-h-0"
                question={question}
              />
              <Preview className="min-h-0" template={template} />
            </ResizableLayout>
          </div>
        </div>
      </SandpackRoot>
    </>
  );
}

export { QuestionChallenge as Question };
