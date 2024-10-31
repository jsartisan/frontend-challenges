"use client";

import { useRef, useState } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import { SupportedTemplates, TEMPLATES, SUPPORTED_TEMPLATES } from "@frontend-challenges/shared";

import Preview from "../../components/editor/Preview";
import Console from "../../components/editor/Console";
import { SharePlaygroundButton } from "./SharePlaygroundButton";
import { CodeEditor } from "../../components/editor/CodeEditor";
import SandpackRoot from "../../components/editor/SandpackRoot";
import { FileExplorer } from "../../components/editor/FileExplorer";
import { TemplateChanger } from "../../components/editor/TemplateChanger";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../../components/ui/resizable";

const getTemplateFromURL = (searchParams: URLSearchParams): SupportedTemplates => {
  const template = searchParams.get("template");

  if (template && SUPPORTED_TEMPLATES.includes(template as SupportedTemplates)) {
    return template as SupportedTemplates;
  }

  if (
    localStorage.getItem("playground-template") &&
    SUPPORTED_TEMPLATES.includes(localStorage.getItem("playground-template") as SupportedTemplates)
  ) {
    return localStorage.getItem("playground-template") as SupportedTemplates;
  }

  return "vanilla";
};

const getFilesFromURL = (searchParams: URLSearchParams, template: SupportedTemplates) => {
  const files = searchParams.get("code");

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

  if (localStorage.getItem(`/playground-${template}`)) {
    return getFilesFromLocalStorage(template);
  }

  return TEMPLATES[template].files;
};

const getFilesFromLocalStorage = (template: SupportedTemplates) => {
  try {
    const parsedFiles = JSON.parse(localStorage.getItem(`/playground-${template}`) as string);

    return {
      ...TEMPLATES[template].files,
      ...parsedFiles,
    };
  } catch (e) {
    console.error(e);

    return TEMPLATES[template].files;
  }
};

const CURRENT_EDITOR_PATH = "/playground";
export default function Client() {
  const searchParams = new URLSearchParams(window.location.search);
  const [template, setTemplate] = useState<SupportedTemplates>(() => getTemplateFromURL(searchParams));
  const [files, setFiles] = useState(() => getFilesFromURL(searchParams, template as SupportedTemplates));
  const consoleRef = useRef<ImperativePanelHandle>();
  const [consoleCollapsed, setConsoleCollapsed] = useState(false);

  const onChangeTemplate = (template: SupportedTemplates) => {
    setTemplate(() => {
      localStorage.setItem("playground-template", template);

      return template;
    });

    setFiles(getFilesFromLocalStorage(template));
  };

  return (
    <SandpackRoot
      originalFiles={TEMPLATES[template].files}
      files={files}
      template={template}
      path={CURRENT_EDITOR_PATH}
    >
      <div className="flex h-full w-full flex-col gap-4 p-4">
        <div className="relative flex w-full justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold">Playground</h1>
          </div>
          <div className="flex items-center gap-2">
            <SharePlaygroundButton template={template} />
          </div>
        </div>
        <div className="w-full flex-grow">
          <ResizablePanelGroup direction="horizontal" className="w-full gap-1">
            <ResizablePanel defaultSizePercentage={15}>
              <div className="flex flex-col gap-3">
                <TemplateChanger template={template} setTemplate={onChangeTemplate} />
                <FileExplorer />
              </div>
            </ResizablePanel>
            <ResizableHandle className="w-2" />
            <ResizablePanel defaultSizePercentage={50}>
              <CodeEditor
                path={CURRENT_EDITOR_PATH}
                template={template}
                originalFiles={{
                  ...TEMPLATES[template].files,
                }}
              />
            </ResizablePanel>
            <ResizableHandle className="w-2" />
            <ResizablePanel defaultSizePercentage={35}>
              <ResizablePanelGroup direction="vertical" className="!grid grid-rows-2 gap-4 sm:!flex sm:gap-1">
                <ResizablePanel defaultSizePercentage={100}>
                  <Preview template={template} />
                </ResizablePanel>
                <ResizableHandle className="hidden data-[panel-group-direction=vertical]:h-2 sm:block" />
                <ResizablePanel
                  collapsible
                  collapsedSizePixels={40}
                  minSizePixels={200}
                  className="sm:min-h-0"
                  ref={consoleRef}
                  onCollapse={() => {
                    setConsoleCollapsed(true);
                  }}
                  onExpand={() => {
                    setConsoleCollapsed(false);
                  }}
                >
                  <Console
                    consoleRef={consoleRef}
                    consoleCollapsed={consoleCollapsed}
                    setConsoleCollapsed={setConsoleCollapsed}
                  />
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </SandpackRoot>
  );
}
