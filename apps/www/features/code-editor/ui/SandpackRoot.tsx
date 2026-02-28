import { useTheme } from "next-themes";
import { SandpackProvider } from "@codesandbox/sandpack-react";

import { cn } from "~/utils/helpers";
import { CodeFile, SupportedTemplates } from "~/entities/challenge/model/types";
import { SandpackLocalProvider } from "~/features/code-editor/context/SandpackLocalProvider";

type Props = {
  path?: string;
  template?: SupportedTemplates;
  children: React.ReactNode;
  files?: Record<string, CodeFile>;
  className?: string;
  originalFiles?: Record<string, CodeFile>;
};

export function SandpackRoot(props: Props) {
  const { children, className, files = {}, originalFiles = {}, path, template = "react" } = props;
  const { resolvedTheme } = useTheme();
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
          "sp-code-editor": "bg-background! h-full",
          "sp-wrapper": cn("h-auto! sm:h-[calc(100vh-var(--nav-top-offset))]! text-[length:inherit]!", className),
          "sp-layout": "bg-inherit! border-none! h-full",
          "sp-navigator": "h-10! border-b-border!",
          "sp-input": "h-6! rounded!",
        },
      }}
    >
      <SandpackLocalProvider originalFiles={originalFiles} path={path ?? ""} template={template}>
        {children}
      </SandpackLocalProvider>
    </SandpackProvider>
  );
}
