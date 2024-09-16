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
import { CodeFile, SupportedTemplates } from "@frontend-challenges/shared";

import { Card } from "../ui/card";
import { Button, Icon, IconButton } from "../ui";
import { cn } from "../../utils/helpers";
import { MonacoEditor } from "./MonacoEditor";
import { Tabs, TabsList, TabsTrigger } from "../ui";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

type Props = {
  files?: Record<string, CodeFile>;
  style?: React.CSSProperties;
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
  const scrollbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      const content = contentRef.current;
      const wrapper = wrapperRef.current;
      const shadowStart = shadowStartRef.current;
      const shadowEnd = shadowEndRef.current;
      const scrollbar = scrollbarRef.current;

      if (content && wrapper && shadowStart && shadowEnd) {
        const contentScrollWidth = content.scrollWidth - wrapper.offsetWidth;
        const scrollbarMaxLeft = wrapper.offsetWidth - scrollbar.offsetWidth;

        const handleScroll = () => {
          const currentScroll = content.scrollLeft / contentScrollWidth;
          shadowStart.style.opacity = currentScroll.toString();
          shadowEnd.style.opacity = (1 - currentScroll).toString();

          scrollbar.style.left = `${currentScroll * scrollbarMaxLeft}px`;
        };

        // Dragging variables
        let isDragging = false;
        let startX, scrollStartLeft;

        // Start dragging the scrollbar
        const handleMouseDown = (e) => {
          isDragging = true;
          startX = e.clientX; // Get initial X position when dragging starts
          scrollStartLeft = scrollbar.offsetLeft; // Get the scrollbar's current left position
          document.body.style.userSelect = "none"; // Disable text selection during drag
        };

        // Drag the scrollbar
        const handleMouseMove = (e) => {
          if (!isDragging) return;

          const deltaX = e.clientX - startX;
          let newLeft = scrollStartLeft + deltaX;

          // Clamp the new left position to within bounds
          if (newLeft < 0) newLeft = 0;
          if (newLeft > scrollbarMaxLeft) newLeft = scrollbarMaxLeft;

          scrollbar.style.left = `${newLeft}px`;

          // Calculate the scroll ratio and use native scrollTo for smooth scrolling
          const scrollRatio = newLeft / scrollbarMaxLeft;
          content.scrollTo({
            left: scrollRatio * contentScrollWidth,
          });
        };

        // Stop dragging the scrollbar
        const handleMouseUp = () => {
          isDragging = false;
          document.body.style.userSelect = ""; // Re-enable text selection
        };

        content.addEventListener("scroll", handleScroll);
        scrollbar.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
          content.removeEventListener("scroll", handleScroll);
          scrollbar.removeEventListener("mousedown", handleMouseDown);
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("mouseup", handleMouseUp);
        };
      }
    }, 0);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const content = contentRef.current;
      const wrapper = wrapperRef.current;
      const shadowStart = shadowStartRef.current;
      const shadowEnd = shadowEndRef.current;
      const scrollbar = scrollbarRef.current;

      if (content && wrapper && shadowStart && shadowEnd && scrollbarRef) {
        const contentScrollWidth = content.scrollWidth - wrapper.offsetWidth;
        const isOverflowing = contentScrollWidth > 0;
        if (isOverflowing) {
          shadowEnd.style.opacity = "1";
          scrollbar.style.display = "block";
          scrollbar.style.width = `${(wrapper.offsetWidth / content.scrollWidth) * 100}%`;
        } else {
          shadowEnd.style.opacity = "0";
          scrollbar.style.display = "none";
        }
      }
    }, 0);
  }, [Object.keys(files).join("-")]);

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
          <TabsList className="group flex items-center gap-0 p-0">
            <div className="relative h-full flex-grow overflow-x-hidden" ref={wrapperRef}>
              <div
                className="absolute left-0 top-0 h-full w-4 bg-gradient-to-r from-black/10 to-transparent opacity-0"
                ref={shadowStartRef}
              />
              <div
                className="absolute right-0 top-0 h-full w-4 bg-gradient-to-l from-black/10 to-transparent opacity-0"
                ref={shadowEndRef}
              />
              <div
                ref={scrollbarRef}
                className="absolute bottom-0 z-10 h-[2px] w-4 bg-[var(--color-bd-subtle)] opacity-0 hover:h-[4px] hover:bg-[var(--color-bd-subtle)] active:h-[4px] active:opacity-100 group-hover:opacity-100"
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
            <div className="flex items-center gap-1 px-1">
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
