import { useSandpack } from "@codesandbox/sandpack-react";
import { Icon, IconButton } from "~/components/ui";
import { useContext } from "react";
import { SandpackLocalContext } from "./SandpackLocalProvider";

export function FileExplorer() {
  const { sandpack } = useSandpack();
  const { deleteFile, addFile } = useContext(SandpackLocalContext);
  const { files, setActiveFile, activeFile } = sandpack;

  return (
    <div className="">
      <div className="flex items-center justify-between ">
        <p className="text-[var(--color-fg-neutral-subtle)]">Files</p>
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
        {Object.keys(files).map((filename) => {
          return (
            <div
              data-selected={activeFile === filename ? "" : undefined}
              key={filename}
              onClick={() => {
                setActiveFile(filename);
              }}
              className="group flex h-6 items-center justify-between rounded-sm text-left text-[var(--color-fg-subtle)] hover:text-[var(--color-fg)] data-[selected]:font-semibold data-[selected]:text-[var(--color-fg-active)]"
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
