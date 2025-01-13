import dynamic from "next/dynamic";

import { Question, SupportedTemplates } from "packages/shared/src/types";
import Description from "@/web/components/editor/Description";
import { AnswerList } from "@/web/components/questions/AnswerList";
import { LayoutGroup, LayoutItem, LayoutPanel } from "@/web/components/editor/DynamicLayout/types";
import { Skeleton } from "packages/website/components/ui";
import { STORAGE_KEY } from "packages/shared/src";
import { useEffect, useMemo, useState } from "react";
import { TemplateChanger } from "../challenges/[slug]/TemplateChanger";
import { FileExplorer } from "packages/website/components/editor/FileExplorer";

const CodeEditor = dynamic(() => import("@/web/components/editor/CodeEditor"), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full flex-grow" />,
});

const Console = dynamic(() => import("@/web/components/editor/Console"), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full" />,
});

const Preview = dynamic(() => import("@/web/components/editor/Preview"), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full flex-grow" />,
});

export function usePlaygroundLayout(template: SupportedTemplates, files: any) {
  const templateAndFileExplorer = {
    title: "File Explorer",
    id: "templateAndFileExplorer",
    children: (
      <div className="p-3">
        <FileExplorer />
      </div>
    ),
  };

  const preview = {
    title: "Preview",
    id: "preview",
    children: <Preview template={template} />,
  };

  const console = {
    title: "Console",
    id: "console",
    children: <Console />,
  };

  const editorFiles = Object.keys(files)
    .filter((file) => {
      const isHidden = files[file].hidden;
      const or = isHidden;
      4;
      return !or;
    })
    .map((file) => ({
      title: file.replace("/", ""),
      id: file,
      children: <CodeEditor path="/playground" template={template} file={file} />,
    }));

  const DEFAULT_LAYOUT = {
    id: "root",
    direction: "horizontal",
    children: [
      {
        id: crypto.randomUUID(),
        direction: "horizontal",
        children: [
          {
            id: crypto.randomUUID(),
            defaultSize: 15,
            children: ["templateAndFileExplorer"],
          },
          {
            id: crypto.randomUUID(),
            children: [...editorFiles.map((file) => file.id)],
          },
          {
            id: crypto.randomUUID(),
            direction: "vertical",
            children: [
              {
                id: crypto.randomUUID(),
                children: ["preview"],
              },
              {
                defaultCollapsed: true,
                id: crypto.randomUUID(),
                children: ["console"],
              },
            ],
          },
        ],
      },
    ],
  } as LayoutGroup;

  const [layout, setLayout] = useState<LayoutGroup>(DEFAULT_LAYOUT);

  useEffect(() => {
    const layout = localStorage.getItem(`${STORAGE_KEY}:layout`);

    if (layout) {
      try {
        setLayout(JSON.parse(layout));
      } catch (error) {}
    }
  }, []);

  const componentsMap = {
    templateAndFileExplorer,
    preview,
    console,
    ...editorFiles.reduce((acc, file) => {
      acc[file.id] = file;
      return acc;
    }, {}),
  };

  return {
    layout,
    componentsMap,
    setLayout,
  };
}
