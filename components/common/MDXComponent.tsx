"use client";

import React from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { components } from "../mdx";

function MDXComponent(props: any) {
  const Comp = getMDXComponent(props.code);

  return (
    <div className="flex flex-col gap-2">
      <Comp components={components} />
    </div>
  );
}

export { MDXComponent };
