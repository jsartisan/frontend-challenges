"use client";

import { memo, useRef } from "react";
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
import { Button, Icon, IconButton } from "../ui";
import { cn } from "../../utils/helpers";
import { MonacoEditor } from "./MonacoEditor";
import { Tabs, TabsList, TabsTrigger } from "../ui";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

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
  resetFiles?: () => void;
};

export function CodeEditor(props: Props) {
  const { className, showTabs = true, exclude, path, template, onChange, resetFiles } = props;
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

  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const shadowStartRef = useRef<HTMLDivElement>(null);
  const shadowEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    const wrapper = wrapperRef.current;
    const shadowStart = shadowStartRef.current;
    const shadowEnd = shadowEndRef.current;

    if (content && wrapper && shadowStart && shadowEnd) {
      const contentScrollWidth = content.scrollWidth - wrapper.offsetWidth;
      const isOverflowing = contentScrollWidth > 0;
      if (isOverflowing) {
        shadowEnd.style.opacity = "1";
      }
    }

    if (content && wrapper && shadowStart && shadowEnd) {
      const contentScrollWidth = content.scrollWidth - wrapper.offsetWidth;

      const handleScroll = () => {
        const currentScroll = content.scrollLeft / contentScrollWidth;
        shadowStart.style.opacity = currentScroll.toString();
        shadowEnd.style.opacity = (1 - currentScroll).toString();
      };

      content.addEventListener("scroll", handleScroll);

      return () => {
        content.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

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
          <TabsList className="flex items-center gap-0 p-0">
            <div className="relative h-full flex-grow overflow-x-hidden" ref={wrapperRef}>
              <div
                className="absolute left-0 top-0 h-full w-4 bg-gradient-to-r from-black/10 to-transparent opacity-0"
                ref={shadowStartRef}
              />
              <div
                className="absolute right-0 top-0 h-full w-4 bg-gradient-to-l from-black/10 to-transparent opacity-0"
                ref={shadowEndRef}
              />
              <div className="scrollbar-hide h-full overflow-x-auto" ref={contentRef}>
                <div className="flex h-full w-max flex-nowrap items-center gap-2 px-1">
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
                          {files[file].readOnly && (
                            <Icon name="lock" className="text-[var(--color-ic-neutral-subtle)]" />
                          )}{" "}
                          {file.replace("/", "")}
                        </TabsTrigger>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-1">
              <Button variant="tertiary" size="sm" onClick={onPrettify} type="button">
                <Icon name="tidy" />
                Tidy
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <IconButton variant="tertiary" size="sm" type="button">
                    <Icon name="vertical-dots" />
                  </IconButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={typeof resetFiles === "function" ? resetFiles : () => {}}
                    className="flex-col items-start"
                  >
                    <div>Reset Files</div>
                    <div className="text-xs text-[var(--color-fg-neutral-subtle)]">
                      Reset all files to the initial state
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
          <MonacoEditor onChange={onChange} template={template} path={path} key={Object.keys(files).join("-")} />
        )}
      </div>
    </Card>
  );
}

const MemoizedCodeEditor = memo(CodeEditor);

export default MemoizedCodeEditor;
