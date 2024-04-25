"use client";

import { useState } from "react";
import { TEMPLATES } from "@/templates";
import { Breadcrumb } from "./Breadcrumb";
import { Card } from "@/components/ui/card";
import Preview from "@/components/editor/Preview";
import { TemplateChanger } from "./TemplateChanger";
import { Question, SupportedTemplates } from "@/types";
import CodeEditor from "@/components/editor/CodeEditor";
import Description from "@/components/editor/Description";
import SandpackRoot from "@/components/editor/SandpackRoot";
import { AnswerList } from "@/components/questions/AnswerList";
import { LayoutChanger } from "@/components/questions/LayoutChanger";
import { ResizableLayout } from "@/components/editor/ResizableLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { ShareSolutionButton } from "@/components/editor/ShareSolutionButton";

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
            <div className="flex items-center gap-2">
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
                  </TabsList>
                  <TabsContent value="description" className="overflow-y-auto">
                    <Description challenge={question} />
                  </TabsContent>
                  <TabsContent value="solutions">
                    <AnswerList challenge={question} />
                  </TabsContent>
                </Tabs>
              </Card>
              <CodeEditor exclude={["/package.json"]} className="min-h-0" question={question} />
              <Preview className="min-h-0" template={template} />
            </ResizableLayout>
          </div>
        </div>
      </SandpackRoot>
    </>
  );
}

export { QuestionChallenge as Question };
