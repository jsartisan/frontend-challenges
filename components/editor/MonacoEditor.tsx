import React from "react";
import Editor from "@monaco-editor/react";
import { useActiveCode, useSandpack } from "@codesandbox/sandpack-react";
import { useTheme } from "next-themes";

export function MonacoEditor() {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();
  const { theme } = useTheme();
  const language = (function () {
    switch (sandpack.activeFile.split(".").pop()) {
      case "js":
        return "javascript";
      case "jsx":
        return "javascript";
      case "ts":
        return "typescript";
      case "css":
        return "css";
      case "html":
        return "html";
      case "json":
        return "json";
      case "md":
        return "markdown";
      default:
        return "plaintext";
    }
  })();

  return (
    <Editor
      width="100%"
      height="100%"
      path={sandpack.activeFile}
      language={language}
      theme={`vs-${theme}`}
      defaultValue={code}
      onChange={(value) => updateCode(value || "")}
    />
  );
}
