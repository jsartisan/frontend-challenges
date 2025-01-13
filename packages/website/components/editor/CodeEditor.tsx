"use client";

import { memo } from "react";
import { useEffect, useState } from "react";
import { SandpackState, useSandpack } from "@codesandbox/sandpack-react";
import { CodeFile, STORAGE_KEY, SupportedTemplates } from "@/shared";

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
    prettify(options).then((updatedFiles) => {
      if (updatedFiles) {
        onChange(updatedFiles);
      }
    });
  };

  return (
    <>
      <div className="h-full w-full flex-grow overflow-hidden">
        <MonacoEditor
          fontSize={editorFontSize}
          tabSize={editorTabSize}
          onChange={onChange}
          template={template}
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
