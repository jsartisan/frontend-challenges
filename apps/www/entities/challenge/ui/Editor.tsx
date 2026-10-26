import { useRef } from "react";
import { useSandpack } from "@codesandbox/sandpack-react";

import { track } from "~/shared/lib/analytics";
import { File } from "~/features/code-editor/ui/File";
import { formatFileName } from "~/features/code-editor/lib/formatFileName";
import { AddNewFileButton } from "~/features/code-editor/ui/AddNewFileButton";
import { ResizableLayoutPanel } from "~/features/code-editor/ui/ResizableLayoutPanel";

import { Question, SupportedTemplates } from "../model/types";
import { getChallengeAnalyticsProperties } from "../lib/getChallengeAnalyticsProperties";

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
  const hasTrackedStart = useRef(false);

  const onFileChange = (file: string, value: string) => {
    if (!hasTrackedStart.current) {
      hasTrackedStart.current = true;
      track("Challenge Started", { ...getChallengeAnalyticsProperties(challenge), template });
    }

    onChange?.(file, value);
  };

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
              onChange={onFileChange}
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
