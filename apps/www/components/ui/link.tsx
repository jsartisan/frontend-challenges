"use client";

import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { Link as AriaLink, LinkProps as AriaLinkProps, composeRenderProps } from "react-aria-components";

import { focusRing } from "~/utils/helpers";

interface LinkProps extends AriaLinkProps, VariantProps<typeof styles> {}

export const styles = tv({
  extend: focusRing,
  base: "rounded-xs text-sm font-medium underline transition disabled:cursor-default disabled:no-underline forced-colors:disabled:text-[GrayText]",
  variants: {
    variant: {
      default:
        "text-blue-600 underline decoration-blue-600/60 hover:decoration-blue-600 dark:text-blue-500 dark:decoration-blue-500/60 dark:hover:decoration-blue-500",
      vanilla: "text-foreground",
      subtle: "text-muted-foreground hover:text-accent-foreground no-underline outline-none",
      transparent: "no-underline outline-none hover:opacity-80",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  return (
    <AriaLink
      {...props}
      ref={ref}
      className={composeRenderProps(props.className, (className, renderProps) =>
        styles({ ...renderProps, className, variant: props.variant }),
      )}
    />
  );
});

Link.displayName = "Link";
