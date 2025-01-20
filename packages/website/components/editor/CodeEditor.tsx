"use client";

import { memo } from "react";
import { useEffect, useState } from "react";
import { initVimMode } from "monaco-vim";
import { SandpackState, useSandpack } from "@codesandbox/sandpack-react";
import { CodeFile, STORAGE_KEY, SupportedTemplates } from "@/shared";

import { Card } from "../ui/card";
import {
  Button,
  Checkbox,
  FormLabel,
  Icon,
  IconButton,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  ToggleGroup,
  ToggleGroupItem,
} from "../ui";
import { cn } from "../../utils/helpers";
import { MonacoEditor } from "./MonacoEditor";
import { Tabs, TabsList, TabsTrigger } from "../ui";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { useSandpackLocal } from "./SandpackLocalProvider";
import { useScrollableTabs } from "packages/website/hooks/useScrollableTabs";
import { usePrettify } from "../../hooks/usePrettify";
import { Slider } from "../ui/slider";

type Props = {
  files?: Record<string, CodeFile>;
  originalFiles?: Record<string, CodeFile>;
  style?: React.CSSProperties;
  className?: string;
  showTabs?: boolean;
  exclude?: string[];
  path?: string;
  template: SupportedTemplates;
  file?: string;
};

function _CodeEditor(props: Props) {
  const { className, showTabs = true, exclude, path, template, originalFiles, file } = props;
  const { sandpack } = useSandpack();
  const { resetFiles } = useSandpackLocal();
  const [loading, setLoading] = useState(true);
  const [editorFontSize, _setEditorFontSize] = useState(() => {
    const stored = localStorage.getItem(`${STORAGE_KEY}:editor-font-size`);

    return stored ? parseInt(stored) : 14;
  });
  const [vimMode, setVimMode] = useState(false);
  const [editorTabSize, _setEditorTabSize] = useState(() => {
    const stored = localStorage.getItem(`${STORAGE_KEY}:editor-tab-size`);

    return stored ? parseInt(stored) : 2;
  });
  const { files, updateFile } = sandpack;

  const onChange = (files: SandpackState["files"]) => {
    if (path) {
      localStorage.setItem(
        `${path}-${template}`,
        JSON.stringify({
          ...files,
        }),
      );
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

  const prettify = usePrettify();

  const onPrettify = (options: { tabSize?: number }) => {
    console.log("@@ code", sandpack.activeFile);
    prettify(options).then((updatedFiles) => {
      if (updatedFiles) {
        onChange(updatedFiles);
      }
    });
  };

  return (
    <>
      <div className="  h-full w-full flex-grow flex-col overflow-hidden">
        <div className="flex min-h-[auto] items-center gap-2 border-b border-[var(--color-bd)] p-1">
          <div className="flex items-center gap-2 px-2">
            <Checkbox
              onCheckedChange={(value) => setVimMode(value === "indeterminate" ? false : value)}
              id="vim-mode"
            />
            <label htmlFor="vim-mode">Vim Mode</label>
            {vimMode && <div className="vim-status-node"></div>}
          </div>
          <div className="ms-auto">
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
                  <div className="flex items-center justify-between gap-2">
                    <Label>Tab Size</Label>
                    <ToggleGroup
                      size="sm"
                      variant="ghost"
                      type="single"
                      value={editorTabSize.toString()}
                      onValueChange={(value: string) => setEditorTabSize(parseInt(value))}
                    >
                      <ToggleGroupItem size="sm" value="2">
                        2 Tabs
                      </ToggleGroupItem>
                      <ToggleGroupItem size="sm" value="4">
                        4 Tabs
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    <Label>Font Size</Label>
                    <div className="flex items-center gap-2">
                      <span>{editorFontSize}px</span>
                      <Slider
                        onValueChange={(value) => setEditorFontSize(value[0])}
                        defaultValue={[editorFontSize]}
                        min={12}
                        max={20}
                        step={1}
                        className="w-32"
                      />
                    </div>
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
        </div>
        <MonacoEditor
          fontSize={editorFontSize}
          tabSize={editorTabSize}
          onChange={onChange}
          template={template}
          vimMode={vimMode}
          path={path}
          file={file}
          key={path}
        />
      </div>
    </>
  );
}

const MemoizedCodeEditor = memo(_CodeEditor);

export default MemoizedCodeEditor;
