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
      <div className="max-w-[80ch]">
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
      </div>
    );
  },
  h2: (props: any) => <h2 className="not-prose mb-3 mt-8 text-2xl font-bold" {...props} />,
  p: (props: any) => <p className="not-prose mb-2 leading-snug" {...props} />,
  ul: (props: any) => <ul className="my-2" {...props} />,
  code: (props: any) => (
    <code
      className="not-prose rounded-[var(--radius)] bg-[var(--color-bg-neutral-subtle)] px-1 py-0.5 text-[var(--color-fg-neutral)]"
      {...props}
    />
  ),
};
