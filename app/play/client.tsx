"use client";

import { CodeEditor } from "@/components/editor/CodeEditor";
import SandpackRoot from "@/components/editor/SandpackRoot";
import Preview from "@/components/editor/Preview";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { SUPPORTED_TEMPLATES } from "@/constants";
import { SupportedTemplates } from "@/types";
import { useSearchParams, ReadonlyURLSearchParams } from "next/navigation";
import { FileExplorer } from "@/components/editor/FileExplorer";
import { useState } from "react";
import { TEMPLATES } from "@/templates";
import { TemplateChanger } from "@/components/editor/TemplateChanger";

const getTempalteFromURL = (searchParams: ReadonlyURLSearchParams): SupportedTemplates => {
  const template = searchParams.get("template");

  if (template && SUPPORTED_TEMPLATES.includes(template as SupportedTemplates)) {
    return template as SupportedTemplates;
  }

  return "vanilla";
};

const getFilesFromURL = (files: string | null, template: SupportedTemplates) => {
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
  const searchParams = useSearchParams();
  const [template, setTemplate] = useState<SupportedTemplates>(() => getTempalteFromURL(searchParams));
  const [files, setFiles] = useState(() => getFilesFromURL(searchParams.get("code"), template));

  return (
    <>
      <SandpackRoot files={files}>
        <div className="flex h-full w-full flex-col gap-4 p-4">
          <div className="relative flex w-full justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold">Playground</h1>
            </div>
            <div className="flex items-center gap-4">
              <TemplateChanger
                template={template}
                setTemplate={(template) => {
                  setTemplate(template);
                  setFiles(getFilesFromURL(searchParams.get("code"), template));
                }}
              />
            </div>
          </div>
          <div className="w-full flex-grow">
            <ResizablePanelGroup direction="horizontal" className="w-full gap-1">
              <ResizablePanel defaultSizePercentage={15}>
                <FileExplorer />
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
    </>
  );
}
