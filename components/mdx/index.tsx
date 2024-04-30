import { Sandpack } from "./Sandpack";
import { SandpackCodeViewer, SandpackProvider } from "@codesandbox/sandpack-react";
import { useTheme } from "next-themes";

export const components = {
  Sandpack,
  pre: ({ children }: any) => {
    const { children: code, meta } = children.props;
    const { resolvedTheme } = useTheme();

    const filename = meta?.split(" ")[0];

    return (
      <SandpackProvider
        className="not-prose"
        options={{
          classes: {
            "sp-code-editor": "!border !border-[var(--color-border)] !bg-[var(--color-bg-neutral)] !rounded",
            "sp-editor-viewer": "!bg-[var(--color-bg-neutral)] !rounded",
          },
        }}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        template="vanilla"
        files={{
          [filename]: {
            code: code ? code.trim() : "",
            active: true,
          },
        }}
      >
        <SandpackCodeViewer />
      </SandpackProvider>
    );
  },
  h2: (props: any) => <h2 className="mb-3 mt-6 text-2xl font-bold" {...props} />,
  h3: (props: any) => <h3 className="text-base font-semibold" {...props} />,
  p: (props: any) => <p className="leading-snug" {...props} />,
  ul: (props: any) => <ul className="" {...props} />,
  li: (props: any) => <li className="ml-4 list-disc" {...props} />,
  code: (props: any) => (
    <code
      className="rounded bg-[var(--color-bg-neutral-subtle)] px-1 py-0.5 text-[var(--color-fg-neutral)]"
      {...props}
    />
  ),
};
