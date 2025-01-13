import { useTheme } from "next-themes";
import React, { useEffect } from "react";
import { emmetHTML, emmetCSS } from "emmet-monaco-es";
import Editor, { useMonaco } from "@monaco-editor/react";
import { SupportedTemplates } from "@/shared";
import { SandpackState, useSandpack } from "@codesandbox/sandpack-react";

import { setLanguage } from "../../utils/helpers";

type MonacoEditorProps = {
  path?: string;
  file?: string;
  template: SupportedTemplates;
  onChange?: (files: SandpackState["files"]) => void;
  fontSize?: number;
  tabSize?: number;
};

export function MonacoEditor(props: MonacoEditorProps) {
  const { path = "", file, template, onChange, fontSize, tabSize } = props;
  const monaco = useMonaco();
  const { sandpack } = useSandpack();
  const { files, updateFile } = sandpack;
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (monaco) {
      Object.keys(files).forEach((file) => {
        if (monaco.editor.getModel(monaco.Uri.parse(file))) {
          monaco.editor.getModel(monaco.Uri.parse(file))?.setValue(files[file].code);

          return;
        }

        monaco.editor.createModel(files[file].code, setLanguage(file), monaco.Uri.parse(file));
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
          const models = monaco.editor.getModels();
          const model = monaco.editor.getModel(monaco.Uri.parse(resource.path));

          console.log({ model, models, path });

          if (!model) return false;

          dispatchEvent(new CustomEvent("setActiveFile", { detail: resource.path }));

          return true;
        },
      });
    }
  }, [monaco, template]);

  useEffect(() => {
    if (!monaco) return;

    emmetHTML(monaco);
    emmetCSS(monaco);
  }, [monaco]);

  if (!monaco) return null;

  return (
    <Editor
      width="100%"
      height="100%"
      path={file}
      language={setLanguage(file)}
      theme={`vs-${resolvedTheme}`}
      value={files[file].code}
      options={{
        readOnly: files[file]?.readOnly,
        minimap: { enabled: false },
        tabSize: tabSize || 2,
        fontSize: fontSize || 14,
        detectIndentation: false,
        fixedOverflowWidgets: true,
      }}
      onChange={(value) => {
        updateFile(file, value);

        if (onChange) {
          onChange({
            ...files,
            [file]: {
              ...files[file],
              code: value,
            },
          });
        }
      }}
    />
  );
}
