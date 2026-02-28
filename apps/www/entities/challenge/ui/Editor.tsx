import { useSandpack } from "@codesandbox/sandpack-react";

import { File } from "~/features/code-editor/ui/File";
import { formatFileName } from "~/features/code-editor/lib/formatFileName";
import { AddNewFileButton } from "~/features/code-editor/ui/AddNewFileButton";
import { ResizableLayoutPanel } from "~/features/code-editor/ui/ResizableLayoutPanel";

import { Question, SupportedTemplates } from "../model/types";

const FORBIDDEN_FILES = ["/package.json", "/tsconfig.json", "/sandbox.config.json", "/public/index.html"];

type EditorProps = {
  challenge: Question;
  template: SupportedTemplates;
  onChange?: (file: string, value: string) => void;
};

export function Editor(props: EditorProps) {
  const { challenge, onChange, template } = props;
  const { sandpack } = useSandpack();
  const { activeFile, files, setActiveFile } = sandpack;

  return (
    <ResizableLayoutPanel
      value={activeFile}
      actions={<AddNewFileButton />}
      onSelectionChange={(key) => {
        setActiveFile(key);
      }}
    >
      {Object.keys(files)
        .filter((file) => !FORBIDDEN_FILES.includes?.(file))
        .map((file) => ({
          title: formatFileName(file),
          id: file,
          children: (
            <File
              onChange={onChange}
              path={`/challenges/${challenge.path}`}
              template={template}
              file={file}
              key={file}
            />
          ),
        }))}
    </ResizableLayoutPanel>
  );
}
