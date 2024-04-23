"use client";

import { cn } from "@/utils/helpers";
import { useTheme } from "next-themes";
import { SandpackProvider } from "@codesandbox/sandpack-react";

type Props = {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  files?: any;
  className?: string;
  main?: string;
};

export default function SandpackRoot(props: Props) {
  const { resolvedTheme } = useTheme();
  const { children, className, files } = props;

  return (
    <SandpackProvider
      files={files}
      customSetup={{}}
      key={Object.keys(files).join("-")}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      options={{
        classes: {
          "sp-code-editor": "!bg-background h-full",
          "sp-wrapper": "!h-auto sm:!h-[calc(100vh_-_var(--nav-top-offset))]",
          "sp-layout": cn("!bg-inherit !border-none h-full", className),
          "sp-navigator": "!h-10 !border-b-[var(--color-border)]",
          "sp-input": "!h-6 !rounded",
        },
      }}
    >
      {children}
    </SandpackProvider>
  );
}
