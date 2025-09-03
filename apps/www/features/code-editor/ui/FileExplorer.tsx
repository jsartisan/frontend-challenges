import { useContext } from "react";
import { useSandpack } from "@codesandbox/sandpack-react";

import { Icon, IconButton } from "~/components/ui";
import { SandpackLocalContext } from "~/features/code-editor/context/SandpackLocalProvider";

export function FileExplorer() {
  const { sandpack } = useSandpack();
  const context = useContext(SandpackLocalContext);
  const { activeFile, files, setActiveFile } = sandpack;

  if (!context) {
    throw new Error("FileExplorer must be used within SandpackLocalProvider");
  }

  const { addFile, deleteFile } = context;
  const visibleFiles = Object.keys(files).filter((file) => !files[file].hidden);

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <p className="text-(--color-fg-neutral-subtle)">Files</p>
        <IconButton
          size="sm"
          variant="tertiary"
          type="button"
          onClick={() => {
            const filename = prompt("Enter filename");

            if (filename) {
              let name = filename;
              // add slash to filename if it doesn't have one
              if (!filename.startsWith("/")) {
                name = "/" + filename;
              }

              addFile(name);
            }
          }}
        >
          <Icon name="plus" size="sm" />
        </IconButton>
      </div>
      <div className="mt-1 flex flex-col gap-1">
        {visibleFiles.map((filename) => {
          return (
            <div
              data-selected={activeFile === filename ? "" : undefined}
              key={filename}
              onClick={() => {
                setActiveFile(filename);
              }}
              className="text-(--color-fg-subtle) hover:text-(--color-fg) data-selected:font-semibold data-selected:text-(--color-fg-active) group flex h-6 items-center justify-between rounded-sm text-left"
            >
              {filename}

              <IconButton
                variant="tertiary"
                size="sm"
                type="button"
                className="invisible group-hover:visible"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  deleteFile(filename);
                }}
              >
                <Icon name="delete" />
              </IconButton>
            </div>
          );
        })}
      </div>
    </div>
  );
}
