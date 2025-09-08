import { createContext, useMemo } from "react";
import { SandpackFiles, useSandpack } from "@codesandbox/sandpack-react";

import { SupportedTemplates } from "~/entities/challenge/model/types";
import { removeLocalStorageItem, setLocalStorageItem } from "~/shared/lib/localStorage";

type SandpackLocalContextType = {
  updateFile: (pathOrFiles: string | SandpackFiles, code?: string, shouldUpdatePreview?: boolean) => void;
  deleteFile: (path: string) => void;
  addFile: (path: string) => void;
  resetFiles: () => void;
  originalFiles: SandpackFiles;
  resetFile: (path: string) => void;
};

type SandpackLocalProviderProps = {
  path: string;
  template: SupportedTemplates;
  children: React.ReactNode;
  originalFiles: SandpackFiles;
};

export const SandpackLocalContext = createContext<SandpackLocalContextType | null>(null);

export function SandpackLocalProvider(props: SandpackLocalProviderProps) {
  const { children, originalFiles, path, template } = props;
  const { sandpack } = useSandpack();
  const { addFile, closeFile, deleteFile, files, openFile, setActiveFile, updateFile } = sandpack;

  const _updateFile = (...args: Parameters<typeof updateFile>) => {
    updateFile(...args);
  };

  const _addFile = (name: string) => {
    addFile(name, "", false);
    openFile(name);
    setActiveFile(name);

    setLocalStorageItem(`${path}-${template}`, {
      ...files,
      [name]: {
        code: "",
      },
    });
  };

  const _deleteFile = (...args: Parameters<typeof deleteFile>) => {
    const [filename] = args;

    const remainingFiles = Object.keys(files)
      .filter((file) => file !== filename)
      .filter((file) => !files[file].hidden);
    const lastFile = remainingFiles.length > 0 ? remainingFiles[remainingFiles.length - 1] : "/index.js";

    openFile(lastFile);
    setActiveFile(lastFile);
    closeFile(filename);
    deleteFile(filename, true);
    window.dispatchEvent(new CustomEvent("setActiveFile", { detail: lastFile }));

    setLocalStorageItem(
      `${path}-${template}`,
      Object.fromEntries(Object.entries(files).filter(([file]) => file !== filename)),
    );
  };

  const _resetFiles = () => {
    removeLocalStorageItem(`${path}-${template}`);
    updateFile(originalFiles);
  };

  const _resetFile = (path: string) => {
    const file = originalFiles[path];

    if (!file) return;

    const code = typeof file === "string" ? file : file.code;
    updateFile(path, code);
    setLocalStorageItem(`${path}-${template}`, {
      ...files,
      [path]: {
        code: code,
      },
    });
  };

  const memoizedChildren = useMemo(() => children, [children]);

  return (
    <SandpackLocalContext.Provider
      value={{
        updateFile: _updateFile,
        deleteFile: _deleteFile,
        addFile: _addFile,
        resetFiles: _resetFiles,
        originalFiles,
        resetFile: _resetFile,
      }}
    >
      {memoizedChildren}
    </SandpackLocalContext.Provider>
  );
}
