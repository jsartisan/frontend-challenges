import dynamic from "next/dynamic";

import { Question, SupportedTemplates } from "packages/shared/src/types";
import Description from "@/web/components/editor/Description";
import { AnswerList } from "@/web/components/questions/AnswerList";
import { LayoutGroup, LayoutItem, LayoutPanel } from "@/web/components/editor/DynamicLayout/types";
import { Skeleton } from "packages/website/components/ui";
import { STORAGE_KEY } from "packages/shared/src";
import { useEffect, useMemo, useState } from "react";

const Notes = dynamic(() => import("../../../components/editor/Notes"), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full flex-grow rounded-none" />,
});

const CodeEditor = dynamic(() => import("../../../components/editor/CodeEditor"), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full flex-grow" />,
});

const Console = dynamic(() => import("../../../components/editor/Console"), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full" />,
});

const Preview = dynamic(() => import("../../../components/editor/Preview"), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full flex-grow" />,
});

export function useChallengeLayout(challenge: Question, template: SupportedTemplates, files: any) {
  const [layout, setLayout] = useState<LayoutGroup | "layout-1" | "layout-2" | "layout-3" | undefined>("layout-1");

  useEffect(() => {
    const layout = localStorage.getItem(`${STORAGE_KEY}:layout`) || "layout-1";

    try {
      setLayout(JSON.parse(layout));
    } catch (error) {
      setLayout(layout as "layout-1" | "layout-2" | "layout-3");
    }
  }, []);

  const description = {
    id: "description",
    title: "Description",
    children: <Description challenge={challenge} />,
  };

  const submissions = {
    title: "Submissions",
    id: "submissions",
    children: <AnswerList challenge={challenge} className="p-3" />,
  };

  const notes = {
    title: "Notes",
    id: "notes",
    children: <Notes path={`/challenges/${challenge.path}`} />,
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
      children: <CodeEditor path={`/challenges/${challenge.path}`} template={template} file={file} />,
    }));

  const componentsMap = {
    description,
    submissions,
    notes,
    preview,
    console,
    ...editorFiles.reduce((acc, file) => {
      acc[file.id] = file;
      return acc;
    }, {}),
  };

  const layoutToReturn = useMemo(() => {
    let layoutToReturn = layout;

    if (layout === "layout-1") {
      layoutToReturn = {
        id: "root",
        direction: "horizontal",
        children: [
          {
            id: crypto.randomUUID(),
            children: ["description", "submissions", "notes"],
          },
          {
            id: crypto.randomUUID(),
            direction: "vertical",
            children: [
              {
                id: crypto.randomUUID(),
                children: [...editorFiles.map((file) => file.id)],
              },
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
      } as LayoutGroup;
    }

    if (layout === "layout-2") {
      layoutToReturn = {
        id: "root",
        direction: "horizontal",
        children: [
          {
            id: crypto.randomUUID(),
            children: ["description", "submissions", "notes"],
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
      } as LayoutGroup;
    }

    if (layout === "layout-3") {
      layoutToReturn = {
        id: "root",
        direction: "horizontal",
        children: [
          {
            id: crypto.randomUUID(),
            direction: "vertical",
            children: [
              {
                id: crypto.randomUUID(),
                children: ["description", "submissions", "notes"],
              },
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
          {
            id: crypto.randomUUID(),
            children: [...editorFiles.map((file) => file.id)],
          },
        ],
      } as LayoutGroup;
    }

    if (layout !== "layout-1" && layout !== "layout-2" && layout !== "layout-3") {
      const filesThatAreDone = [];
      let panelWithIndexFile;

      const traverseLayout = (layout) => {
        if (!layout) return;

        if (Array.isArray(layout.children)) {
          layout.children.forEach((child) => {
            if (typeof child === "string" && child.includes("/")) {
              if (files[child]) {
                filesThatAreDone.push(child);
              }

              if (!files[child]) {
                layout.children = layout.children.filter((c) => c !== child);
              }

              if (files[child] && files[child].hidden) {
                layout.children = layout.children.filter((c) => c !== child);
              }

              // This is a LayoutPanel, check if it has index files
              if (child.startsWith("/index.html") || child.startsWith("/index.js")) {
                if (!panelWithIndexFile) {
                  panelWithIndexFile = layout;
                }
              }
            } else if (typeof child === "object") {
              traverseLayout(child);
            }
          });
        }
      };

      traverseLayout(layout);

      const filesThatAreNotDone = Object.keys(files)
        .filter((file) => !files[file].hidden)
        .filter((file) => !filesThatAreDone.includes(file));

      window.console.log("@@ filesThatAreNotDone", filesThatAreNotDone);

      if (panelWithIndexFile) {
        panelWithIndexFile.children = [...panelWithIndexFile.children, ...filesThatAreNotDone];
      }
    }

    return layoutToReturn;
  }, [layout]);

  return {
    layout: layoutToReturn,
    componentsMap,
    setLayout,
  };
}
