"use client";

import { memo } from "react";
import { useState } from "react";
import { SandpackState, useSandpack } from "@codesandbox/sandpack-react";
import { CodeFile, SupportedTemplates } from "@/shared";

import { Button, Checkbox, Icon, IconButton, Label, ToggleGroup, ToggleGroupItem } from "../ui";
import { MonacoEditor } from "./MonacoEditor";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { useSandpackLocal } from "./SandpackLocalProvider";
import { usePrettify } from "../../hooks/usePrettify";
import { Slider } from "../ui/slider";
import { getLocalStorageItem, setLocalStorageItem } from "~/utils/localStorage";

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
  const { path, template, originalFiles, file } = props;
  const { sandpack } = useSandpack();
  const { resetFiles } = useSandpackLocal();
  const [editorFontSize, _setEditorFontSize] = useState(() => {
    const stored = getLocalStorageItem(`editor-font-size`, 14);

    return stored ? parseInt(stored) : 14;
  });
  const [vimMode, setVimMode] = useState(false);
  const [editorTabSize, _setEditorTabSize] = useState(() => {
    const stored = getLocalStorageItem(`editor-tab-size`, 2);

    return stored ? parseInt(stored) : 2;
  });
  const { files, updateFile } = sandpack;

  const onChange = (files: SandpackState["files"]) => {
    if (path) {
      setLocalStorageItem(`${path}-${template}`, {
        ...files,
      });
    }
  };

  const setEditorFontSize = (size: number) => {
    setLocalStorageItem(`:editor-font-size`, size.toString());
    _setEditorFontSize(size);
  };

  const setEditorTabSize = (size: number) => {
    setLocalStorageItem(`editor-tab-size`, size.toString());
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
    prettify(options).then((updatedFiles) => {
      if (updatedFiles) {
        onChange(updatedFiles);
      }
    });
  };

  return (
    <>
      <div className="h-full w-full grow flex-col overflow-hidden">
        <div className="min-h-auto border-(--color-bd) flex items-center gap-2 border-b p-1">
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
                  <div className="text-(--color-fg-neutral-subtle) text-xs">
                    Reset the current file to the initial state
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={typeof resetFiles === "function" ? resetFiles : () => {}}
                  className="flex-col items-start"
                >
                  <div>Reset Files</div>
                  <div className="text-(--color-fg-neutral-subtle) text-xs">Reset all files to the initial state</div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <MonacoEditor
          key={vimMode ? "vim" : "normal"}
          fontSize={editorFontSize}
          tabSize={editorTabSize}
          onChange={onChange}
          template={template}
          vimMode={vimMode}
          path={path}
          file={file}
        />
      </div>
    </>
  );
}

const MemoizedCodeEditor = memo(_CodeEditor);

export default MemoizedCodeEditor;
