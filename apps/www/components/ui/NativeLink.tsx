"use client";

import type { ComponentProps } from "react";

import { type VariantProps } from "tailwind-variants";

import { styles } from "./Link";

interface NativeLinkProps extends ComponentProps<"a">, VariantProps<typeof styles> {}

export function NativeLink(props: NativeLinkProps) {
  return <a {...props} className={styles({ className: props.className, variant: props.variant })} />;
}
