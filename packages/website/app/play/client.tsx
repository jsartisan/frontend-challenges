"use client";

import { useState } from "react";
import { SupportedTemplates, TEMPLATES, SUPPORTED_TEMPLATES } from "@frontend-challenges/shared";

import Preview from "../../components/editor/Preview";
import Console from "../../components/editor/Console";
import { SharePlaygroundButton } from "./SharePlaygroundButton";
import CodeEditor from "../../components/editor/CodeEditor";
import SandpackRoot from "../../components/editor/SandpackRoot";
import { FileExplorer } from "../../components/editor/FileExplorer";
import { TemplateChanger } from "../../components/editor/TemplateChanger";
import { DynamicResizableLayout, LayoutGroup } from "../../components/editor/DynamicResizableLayout";

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

  const onChangeTemplate = (template: SupportedTemplates) => {
    setTemplate(() => {
      localStorage.setItem("playground-template", template);

      return template;
    });

    setFiles(getFilesFromLocalStorage(template));
  };

  const layout: LayoutGroup = {
    id: "root",
    direction: "horizontal",
    children: [
      {
        defaultSize: 15,
        id: crypto.randomUUID(),
        title: "Files",
        children: (
          <div className="flex flex-col gap-3">
            <TemplateChanger template={template} setTemplate={onChangeTemplate} key={template} />
            <FileExplorer />
          </div>
        ),
      },
      {
        id: crypto.randomUUID(),
        children: (
          <CodeEditor
            path={CURRENT_EDITOR_PATH}
            template={template}
            originalFiles={{
              ...TEMPLATES[template].files,
            }}
          />
        ),
      },
      {
        id: crypto.randomUUID(),
        direction: "vertical",
        children: [
          {
            id: crypto.randomUUID(),
            children: <Preview key="preview" template={template} />,
          },
          {
            defaultCollapsed: true,
            id: crypto.randomUUID(),
            children: <Console />,
          },
        ],
      },
    ],
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
          <DynamicResizableLayout layout={layout} />
        </div>
      </div>
    </SandpackRoot>
  );
}
