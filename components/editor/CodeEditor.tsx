"use client";

import { memo } from "react";
import { Card } from "../ui/card";
import { cn } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { CodeFile, Question } from "@/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SandpackCodeEditor, SandpackState, useSandpack } from "@codesandbox/sandpack-react";

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
  const { className, onChange, showTabs = true, exclude } = props;
  const { sandpack } = useSandpack();
  const [loading, setLoading] = useState(true);
  const { setActiveFile, activeFile, files } = sandpack;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (files && onChange !== undefined) {
      onChange(files);
    }
  }, [files]);

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
          </TabsList>
        </Tabs>
      )}
      <div className="flex-grow overflow-hidden">
        {loading ? (
          <div className="flex h-full flex-col justify-center gap-2 text-center">
            <p className="animate-spin text-3xl">⚙️</p>
            <p className="text-lg font-semibold">Booting up the editor...</p>
            <p className="text-sm text-muted-foreground">Please wait while we load the editor.</p>
          </div>
        ) : (
          <SandpackCodeEditor showRunButton={false} showLineNumbers showTabs={false} className="h-full" />
        )}
      </div>
    </Card>
  );
}

const MemoizedCodeEditor = memo(CodeEditor);

export default MemoizedCodeEditor;
