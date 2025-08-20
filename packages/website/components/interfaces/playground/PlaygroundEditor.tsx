"use client";

import { useState } from "react";
import { SupportedTemplates } from "@/shared";

import { SandpackRoot } from "@/web/components/editor/SandpackRoot";
import { ResizableLayoutTab } from "~/components/editor/ResizableLayoutTab";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/components/ui";
import Console from "~/components/editor/Console";
import Preview from "~/components/editor/Preview";
import CodeEditor from "~/components/editor/CodeEditor";
import { FileExplorer } from "~/components/editor/FileExplorer";
import { TemplateChanger } from "~/components/editor/TemplateChanger";
import { SharePlaygroundButton } from "./SharePlaygroundButton";
import { formatFileName, getFilesFromLocalStorage, getFilesFromURL, getTemplateFromURL } from "~/utils/playground";
import { useSandpack } from "@codesandbox/sandpack-react";
import { setLocalStorageItem } from "~/utils/localStorage";

const CURRENT_EDITOR_PATH = "/playground";

export function PlaygroundEditor() {
  const searchParams = new URLSearchParams(window.location.search);
  const [template, setTemplate] = useState<SupportedTemplates>(() => getTemplateFromURL(searchParams));
  const [files, setFiles] = useState(() => getFilesFromURL(searchParams, template as SupportedTemplates));

  const onChangeTemplate = (template: SupportedTemplates) => {
    setTemplate(() => {
      setLocalStorageItem("playground-template", template);

      return template;
    });

    setFiles(getFilesFromLocalStorage(template));
  };

  return (
    <SandpackRoot files={files} template={template} path={CURRENT_EDITOR_PATH}>
      <PlaygroundInner template={template} onChangeTemplate={onChangeTemplate} />
    </SandpackRoot>
  );
}

type PlaygroundInnerProps = {
  template: SupportedTemplates;
  onChangeTemplate: (template: SupportedTemplates) => void;
};

export function PlaygroundInner({ template, onChangeTemplate }: PlaygroundInnerProps) {
  const { sandpack } = useSandpack();
  const { activeFile, files } = sandpack;

  const visibleFiles = Object.keys(files).filter((file) => !files[file].hidden);

  return (
    <>
      <div className="flex h-full w-full flex-col gap-4 p-4">
        <div className="min-h-max! relative flex w-full justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold">Playground</h1>
          </div>
          <div className="flex items-center gap-2">
            <SharePlaygroundButton template={template} />
          </div>
        </div>
        <div className="w-full grow">
          <ResizablePanelGroup direction="horizontal" className="sm:flex! !grid gap-4 sm:gap-1">
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
                value={activeFile}
                defaultValue={visibleFiles.find((file) => files[file].active) || visibleFiles[0]}
              >
                {visibleFiles.map((file) => ({
                  title: formatFileName(file),
                  value: file,
                  children: <CodeEditor path={`/playground`} template={template} file={file} key={file} />,
                }))}
              </ResizableLayoutTab>
            </ResizablePanel>
            <ResizableHandle className="hidden w-2 sm:block" />
            <ResizablePanel>
              <ResizablePanelGroup direction="vertical" className="sm:flex! !grid gap-4 sm:gap-1">
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
    </>
  );
}
