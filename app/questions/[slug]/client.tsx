"use client";

import { Card } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  ToggleGroup,
  Icon,
  IconProps,
  ToggleGroupItem,
} from "@/components/ui";
import CodeEditor from "@/components/editor/CodeEditor";
import SandpackRoot from "@/components/editor/SandpackRoot";
import Preview from "@/components/editor/Preview";
import Description from "@/components/editor/Description";
import { AnswerList } from "@/components/questions/AnswerList";
import Link from "next/link";
import { LayoutChanger } from "@/components/questions/LayoutChanger";
import { ResizableLayout } from "@/components/editor/ResizableLayout";
import { ShareSolutionButton } from "@/components/editor/ShareSolutionButton";
import { Question, SupportedTemplates } from "@/types";
import { useState } from "react";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { SUPPORTED_TEMPLATES } from "@/constants";
import { TEMPLATES } from "@/templates";

const getTempalteFromURL = (searchParams: ReadonlyURLSearchParams, question: Question): SupportedTemplates => {
  const template = searchParams.get("template");

  if (template && SUPPORTED_TEMPLATES.includes(template as SupportedTemplates)) {
    return template as SupportedTemplates;
  }

  return Object.keys(question.templateFiles)[0] as SupportedTemplates;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Client(props: { question: Question }) {
  const { question } = props;
  const searchParams = useSearchParams();
  const [template, setTemplate] = useState(() => getTempalteFromURL(searchParams, question));

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
            <div className="flex items-center">
              <Breadcrumb separator="/">
                <BreadcrumbItem>
                  <BreadcrumbLink as={Link} href="/">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink as={Link} href="/questions">
                    Questions
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink href={`/questions/${question.path}`}>{question.info["en"]?.title}</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
            <LayoutChanger className="absolute -top-[2px] left-[calc(50%-125px)] w-[250px]" />
            <div className="flex items-center gap-4">
              {Object.keys(question.templateFiles).length > 1 && (
                <ToggleGroup
                  variant="outline"
                  size="icon"
                  type="single"
                  value={template}
                  onValueChange={(value: string) => {
                    setTemplate(value as SupportedTemplates);
                  }}
                >
                  {Object.keys(question.templateFiles).map((template) => {
                    return (
                      <ToggleGroupItem key={template} value={template}>
                        <Icon name={`${template}-color` as IconProps["name"]} />
                      </ToggleGroupItem>
                    );
                  })}
                </ToggleGroup>
              )}
              <ShareSolutionButton template={template} challenge={question} />
            </div>
          </div>
          <div className="min-h-0 w-full flex-grow">
            <ResizableLayout>
              <Card className="h-full">
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
              <CodeEditor question={question} />
              <Preview template={template} />
            </ResizableLayout>
          </div>
        </div>
      </SandpackRoot>
    </>
  );
}
