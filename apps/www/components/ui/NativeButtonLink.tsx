"use client";

import React, { ComponentProps } from "react";
import { VariantProps } from "tailwind-variants";
import { composeRenderProps, Link, LinkProps } from "react-aria-components";

import { buttonVariants } from "./Button";

export interface NativeLinkButtonProps extends LinkProps, VariantProps<typeof buttonVariants> {}

export function NativeLinkButton(props: NativeLinkButtonProps) {
  return (
    <Link
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        buttonVariants({ ...renderProps, variant: props.variant, size: props.size, className }),
      )}
    />
  );
}
