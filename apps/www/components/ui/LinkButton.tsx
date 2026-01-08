"use client";

import { VariantProps } from "tailwind-variants";
import { composeRenderProps, Link as RACLink, LinkProps as RACLinkProps } from "react-aria-components";

import { buttonVariants } from "./Button";

export interface LinkButtonProps extends RACLinkProps, VariantProps<typeof buttonVariants> {
  useNativeAnchor?: boolean;
}

export function LinkButton(props: LinkButtonProps) {
  const { children } = props;

  return (
    <RACLink
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        buttonVariants({ ...renderProps, variant: props.variant, size: props.size, className }),
      )}
    >
      {composeRenderProps(children, (children) => (
        <>{children}</>
      ))}
    </RACLink>
  );
}
