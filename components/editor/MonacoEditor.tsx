import { useTheme } from "next-themes";
import React, { useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useActiveCode, useSandpack } from "@codesandbox/sandpack-react";
import { SupportedTemplates } from "@/types";

type MonacoEditorProps = {
  path?: string;
  template: SupportedTemplates;
};

export function MonacoEditor(props: MonacoEditorProps) {
  const { path = "", template } = props;
  const monaco = useMonaco();
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();
  const { files } = sandpack;
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
        lib: ["dom", "es2015"],
        types: ["jest"],
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

          console.log({ path, model });

          if (!model) return false;

          sandpack.setActiveFile(path.replace(props.path || "", ""));

          return true;
        },
      });

      const modelList = monaco.editor.getModels();
      console.log("#### models", modelList);
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
        tabSize: 2,
        detectIndentation: false,
        fixedOverflowWidgets: true,
      }}
      onChange={(value) => updateCode(value || "")}
    />
  );
}

const setLanguage = function (activeFile) {
  switch (activeFile.split(".").pop()) {
    case "js":
      return "javascript";
    case "jsx":
      return "javascript";
    case "ts":
      return "typescript";
    case "tsx":
      return "typescript";
    case "css":
      return "css";
    case "html":
      return "html";
    case "json":
      return "json";
    case "md":
      return "markdown";
    case "svelte":
      return "html";
    default:
      return "plaintext";
  }
};
