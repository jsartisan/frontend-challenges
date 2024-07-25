"use client";

import { useState } from "react";
import { TEMPLATES } from "@/templates";
import { SupportedTemplates } from "@/types";
import Preview from "@/components/editor/Preview";
import { SUPPORTED_TEMPLATES } from "@/constants";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { Console } from "@/components/editor/Console";
import SandpackRoot from "@/components/editor/SandpackRoot";
import { FileExplorer } from "@/components/editor/FileExplorer";
import { SharePlaygroundButton } from "./SharePlaygroundButton";
import { TemplateChanger } from "@/components/editor/TemplateChanger";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

const getTempalteFromURL = (searchParams: URLSearchParams): SupportedTemplates => {
  const template = searchParams.get("template");

  if (template && SUPPORTED_TEMPLATES.includes(template as SupportedTemplates)) {
    return template as SupportedTemplates;
  }

  return "vanilla";
};

const getFilesFromURL = (searchParams: URLSearchParams, template: SupportedTemplates) => {
  const files = searchParams.get("code");

  if (files) {
    try {
      const parsedFiles = JSON.parse(files);

      console.log({ parsedFiles });

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
  const searchParams = new URLSearchParams(window.location.search);
  const [template, setTemplate] = useState<SupportedTemplates>(() => getTempalteFromURL(searchParams));
  const [files, setFiles] = useState(() => getFilesFromURL(searchParams, template as SupportedTemplates));

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
              <CodeEditor path="/playground" template={template} />
            </ResizablePanel>
            <ResizableHandle className="w-2" />
            <ResizablePanel defaultSizePercentage={35}>
              <ResizablePanelGroup direction="vertical" className="!grid grid-rows-2 gap-4 sm:!flex sm:gap-1">
                <ResizablePanel defaultSizePercentage={100}>
                  <Preview template={template} />
                </ResizablePanel>
                <ResizableHandle className="hidden data-[panel-group-direction=vertical]:h-2 sm:block" />
                <Console />
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </SandpackRoot>
  );
}
