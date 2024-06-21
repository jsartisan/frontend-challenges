"use client";

import { TEMPLATES } from "@/templates";
import { useEffect, useState } from "react";
import { SupportedTemplates } from "@/types";
import Preview from "@/components/editor/Preview";
import { SUPPORTED_TEMPLATES } from "@/constants";
import { CodeEditor } from "@/components/editor/CodeEditor";
import SandpackRoot from "@/components/editor/SandpackRoot";
import { FileExplorer } from "@/components/editor/FileExplorer";
import { TemplateChanger } from "@/components/editor/TemplateChanger";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { SharePlaygroundButton } from "./SharePlaygroundButton";
import { Skeleton } from "@/components/ui/skeleton";

const getTempalteFromURL = (searchParams: URLSearchParams): SupportedTemplates => {
  const template = searchParams.get("template");

  if (template && SUPPORTED_TEMPLATES.includes(template as SupportedTemplates)) {
    return template as SupportedTemplates;
  }

  return "vanilla";
};

const getFilesFromURL = (searchParams: URLSearchParams, template: SupportedTemplates) => {
  const files = searchParams.get("files");

  if (files) {
    try {
      const parsedFiles = JSON.parse(files);

      return {
        ...TEMPLATES[template].files,
        ...parsedFiles,
      };
    } catch (e) {
      console.error(e);
    }
  }

  return TEMPLATES[template].files;
};

export default function Client() {
  const [mounted, setMounted] = useState(false);
  const [template, setTemplate] = useState<SupportedTemplates>("vanilla");
  const [files, setFiles] = useState(TEMPLATES[template].files);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    setTemplate(getTempalteFromURL(searchParams));
    setFiles(getFilesFromURL(searchParams, template as SupportedTemplates));
  }, [template, setTemplate, setFiles]);

  if (!mounted) {
    return (
      <div className="h-auto sm:h-[calc(100vh_-_var(--nav-top-offset))]">
        <div className="flex h-full w-full flex-col gap-4 p-4">
          <div className="relative flex w-full justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold">Playground</h1>
            </div>
            <Skeleton className="h-8 w-20" />
          </div>
          <div className="flex w-full flex-grow gap-4">
            <Skeleton className="h-full w-2/12" />
            <Skeleton className="h-full w-6/12" />
            <Skeleton className="h-full w-4/12" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <SandpackRoot files={files}>
      <div className="flex h-full w-full flex-col gap-4 p-4">
        <div className="relative flex w-full justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold">Playground</h1>
          </div>
          <SharePlaygroundButton template={template} />
        </div>
        <div className="w-full flex-grow">
          <ResizablePanelGroup direction="horizontal" className="w-full gap-1">
            <ResizablePanel defaultSizePercentage={15}>
              <div className="flex flex-col gap-3">
                <TemplateChanger
                  template={template}
                  setTemplate={(template) => {
                    setTemplate(template);
                    setFiles(TEMPLATES[template].files);
                  }}
                />
                <FileExplorer />
              </div>
            </ResizablePanel>
            <ResizableHandle className="w-2" />
            <ResizablePanel defaultSizePercentage={50}>
              <CodeEditor />
            </ResizablePanel>
            <ResizableHandle className="w-2" />
            <ResizablePanel defaultSizePercentage={35}>
              <Preview template={template} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </SandpackRoot>
  );
}
