"use client";

import { tv, VariantProps } from "tailwind-variants";
import { Button as AriaButton, composeRenderProps, ButtonProps as RACButtonProps } from "react-aria-components";

import { focusRing } from "~/utils/helpers";

import { Spinner } from "./Spinner";

export interface ButtonProps extends RACButtonProps {
  /** @default 'default' */
  variant?: VariantProps<typeof buttonVariants>["variant"];
  /** @default 'default' */
  size?: VariantProps<typeof buttonVariants>["size"];
}

export const buttonVariants = tv({
  extend: focusRing,
  base: 'relative inline-flex shrink-0 cursor-default items-center justify-center gap-2 overflow-hidden rounded-lg border border-transparent text-sm font-medium whitespace-nowrap transition-all outline-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
      destructive: "bg-destructive hover:bg-destructive/90 dark:bg-destructive/60 text-white",
      outline:
        "border-border bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 shadow-xs",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      default: "h-9 px-4 py-2 has-[>svg]:px-3",
      xs: "h-7 gap-1.5 rounded-md px-2 has-[>svg]:px-2.5",
      sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
      lg: "h-10 rounded-lg px-6 has-[>svg]:px-4",
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
    variant: "default",
    size: "default",
  },
});

export function Button(props: ButtonProps) {
  const { isPending } = props;

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
        <>
          {isPending && (
            <span className="absolute inset-0 flex items-center justify-center bg-inherit">
              <Spinner className="text-primary-foreground" />
            </span>
          )}
          {children}
        </>
      ))}
    </AriaButton>
  );
}
