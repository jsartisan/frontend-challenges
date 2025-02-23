"use client";

import { useState } from "react";
import { SupportedTemplates, TEMPLATES, SUPPORTED_TEMPLATES } from "@/shared";

import { SharePlaygroundButton } from "./SharePlaygroundButton";
import { SandpackRoot } from "@/web/components/editor/SandpackRoot";
import { ResizableLayoutTab } from "packages/website/components/editor/ResizableLayoutTab";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "packages/website/components/ui";
import Console from "packages/website/components/editor/Console";
import Preview from "packages/website/components/editor/Preview";
import CodeEditor from "packages/website/components/editor/CodeEditor";
import { FileExplorer } from "packages/website/components/editor/FileExplorer";
import { TemplateChanger } from "packages/website/components/editor/TemplateChanger";

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

export function Client() {
  const searchParams = new URLSearchParams(window.location.search);
  const [template, setTemplate] = useState<SupportedTemplates>(() => getTemplateFromURL(searchParams));
  const [files, setFiles] = useState(() => getFilesFromURL(searchParams, template as SupportedTemplates));

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
        <div className="relative flex !min-h-max w-full justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold">Playground</h1>
          </div>
          <div className="flex items-center gap-2">
            <SharePlaygroundButton template={template} />
          </div>
        </div>
        <div className="w-full flex-grow">
          <ResizablePanelGroup direction="horizontal" className="!grid gap-4 sm:!flex sm:gap-1">
            <ResizablePanel defaultSize={20}>
              <ResizableLayoutTab defaultValue="fileExplorer" tabless>
                {[
                  {
                    title: "File Explorer",
                    value: "fileExplorer",
                    children: (
                      <div className="flex flex-col gap-3 p-1">
                        <TemplateChanger template={template} setTemplate={onChangeTemplate} />
                        <FileExplorer />
                      </div>
                    ),
                  },
                ]}
              </ResizableLayoutTab>
            </ResizablePanel>
            <ResizableHandle className="hidden w-2 sm:block" />
            <ResizablePanel>
              <ResizableLayoutTab
                defaultValue={Object.keys(files).find((file) => files[file].active) || Object.keys(files)[0]}
              >
                {Object.keys(files).map((file) => ({
                  title: file,
                  value: file,
                  children: <CodeEditor path={`/playground`} template={template} file={file} key={file} />,
                }))}
              </ResizableLayoutTab>
            </ResizablePanel>
            <ResizableHandle className="hidden w-2 sm:block" />
            <ResizablePanel>
              <ResizablePanelGroup direction="vertical" className="!grid gap-4 sm:!flex sm:gap-1">
                <ResizablePanel>
                  <ResizableLayoutTab defaultValue="preview">
                    {[
                      {
                        title: "Preview",
                        value: "preview",
                        children: <Preview template={template} />,
                      },
                    ]}
                  </ResizableLayoutTab>
                </ResizablePanel>
                <ResizableHandle className="hidden data-[panel-group-direction=vertical]:h-2 sm:block" />
                <ResizablePanel defaultSize={0}>
                  <ResizableLayoutTab defaultValue="console">
                    {[
                      {
                        title: "Console",
                        value: "console",
                        children: <Console />,
                      },
                    ]}
                  </ResizableLayoutTab>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </SandpackRoot>
  );
}
