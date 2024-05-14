"use client";

import { memo, useRef } from "react";
import { Card } from "../ui/card";
import { cn } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { CodeFile, Question } from "@/types";
import prettier from "prettier/standalone";
import postcss from "prettier/plugins/postcss";
import estree from "prettier/plugins/estree";
import babel from "prettier/plugins/babel";
import html from "prettier/plugins/html";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SandpackCodeEditor, SandpackState, useSandpack } from "@codesandbox/sandpack-react";

import { Button, Icon } from "../ui";

type Props = {
  files?: Record<string, CodeFile>;
  style?: React.CSSProperties;
  question?: Question;
  className?: string;
  onChange?: (files: SandpackState["files"]) => void;
  showTabs?: boolean;
  exclude?: string[];
};

export function CodeEditor(props: Props) {
  const codemirrorInstance = useRef<any>(null);
  const { className, showTabs = true, exclude } = props;
  const { sandpack } = useSandpack();
  const [loading, setLoading] = useState(true);
  const { setActiveFile, activeFile, files } = sandpack;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const onPrettify = () => {
    // if there is an error, we don't want to prettify the code
    const activeFile = sandpack.activeFile;
    const code = sandpack.files[activeFile].code;
    const ext = activeFile.split(".").pop();
    let plugins = [] as any[];
    let parser = "babel";

    if (ext === "js" || ext === "jsx") {
      plugins = [babel, estree];
    }

    if (ext === "html") {
      plugins = [html];
      parser = "html";
    }

    if (ext === "css") {
      parser = "css";
      plugins = [postcss];
    }

    prettier
      .format(code, {
        parser: parser,
        plugins: plugins,
      })
      .then((formatted) => {
        if (formatted) {
          const cmInstance = codemirrorInstance.current.getCodemirror();

          if (cmInstance) {
            const trans = cmInstance.state.update({
              changes: {
                from: 0,
                to: cmInstance.state.doc.length,
                insert: formatted,
              },
            });

            cmInstance.update([trans]);
          }

          sandpack.updateFile(activeFile, formatted);
        }
      })
      .catch(console.log);
  };

  return (
    <Card className={cn("flex h-full w-full flex-col overflow-hidden", className)}>
      {showTabs && (
        <Tabs
          defaultValue={activeFile}
          onValueChange={(value) => {
            setActiveFile(value);
          }}
          value={activeFile}
          className="sticky top-0 z-10"
        >
          <TabsList className="flex items-center">
            <div className="flex flex-grow gap-2">
              {Object.keys(files)
                .filter((file) => {
                  const isHidden = files[file].hidden;
                  const excluded = exclude?.includes(file);
                  const or = isHidden || excluded;

                  return !or;
                })
                .map((file) => {
                  return (
                    <TabsTrigger key={file} value={file}>
                      {file.replace("/", "")}
                    </TabsTrigger>
                  );
                })}
            </div>
            <div className="mx-1">
              <Button variant="tertiary" size="sm" onClick={onPrettify}>
                <Icon name="tidy" />
                Tidy
              </Button>
            </div>
          </TabsList>
        </Tabs>
      )}
      <div className="flex-grow overflow-hidden">
        {loading ? (
          <div className="flex h-full flex-col justify-center gap-2 text-center">
            <p className="animate-spin text-3xl">⚙️</p>
            <p className="text-lg font-semibold">Booting up the editor...</p>
            <p className="text-muted-foreground text-sm">Please wait while we load the editor.</p>
          </div>
        ) : (
          <SandpackCodeEditor ref={codemirrorInstance} showLineNumbers showTabs={false} className="h-full" />
        )}
      </div>
    </Card>
  );
}

const MemoizedCodeEditor = memo(CodeEditor);

export default MemoizedCodeEditor;
