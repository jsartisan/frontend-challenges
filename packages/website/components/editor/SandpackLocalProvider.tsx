import { SupportedTemplates } from "@/shared";
import { createContext, useContext, useMemo } from "react";
import { SandpackFiles, useSandpack } from "@codesandbox/sandpack-react";

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
  const { children, template, path, originalFiles } = props;
  const { sandpack } = useSandpack();
  const { updateFile, deleteFile, files, openFile, setActiveFile, closeFile, addFile } = sandpack;

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

export const useSandpackLocal = () => {
  const context = useContext(SandpackLocalContext);

  if (!context) {
    throw new Error("useSandpackLocal must be used within a SandpackLocalProvider");
  }

  return context;
};
