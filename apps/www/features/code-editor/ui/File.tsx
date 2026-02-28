"use client";

import { useState } from "react";
import { useSandpack } from "@codesandbox/sandpack-react";
import { DialogTrigger } from "react-aria-components";

import { Slider } from "~/components/ui/slider";
import { MonacoEditor } from "~/features/code-editor/ui/MonacoEditor";
import { usePrettify } from "~/features/code-editor/hooks/usePrettify";
import { CodeFile, SupportedTemplates } from "~/entities/challenge/model/types";
import { useSandpackLocal } from "~/features/code-editor/hooks/useSandpackLocal";
import { Popover } from "~/components/ui/popover";
import { Dialog } from "~/components/ui/dialog";
import { getLocalStorageItem, setLocalStorageItem } from "~/shared/lib/localStorage";
import { Button, Icon, IconButton, Label, ToggleGroup, ToggleGroupItem } from "~/components/ui";
import { Tooltip, TooltipTrigger } from "~/components/ui/tooltip";
import {
  MenuTrigger,
  Menu,
  MenuItem,
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

  const onChange = (value: string, currentFile: string) => {
    if (onChangeProp) {
      onChangeProp(currentFile, value);
    }

    if (path) {
      setLocalStorageItem(`${path}-${template}`, {
        ...files,
        [currentFile]: {
          ...files[currentFile],
          code: value,
        },
      });
    }

    updateFile(currentFile, value);
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
        onChange(formattedFile, activeFile);
      }
    });
  };

  return (
    <>
      <div className="h-full w-full grow flex-col overflow-hidden">
        <div className="min-h-auto border-border flex items-center gap-2 border-b p-1">
          <Button variant="ghost" size="sm" onPress={() => onPrettify({ tabSize: editorTabSize })} type="button">
            <Icon name="tidy" />
            Tidy
          </Button>
          <div className="ms-auto flex items-center">
            {activeFile in originalFiles === false && (
              <TooltipTrigger delay={0}>
                <IconButton
                  onPress={() => {
                    deleteFile(activeFile);
                  }}
                  variant="ghost"
                  size="sm"
                >
                  <Icon name="delete" />
                </IconButton>
                <Tooltip>Delete file</Tooltip>
              </TooltipTrigger>
            )}
            <DialogTrigger>
              <IconButton variant="ghost" size="sm" type="button">
                <Icon name="settings" />
              </IconButton>
              <Popover placement="bottom end">
                <Dialog className="p-4">
                  <div className="font-bold">Editor Settings</div>
                  <div className="mt-2 flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <Label>Tab Size</Label>
                      <ToggleGroup size="sm" variant="ghost">
                        <ToggleGroupItem
                          size="sm"
                          id="2"
                          isSelected={editorTabSize === 2}
                          onChange={() => setEditorTabSize(2)}
                        >
                          2 Tabs
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          size="sm"
                          id="4"
                          isSelected={editorTabSize === 4}
                          onChange={() => setEditorTabSize(4)}
                        >
                          4 Tabs
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                    <div className="flex items-center justify-between gap-1">
                      <Label>Font Size</Label>
                      <div className="flex items-center gap-2">
                        <span>{editorFontSize}px</span>
                        <Slider
                          onChange={(value) => setEditorFontSize(value as number)}
                          defaultValue={editorFontSize}
                          minValue={12}
                          maxValue={20}
                          step={1}
                          className="w-32"
                        />
                      </div>
                    </div>
                  </div>
                </Dialog>
              </Popover>
            </DialogTrigger>
            <MenuTrigger>
              <IconButton variant="ghost" size="sm" type="button">
                <Icon name="vertical-dots" />
              </IconButton>
              <Menu placement="bottom end">
                <MenuItem onAction={() => resetFile(activeFile)} className="flex-col items-start">
                  <div>Reset Current File</div>
                  <div className="text-muted-foreground/60 text-xs">
                    Reset the current file to the initial state
                  </div>
                </MenuItem>
                <MenuItem
                  onAction={typeof resetFiles === "function" ? resetFiles : () => {}}
                  className="flex-col items-start"
                >
                  <div>Reset Files</div>
                  <div className="text-muted-foreground/60 text-xs">Reset all files to the initial state</div>
                </MenuItem>
              </Menu>
            </MenuTrigger>
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
