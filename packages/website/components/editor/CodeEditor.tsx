"use client";

import { memo } from "react";
import { useEffect, useState } from "react";
import { SandpackState, useSandpack } from "@codesandbox/sandpack-react";
import { CodeFile, STORAGE_KEY, SupportedTemplates } from "@frontend-challenges/shared";

import { Card } from "../ui/card";
import {
  Button,
  Icon,
  IconButton,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui";
import { cn } from "../../utils/helpers";
import { MonacoEditor } from "./MonacoEditor";
import { Tabs, TabsList, TabsTrigger } from "../ui";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { useSandpackLocal } from "./SandpackLocalProvider";
import { useScrollableTabs } from "packages/website/hooks/useScrollableTabs";
import { usePrettify } from "../../hooks/usePrettify";

type Props = {
  files?: Record<string, CodeFile>;
  originalFiles?: Record<string, CodeFile>;
  style?: React.CSSProperties;
  className?: string;
  onChange?: (files: SandpackState["files"]) => void;
  showTabs?: boolean;
  exclude?: string[];
  path?: string;
  template: SupportedTemplates;
};

export function CodeEditor(props: Props) {
  const { className, showTabs = true, exclude, path, template, originalFiles, onChange: onChangeProp } = props;
  const { sandpack } = useSandpack();
  const { resetFiles } = useSandpackLocal();
  const [loading, setLoading] = useState(true);
  const [editorFontSize, _setEditorFontSize] = useState(() => {
    const stored = localStorage.getItem(`${STORAGE_KEY}:editor-font-size`);

    return stored ? parseInt(stored) : 14;
  });
  const [editorTabSize, _setEditorTabSize] = useState(() => {
    const stored = localStorage.getItem(`${STORAGE_KEY}:editor-tab-size`);

    return stored ? parseInt(stored) : 2;
  });
  const { setActiveFile, activeFile, files, updateFile } = sandpack;

  const onChange = (files: SandpackState["files"]) => {
    if (path) {
      localStorage.setItem(
        `${path}-${template}`,
        JSON.stringify({
          ...files,
        }),
      );
    }

    if (typeof onChangeProp === "function") {
      onChangeProp(files);
    }
  };

  const setEditorFontSize = (size: number) => {
    localStorage.setItem(`${STORAGE_KEY}:editor-font-size`, size.toString());
    _setEditorFontSize(size);
  };

  const setEditorTabSize = (size: number) => {
    localStorage.setItem(`${STORAGE_KEY}:editor-tab-size`, size.toString());
    _setEditorTabSize(size);
    onPrettify({ tabSize: size });
  };

  const onResetCurrentFile = () => {
    const activeFile = sandpack.activeFile;
    const originalCode = originalFiles[activeFile].code;

    updateFile(activeFile, originalCode);

    if (path) {
      localStorage.setItem(
        `${path}-${template}`,
        JSON.stringify({
          ...files,
          [activeFile]: {
            ...files[activeFile],
            code: originalCode,
          },
        }),
      );
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const prettify = usePrettify();

  const onPrettify = (options: { tabSize?: number }) => {
    prettify(options).then((updatedFiles) => {
      if (updatedFiles) {
        onChange(updatedFiles);
      }
    });
  };

  const { contentRef, wrapperRef, shadowStartRef, shadowEndRef, scrollbarRef } = useScrollableTabs();

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
              <Button variant="tertiary" size="sm" onClick={() => onPrettify({ tabSize: editorTabSize })} type="button">
                <Icon name="tidy" />
                Tidy
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <IconButton variant="tertiary" size="sm" type="button">
                    <Icon name="settings" />
                  </IconButton>
                </PopoverTrigger>
                <PopoverContent align="end">
                  <div className="font-bold">Editor Settings</div>
                  <div className="mt-2 flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      <Label>Font Size</Label>
                      <Select
                        onValueChange={(value: string) => setEditorFontSize(parseInt(value))}
                        value={editorFontSize.toString()}
                        defaultValue={editorFontSize.toString()}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select locale" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {[...Array(9)]
                              .map((v, i) => i + 12)
                              .map((fontSize) => (
                                <SelectItem key={fontSize} value={fontSize.toString()}>
                                  {fontSize}px
                                </SelectItem>
                              ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label>Tab Size</Label>
                      <Select
                        onValueChange={(value: string) => setEditorTabSize(parseInt(value))}
                        value={editorTabSize.toString()}
                        defaultValue={editorTabSize.toString()}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select locale" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {[2, 4].map((tabSize) => (
                              <SelectItem key={tabSize} value={tabSize.toString()}>
                                {tabSize}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <IconButton variant="tertiary" size="sm" type="button">
                    <Icon name="vertical-dots" />
                  </IconButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={typeof onResetCurrentFile === "function" ? onResetCurrentFile : () => {}}
                    className="flex-col items-start"
                  >
                    <div>Reset Current File</div>
                    <div className="text-xs text-[var(--color-fg-neutral-subtle)]">
                      Reset the current file to the initial state
                    </div>
                  </DropdownMenuItem>
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
          <MonacoEditor
            fontSize={editorFontSize}
            tabSize={editorTabSize}
            onChange={onChange}
            template={template}
            path={path}
            key={Object.keys(files).join("-")}
          />
        )}
      </div>
    </Card>
  );
}

const MemoizedCodeEditor = memo(CodeEditor);

export default MemoizedCodeEditor;
