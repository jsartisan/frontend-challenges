"use client";

import React from "react";
import { tv } from "tailwind-variants";
import { Button as AriaButton, composeRenderProps, ButtonProps as RACButtonProps } from "react-aria-components";

import { focusRing } from "~/utils/helpers";

export interface ButtonProps extends RACButtonProps {
  /** @default 'primary' */
  variant?: "primary" | "secondary" | "tertiary" | "ghost" | "destructive" | "link" | "discord" | "github";
  /** @default 'default' */
  size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";
}

export const buttonVariants = tv({
  extend: focusRing,
  base: [
    "relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded text-sm font-medium cursor-default outline-none",
    "[&>svg]:size-[1.3em] [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0",
  ],
  variants: {
    variant: {
      primary:
        "shadow-bg-accent bg-primary text-primary-foreground hover:bg-primary/90 pressed:bg-primary/80 pressed:shadow-bg-accent-pressed",
      secondary:
        "shadow-bg pressed:shadow-bg-pressed bg-background text-foreground hover:bg-accent/50 pressed:bg-accent data-[open]:shadow-bg-pressed data-[open]:bg-accent",
      tertiary:
        "hover:bg-accent/80 pressed:bg-accent pressed:shadow-bg-pressed data-[open]:shadow-bg-pressed data-[open]:bg-accent",
      ghost:
        "hover:bg-accent/80 pressed:bg-accent pressed:shadow-bg-pressed data-[open]:shadow-bg-pressed data-[open]:bg-accent",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      link: "text-primary underline-offset-4 hover:underline",
      discord: "bg-social-discord text-white hover:bg-discord/90",
      github: "bg-black text-white hover:bg-black/90",
    },
    size: {
      default: "h-8 px-3 py-2 [&_img]:size-5 gap-2",
      sm: "h-7 rounded-md px-2 text-xs [&_svg]:size-4 gap-1",
      xs: "h-6 rounded-md px-2 text-xs gap-1",
      lg: "h-9 px-3 gap-2",
      icon: "size-9",
      "icon-xs": "size-6",
      "icon-sm": "size-8",
      "icon-lg": "size-10",
    },
    isDisabled: {
      true: "pointer-events-none opacity-50",
    },
    isPending: {
      true: "text-transparent",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

export function Button(props: ButtonProps) {
  return (
    <AriaButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        buttonVariants({
          ...renderProps,
          variant: props.variant,
          size: props.size,
          className,
        }),
      )}
    >
      {composeRenderProps(props.children, (children) => (
        <>{children}</>
      ))}
    </AriaButton>
  );
}
