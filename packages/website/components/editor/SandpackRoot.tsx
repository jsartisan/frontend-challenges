"use client";

import { useTheme } from "next-themes";
import { SandpackProvider } from "@codesandbox/sandpack-react";

import { cn } from "../../utils/helpers";
import { SandpackLocalProvider } from "./SandpackLocalProvider";
import { SupportedTemplates, TEMPLATES } from "@/shared";

type Props = {
  path?: string;
  template?: SupportedTemplates;
  children: React.ReactNode;
  files?: Record<string, string>;
  className?: string;
};

export function SandpackRoot(props: Props) {
  const { resolvedTheme } = useTheme();
  const { children, className, files, path, template } = props;
  const originalFiles = { ...TEMPLATES[template].files, ...files };
  const isStatic = template === "static";

  return (
    <SandpackProvider
      files={files}
      customSetup={isStatic ? undefined : {}}
      template={isStatic ? "static" : undefined}
      key={`${Object.keys(files).join("-")}-${resolvedTheme}}`}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      options={{
        classes: {
          "sp-code-editor": "!bg-[var(--color-bg)] h-full",
          "sp-wrapper": "!h-auto sm:!h-[calc(100vh_-_var(--nav-top-offset))] !text-[length:inherit]",
          "sp-layout": cn("!bg-inherit !border-none h-full", className),
          "sp-navigator": "!h-10 !border-b-[var(--color-bd)]",
          "sp-input": "!h-6 !rounded",
        },
      }}
    >
      <SandpackLocalProvider originalFiles={originalFiles} path={path} template={template}>
        {children}
      </SandpackLocalProvider>
    </SandpackProvider>
  );
}
