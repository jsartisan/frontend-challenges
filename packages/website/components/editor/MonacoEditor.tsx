import { useTheme } from "next-themes";
import React, { useEffect } from "react";
import { emmetHTML, emmetCSS } from "emmet-monaco-es";
import Editor, { useMonaco } from "@monaco-editor/react";
import { SupportedTemplates } from "@/shared";
import { SandpackState, useSandpack } from "@codesandbox/sandpack-react";
// Import React types to use in Monaco

import { setLanguage } from "../../utils/helpers";

type MonacoEditorProps = {
  path?: string;
  file?: string;
  template: SupportedTemplates;
  onChange?: (files: SandpackState["files"]) => void;
  fontSize?: number;
  tabSize?: number;
  vimMode?: boolean;
};

export function MonacoEditor(props: MonacoEditorProps) {
  const { path = "", file, template, onChange, fontSize, tabSize, vimMode } = props;
  const monaco = useMonaco();
  const { sandpack } = useSandpack();
  const { files, updateFile } = sandpack;
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (monaco) {
      Object.keys(files).forEach((file) => {
        if (monaco.editor.getModel(monaco.Uri.parse(`${path}${file}`))) {
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
        // Use the modern React JSX transform
        jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
        types: ["react", "react-dom"],
        allowSyntheticDefaultImports: true,
        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      });

      // add jest types to the monaco editor
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        `declare const test: any;declare const expect: any;declare const describe: any;declare const it: any;`,
        "jest.d.ts",
      );

      // Load React type definitions from @types/react and @types/react-dom via unpkg and add them to Monaco
      async function loadReactTypeDefinitions() {
        const reactVersion = "18"; // keep this in sync with the version in package.json
        const reactDomVersion = "18";

        const reactBase = `https://unpkg.com/@types/react@${reactVersion}/`;
        const reactDomBase = `https://unpkg.com/@types/react-dom@${reactDomVersion}/`;

        // Known important files we need besides index.d.ts
        const reactFiles = ["index.d.ts", "global.d.ts", "jsx-runtime.d.ts", "experimental.d.ts"];
        const reactDomFiles = ["client.d.ts", "index.d.ts"];

        try {
          const reactPromises = reactFiles.map(async (f) => {
            const txt = await fetch(reactBase + f).then((r) => r.text());
            return [`file:///node_modules/@types/react/${f}`, txt] as const;
          });

          const reactDomPromises = reactDomFiles.map(async (f) => {
            const txt = await fetch(reactDomBase + f).then((r) => r.text());
            return [`file:///node_modules/@types/react-dom/${f}`, txt] as const;
          });

          const files = await Promise.all([...reactPromises, ...reactDomPromises]);

          files.forEach(([path, contents]) => {
            monaco.languages.typescript.typescriptDefaults.addExtraLib(contents, path);
          });
        } catch (error) {
          console.error("Failed to load React type definitions for Monaco", error);
        }
      }

      loadReactTypeDefinitions();

      monaco.editor.registerEditorOpener({
        openCodeEditor(source, resource) {
          const model = monaco.editor.getModel(monaco.Uri.parse(`${path}${resource.path}`));

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

  function handleEditorDidMount(editor) {
    // @ts-expect-error window.require is not defined
    window.require.config({
      paths: {
        "monaco-vim": "https://unpkg.com/monaco-vim/dist/monaco-vim",
      },
    });

    // @ts-expect-error window.require is not defined
    window.require(["monaco-vim"], function (MonacoVim) {
      if (vimMode) {
        MonacoVim.initVimMode(editor, document.querySelector(".vim-status-node"));

        return;
      }
    });
  }

  if (!monaco) return null;

  return (
    <Editor
      width="100%"
      height="100%"
      path={`${path}${file}`}
      onMount={handleEditorDidMount}
      language={setLanguage(file)}
      theme={`vs-${resolvedTheme}`}
      value={(function () {
        if (files[file]) {
          return files[file].code;
        }

        // console.log("failing file", file, files);

        return "";
      })()}
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
