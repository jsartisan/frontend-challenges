"use client";

import { useTheme } from "next-themes";
import { SandpackProvider } from "@codesandbox/sandpack-react";

import { cn } from "../../utils/helpers";
import { SandpackLocalProvider } from "./SandpackLocalProvider";
import { CodeFile, SupportedTemplates } from "@frontend-challenges/shared";

type Props = {
  path?: string;
  template?: SupportedTemplates;
  children: React.ReactNode;
  files?: Record<string, string>;
  className?: string;
  originalFiles?: Record<string, CodeFile>;
};

export default function SandpackRoot(props: Props) {
  const { resolvedTheme } = useTheme();
  const { children, className, files, path, template, originalFiles } = props;

  return (
    <SandpackProvider
      files={files}
      customSetup={{}}
      key={`${Object.keys(files).join("-")}-${resolvedTheme}`}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      options={{
        bundlerURL: "https://bundler.frontend-challenges.com",
        classes: {
          "sp-code-editor": "!bg-[var(--color-bg)] h-full",
          "sp-wrapper": "!h-auto sm:!h-[calc(100vh_-_var(--nav-top-offset))]",
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
