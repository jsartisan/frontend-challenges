"use client";

import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { composeRenderProps, Group, GroupProps } from "react-aria-components";

import { cn } from "~/utils/helpers";

import { Input } from "./Input";
import { Button } from "./Button";
import { Textarea } from "./TextArea";

export function inputGroupStyles(props: React.ComponentProps<"div">) {
  return cn(
    "group/input-group border-input dark:bg-input/30 relative flex w-full items-center rounded-md border shadow-xs transition-[color,box-shadow] outline-none",
    "h-9 min-w-0 has-[>textarea]:h-auto",

    // Variants based on alignment.
    "has-[>[data-align=inline-start]]:[&>input]:pl-2",
    "has-[>[data-align=inline-end]]:[&>input]:pr-2",
    "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3",
    "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3",

    // Focus state.
    "has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot=input-group-control]:focus-visible]:ring-[3px]",
    // Focus within state ( needed for date picker inside input group )
    "has-[[data-slot=input-group-control]:focus-within]:border-ring has-[[data-slot=input-group-control]:focus-within]:ring-ring/50 has-[[data-slot=input-group-control]:focus-within]:ring-[3px]",

    // Error state.
    "has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40",

    props.className,
  );
}

function InputGroup({ className, ...props }: GroupProps) {
  return (
    <Group
      data-slot="input-group"
      className={composeRenderProps(className, (className, renderProps) =>
        inputGroupStyles({ ...renderProps, className }),
      )}
      {...props}
    />
  );
}

const inputGroupAddonVariants = tv({
  base: "text-muted-foreground flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
  variants: {
    align: {
      "inline-start": "order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
      "inline-end": "order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]",
      "block-start":
        "order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-2.5 [.border-b]:pb-3",
      "block-end": "order-last w-full justify-start px-3 pb-3 group-has-[>input]/input-group:pb-2.5 [.border-t]:pt-3",
    },
  },
  defaultVariants: {
    align: "inline-start",
  },
});

function InputGroupAddon({
  align = "inline-start",
  className,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={inputGroupAddonVariants({ align, className })}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return;
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus();
      }}
      {...props}
    />
  );
}

const inputGroupButtonVariants = tv({
  base: "flex items-center gap-2 text-sm shadow-none",
  variants: {
    size: {
      xs: "h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-2 has-[>svg]:px-2 [&>svg:not([class*='size-'])]:size-3.5",
      sm: "h-8 gap-1.5 rounded-md px-2.5 has-[>svg]:px-2.5",
      "icon-xs": "size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0",
      "icon-sm": "size-8 p-0 has-[>svg]:p-0",
    },
  },
  defaultVariants: {
    size: "xs",
  },
});

function InputGroupButton({
  className,
  size = "xs",
  type = "button",
  variant = "default",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size"> & VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={inputGroupButtonVariants({ size, className })}
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "text-muted-foreground flex items-center gap-2 text-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
        className,
      )}
      {...props}
    />
  );
}

export const inputGroupInputStyles = tv({
  base: "flex-1 rounded-none border-0 bg-transparent shadow-none focus:ring-0 focus-visible:ring-0 dark:bg-transparent",
  variants: {
    isFocusVisible: {
      true: "border-0 ring-0",
    },
    isFocusWithin: {
      true: "border-0 ring-0",
    },
  },
});

function InputGroupInput({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={composeRenderProps(className, (className, renderProps) =>
        inputGroupInputStyles({ ...renderProps, className }),
      )}
      {...props}
    />
  );
}

function InputGroupTextarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent",
        "focus:ring-0 focus-visible:ring-0",
        className,
      )}
      {...props}
    />
  );
}

export { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupInput, InputGroupTextarea };
