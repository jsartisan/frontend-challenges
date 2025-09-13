import React from "react";
import { getMDXComponent } from "mdx-bundler/client";

import { cn } from "~/utils/helpers";

import { components } from "./components";

type MDXComponentProps = {
  code: string;
  className?: string;
};

function MDXComponent(props: MDXComponentProps) {
  const Comp = getMDXComponent(props.code);

  return (
    <div className={cn("flex flex-col gap-2", props.className)}>
      <Comp components={components} />
    </div>
  );
}

export { MDXComponent };
