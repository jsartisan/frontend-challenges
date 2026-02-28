import { useTheme } from "next-themes";
import React, { useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";

import { setLanguage } from "~/features/code-editor/lib/setLanguage";
import { CodeFile, SupportedTemplates } from "~/entities/challenge/model/types";
import { loadReactTypeDefinitions } from "~/features/code-editor/lib/loadReactTypeDefinitions";

import { enableEmmet } from "../lib/enableEmmet";

type MonacoEditorProps = {
  path?: string;
  file?: string;
  template: SupportedTemplates;
  onChange?: (value: string, file: string) => void;
  fontSize?: number;
  tabSize?: number;
  files: Record<string, CodeFile>;
  readOnly?: boolean;
};

export function MonacoEditor(props: MonacoEditorProps) {
  const { file, files, fontSize, onChange, path = "", readOnly = false, tabSize, template } = props;
  const monaco = useMonaco();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (monaco) {
      Object.keys(files).forEach((file) => {
        const uri = `${path}${file}`;
        const modelUri = monaco.Uri.parse(uri);

        const existingModel = monaco.editor.getModel(modelUri);

        if (existingModel) {
          existingModel.setValue(files[file].code);
          return;
        }

        monaco.editor.createModel(files[file].code, setLanguage(file), modelUri);
      });

      monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        noImplicitAny: true,
        esModuleInterop: true,
        strict: true,
        target: monaco.languages.typescript.ScriptTarget.ESNext,
        // Use the modern React JSX transform
        jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
        allowSyntheticDefaultImports: true,
        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      });

      // add jest types to the monaco editor
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        `declare const test: any;declare const expect: any;declare const describe: any;declare const it: any;`,
        "jest.d.ts",
      );

      loadReactTypeDefinitions(monaco);
      enableEmmet(monaco);

      monaco.editor.registerEditorOpener({
        openCodeEditor(source, resource) {
          const model = monaco.editor.getModel(monaco.Uri.parse(`${resource.path}`));

          if (!model) return false;

          dispatchEvent(new CustomEvent("setActiveFile", { detail: resource.path }));

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
      path={`${path}${file}`}
      language={setLanguage(file)}
      theme={`vs-${resolvedTheme}`}
      value={(function () {
        if (!file) return "";

        if (files[file]) {
          return files[file].code;
        }

        return "";
      })()}
      options={{
        readOnly: file ? files[file]?.readOnly || readOnly : false,
        minimap: { enabled: false },
        tabSize: tabSize || 2,
        fontSize: fontSize || 14,
        detectIndentation: false,
        fixedOverflowWidgets: true,
      }}
      onChange={(value) => {
        if (!file) return;

        if (onChange) {
          onChange(value ?? "", file);
        }
      }}
    />
  );
}
