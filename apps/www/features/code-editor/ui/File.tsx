"use client";

import { useState } from "react";
import { useSandpack } from "@codesandbox/sandpack-react";

import { Slider } from "~/components/ui/slider";
import { MonacoEditor } from "~/features/code-editor/ui/MonacoEditor";
import { usePrettify } from "~/features/code-editor/hooks/usePrettify";
import { CodeFile, SupportedTemplates } from "~/entities/challenge/model/types";
import { useSandpackLocal } from "~/features/code-editor/hooks/useSandpackLocal";
import { Popover, PopoverTrigger, PopoverContent } from "~/components/ui/popover";
import { getLocalStorageItem, setLocalStorageItem } from "~/shared/lib/localStorage";
import { Button, Icon, IconButton, Label, ToggleGroup, ToggleGroupItem, Tooltip } from "~/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

type FileProps = {
  files?: Record<string, CodeFile>;
  originalFiles?: Record<string, CodeFile>;
  style?: React.CSSProperties;
  className?: string;
  showTabs?: boolean;
  exclude?: string[];
  path?: string;
  template: SupportedTemplates;
  file?: string;
  onChange?: (file, value: string) => void;
};

export function File(props: FileProps) {
  const { file, onChange: onChangeProp, path, template } = props;
  const { sandpack } = useSandpack();
  const { activeFile } = sandpack;
  const { deleteFile, originalFiles, resetFile, resetFiles } = useSandpackLocal();
  const [editorFontSize, _setEditorFontSize] = useState(() => {
    const stored = getLocalStorageItem(`editor-font-size`, 14);

    return stored ? parseInt(stored) : 14;
  });
  const [editorTabSize, _setEditorTabSize] = useState(() => {
    const stored = getLocalStorageItem(`editor-tab-size`, 2);

    return stored ? parseInt(stored) : 2;
  });
  const { files, updateFile } = sandpack;
  const isTestFile = activeFile.includes(".test.");

  const onChange = (value) => {
    if (onChangeProp) {
      onChangeProp(file, value);
    }

    if (path) {
      setLocalStorageItem(`${path}-${template}`, {
        ...files,
        [activeFile]: {
          ...files[activeFile],
          code: value,
        },
      });
    }

    updateFile(activeFile, value);
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

  const prettify = usePrettify();

  const onPrettify = (options: { tabSize?: number }) => {
    if (!files) return;

    prettify(activeFile, files?.[activeFile]?.code, options).then((formattedFile) => {
      if (formattedFile) {
        onChange(formattedFile);
      }
    });
  };

  return (
    <>
      <div className="h-full w-full grow flex-col overflow-hidden">
        <div className="min-h-auto border-border flex items-center gap-2 border-b p-1">
          <Button variant="tertiary" size="sm" onClick={() => onPrettify({ tabSize: editorTabSize })} type="button">
            <Icon name="tidy" />
            Tidy
          </Button>
          <div className="ms-auto flex items-center">
            {activeFile in originalFiles === false && (
              <Tooltip content="Delete file">
                <IconButton
                  onClick={() => {
                    deleteFile(activeFile);
                  }}
                  variant="tertiary"
                  size="sm"
                >
                  <Icon name="delete" />
                </IconButton>
              </Tooltip>
            )}
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
                <DropdownMenuItem onClick={() => resetFile(activeFile)} className="flex-col items-start">
                  <div>Reset Current File</div>
                  <div className="text-muted-foreground/60 text-xs">
                    Reset the current file to the initial state
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={typeof resetFiles === "function" ? resetFiles : () => {}}
                  className="flex-col items-start"
                >
                  <div>Reset Files</div>
                  <div className="text-muted-foreground/60 text-xs">Reset all files to the initial state</div>
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
          path={path}
          files={files}
          file={file}
          readOnly={isTestFile && false}
        />
      </div>
    </>
  );
}
