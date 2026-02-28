"use client";

import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import {
  ToggleButton as AriaToggleButton,
  ToggleButtonProps as AriaToggleButtonProps,
  composeRenderProps,
  Group,
  GroupProps,
} from "react-aria-components";

import { cn, focusRing } from "~/utils/helpers";

export const toggleButtonVariants = tv({
  extend: focusRing,
  base: "inline-flex items-center justify-center rounded-[calc(var(--radius)-2px)] text-sm font-medium whitespace-nowrap transition-colors cursor-default outline-none [&_svg]:pointer-events-none [&>svg]:size-5 [&_svg]:shrink-0 hover:bg-accent hover:text-foreground selected:text-foreground selected:bg-accent selected:shadow-bg-pressed",
  variants: {
    variant: {
      default: "bg-transparent",
      outline: "bg-transparent",
      ghost: "bg-transparent",
    },
    size: {
      default: "h-6 px-3",
      sm: "h-5 px-2",
      lg: "h-10 px-3",
      icon: "size-7 px-0",
    },
    isDisabled: {
      true: "pointer-events-none opacity-50",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const ToggleButtonGroupContext = React.createContext<VariantProps<typeof toggleButtonVariants>>({
  size: "default",
  variant: "default",
});

export interface ToggleGroupProps extends Omit<GroupProps, "children"> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
}

const toggleGroupVariants = tv({
  base: "group/toggle-button-group h-8 bg-background shadow-bg inline-flex items-center justify-center gap-0.5 rounded p-1",
  variants: {
    variant: {
      default: "",
      outline: "border-border",
      ghost: "gap-2 p-0 shadow-none bg-transparent",
    },
    size: {
      default: "",
      sm: "h-7",
      lg: "",
      icon: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export function ToggleGroup({
  children,
  className,
  size = "default",
  variant = "default",
  ...props
}: ToggleGroupProps) {
  return (
    <Group
      data-slot="toggle-button-group"
      data-variant={variant}
      data-size={size}
      className={cn(toggleGroupVariants({ variant, size }), className)}
      {...props}
    >
      <ToggleButtonGroupContext.Provider value={{ variant, size }}>{children}</ToggleButtonGroupContext.Provider>
    </Group>
  );
}

export interface ToggleGroupItemProps extends AriaToggleButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

const toggleGroupItemVariants = tv({
  base: "min-w-0 shrink-0 rounded-[calc(var(--radius)-2px)] shadow-none focus:z-10 focus-visible:z-10",
  variants: {
    variant: {
      default: "",
      outline: "",
      ghost: "",
    },
  },
});

export function ToggleGroupItem({ className, size, variant, ...props }: ToggleGroupItemProps) {
  const context = React.useContext(ToggleButtonGroupContext);
  const finalVariant = context.variant || variant;
  const finalSize = context.size || size;

  return (
    <AriaToggleButton
      data-slot="toggle-button-group-item"
      data-variant={finalVariant}
      data-size={finalSize}
      {...props}
      className={composeRenderProps(className, (cls, renderProps) =>
        toggleButtonVariants({
          ...renderProps,
          variant: finalVariant as "default" | "outline" | "ghost",
          size: finalSize as "default" | "sm" | "lg" | "icon",
          className: cn(
            toggleGroupItemVariants({
              variant: finalVariant as "default" | "outline" | "ghost",
            }),
            cls,
          ),
        }),
      )}
    />
  );
}
