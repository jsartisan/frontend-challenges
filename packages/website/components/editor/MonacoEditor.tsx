import { useTheme } from "next-themes";
import React, { useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { SupportedTemplates } from "@frontend-challenges/shared";
import { SandpackState, useActiveCode, useSandpack } from "@codesandbox/sandpack-react";

import { setLanguage } from "../../utils/helpers";

type MonacoEditorProps = {
  path?: string;
  template: SupportedTemplates;
  onChange?: (files: SandpackState["files"]) => void;
  fontSize?: number;
  tabSize?: number;
};

export function MonacoEditor(props: MonacoEditorProps) {
  const { path = "", template, onChange, fontSize, tabSize } = props;
  const monaco = useMonaco();
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();
  const { files, activeFile } = sandpack;
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (monaco) {
      Object.keys(files).forEach((file) => {
        if (monaco.editor.getModel(monaco.Uri.parse(`${path}${file}`))) {
          // update the model if it already exists
          monaco.editor.getModel(monaco.Uri.parse(`${path}${file}`))?.setValue(files[file].code);

          return;
        }

        monaco.editor.createModel(files[file].code, setLanguage(file), monaco.Uri.parse(`${path}${file}`));
      });

      monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        noImplicitAny: true,
        esModuleInterop: true,
        strict: true,
        target: monaco.languages.typescript.ScriptTarget.ESNext,
      });

      // add jest types to the monaco editor
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        `declare const test: any;declare const expect: any;declare const describe: any;declare const it: any;`,
        "jest.d.ts",
      );

      monaco.editor.registerEditorOpener({
        openCodeEditor(source, resource) {
          const { path } = resource;

          const model = monaco.editor.getModel(monaco.Uri.parse(path));

          if (!model) return false;

          sandpack.setActiveFile(path.replace(props.path || "", ""));

          return true;
        },
      });
    }
  }, [monaco, template]);

  if (!monaco) return null;

  return (
    <Editor
      width="100%"
      height="100%"
      path={`${path}${sandpack.activeFile}`}
      language={setLanguage(sandpack.activeFile)}
      theme={`vs-${resolvedTheme}`}
      value={code}
      options={{
        readOnly: files[sandpack.activeFile]?.readOnly,
        minimap: { enabled: false },
        tabSize: tabSize || 2,
        fontSize: fontSize || 14,
        detectIndentation: false,
        fixedOverflowWidgets: true,
      }}
      onChange={(value) => {
        updateCode(value);

        if (onChange) {
          onChange({
            ...files,
            [activeFile]: {
              ...files[activeFile],
              code: value,
            },
          });
        }
      }}
    />
  );
}
