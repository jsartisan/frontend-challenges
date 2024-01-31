"use client";

import React from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { Sandpack } from "../mdx";
import { SandpackCodeViewer, SandpackProvider } from "@codesandbox/sandpack-react";
import { useTheme } from "next-themes";

function MDXComponent(props: any) {
  const Comp = getMDXComponent(props.code);

  return (
    <Comp
      components={{
        Sandpack,
        h2: (props: any) => <h2 className="not-prose mb-3 mt-8 text-2xl font-bold" {...props} />,
        pre: ({ children }: any) => {
          const { children: code, meta } = children.props;
          const { resolvedTheme } = useTheme();

          const filename = meta?.split(" ")[0];

          return (
            <SandpackProvider
              className="not-prose"
              options={{
                classes: {
                  "sp-code-editor": "!border !border-[var(--color-border)] !rounded",
                },
              }}
              theme={resolvedTheme === "dark" ? "dark" : "light"}
              template="vanilla"
              files={{
                [filename]: {
                  code: code.trim(),
                  active: true,
                },
              }}
            >
              <SandpackCodeViewer />
            </SandpackProvider>
          );
        },
        p: (props: any) => <p className="not-prose mb-2 leading-snug" {...props} />,
        ul: (props: any) => <ul className="my-2" {...props} />,
        code: (props: any) => (
          <code
            className="not-prose rounded-[var(--radius)] bg-[var(--color-bg-negative-subtle)] px-1 py-0.5 text-[var(--color-fg-negative)]"
            {...props}
          />
        ),
      }}
    />
  );
}

export { MDXComponent };
