"use client";

import { memo } from "react";
import babel from "prettier/plugins/babel";
import { useEffect, useState } from "react";
import prettier from "prettier/standalone";
import estree from "prettier/plugins/estree";
import typescript from "prettier/plugins/typescript";
import postcss from "prettier/plugins/postcss";
import prettierHTML from "prettier/plugins/html";
import { SandpackState, useSandpack } from "@codesandbox/sandpack-react";
import { CodeFile, Question, SupportedTemplates } from "@frontend-challenges/shared";

import { Card } from "../ui/card";
import { Button, Icon } from "../ui";
import { cn } from "../../utils/helpers";
import { MonacoEditor } from "./MonacoEditor";
import { Tabs, TabsList, TabsTrigger } from "../ui";

type Props = {
  files?: Record<string, CodeFile>;
  style?: React.CSSProperties;
  question?: Question;
  className?: string;
  onChange?: (files: SandpackState["files"]) => void;
  showTabs?: boolean;
  exclude?: string[];
  path?: string;
  template: SupportedTemplates;
};

export function CodeEditor(props: Props) {
  const { className, showTabs = true, exclude, path, template } = props;
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

    if (ext === "ts") {
      parser = "babel-ts";
      plugins = [babel, estree, typescript];
    }

    if (ext === "html") {
      plugins = [prettierHTML];
      parser = "html";
    }

    if (ext === "css") {
      parser = "css";
      plugins = [postcss];
    }

    console.log(plugins, parser);

    prettier
      .format(code, {
        parser: parser,
        plugins: plugins,
      })
      .then((formatted) => {
        if (formatted) {
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
                      {files[file].readOnly && <Icon name="lock" className="text-[var(--color-ic-neutral-subtle)]" />}{" "}
                      {file.replace("/", "")}
                    </TabsTrigger>
                  );
                })}
            </div>
            <Button variant="tertiary" size="sm" onClick={onPrettify} type="button">
              <Icon name="tidy" />
              Tidy
            </Button>
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
          <MonacoEditor template={template} path={path} key={Object.keys(files).join("-")} />
        )}
      </div>
    </Card>
  );
}

const MemoizedCodeEditor = memo(CodeEditor);

export default MemoizedCodeEditor;
