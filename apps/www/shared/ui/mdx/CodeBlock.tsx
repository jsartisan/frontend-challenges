import { Suspense } from "react";
import { useTheme } from "next-themes";
import { SandpackCodeViewer, SandpackProvider } from "@codesandbox/sandpack-react";

interface CodeBlockProps {
  children: any;
}

export const CodeBlock = ({ children }: CodeBlockProps) => {
  const { children: code, meta } = children?.props || { children, meta: undefined };
  const { resolvedTheme } = useTheme();

  const filename = meta?.split(" ")[0];

  return (
    <Suspense fallback={<pre className="h-20">{code}</pre>}>
      <SandpackProvider
        options={{
          classes: {
            "sp-code-editor": "border! border-(--color-bd)! rounded!",
            "sp-editor-viewer": "rounded!",
          },
        }}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        template="vanilla"
        files={{
          [filename || "index.js"]: {
            code: code ? code.trim() : "",
            active: true,
          },
        }}
      >
        <SandpackCodeViewer />
      </SandpackProvider>
    </Suspense>
  );
};
