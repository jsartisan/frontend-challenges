import { createContext, useMemo } from "react";
import { SandpackFiles, useSandpack } from "@codesandbox/sandpack-react";

import { SupportedTemplates } from "~/entities/challenge/model/types";

type SandpackLocalContextType = {
  updateFile: (pathOrFiles: string | SandpackFiles, code?: string, shouldUpdatePreview?: boolean) => void;
  deleteFile: (path: string) => void;
  addFile: (path: string) => void;
  resetFiles: () => void;
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

    localStorage.setItem(
      `${path}-${template}`,
      JSON.stringify({
        ...files,
        [name]: {
          code: "",
        },
      }),
    );
  };

  const _deleteFile = (...args: Parameters<typeof deleteFile>) => {
    const [filename] = args;

    openFile("/index.js");
    setActiveFile("/index.js");
    closeFile(filename);
    deleteFile(filename, true);

    localStorage.setItem(
      `${path}-${template}`,
      JSON.stringify(Object.fromEntries(Object.entries(files).filter(([file]) => file !== filename))),
    );
  };

  const _resetFiles = () => {
    localStorage.removeItem(`${path}-${template}`);
    updateFile(originalFiles);
  };

  const memoizedChildren = useMemo(() => children, [children]);

  return (
    <SandpackLocalContext.Provider
      value={{ updateFile: _updateFile, deleteFile: _deleteFile, addFile: _addFile, resetFiles: _resetFiles }}
    >
      {memoizedChildren}
    </SandpackLocalContext.Provider>
  );
}
