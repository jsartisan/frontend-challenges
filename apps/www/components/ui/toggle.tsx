"use client"

import React from "react"
import {
  ToggleButton as AriaToggleButton,
  ToggleButtonProps as AriaToggleButtonProps,
  composeRenderProps,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { focusRing } from "~/utils/helpers"

export interface ToggleButtonProps extends AriaToggleButtonProps {
  /** @default 'default' */
  variant?: "default" | "ghost" | "outline"
  /** @default 'default' */
  size?: "default" | "sm" | "lg" | "icon"
}

export const toggleVariants = tv({
  extend: focusRing,
  base: "inline-flex items-center justify-center gap-2 rounded-[calc(var(--radius)-2px)] text-sm font-medium whitespace-nowrap transition-colors cursor-default outline-none border border-transparent [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-foreground",
  variants: {
    variant: {
      default:
        "bg-transparent selected:bg-accent selected:text-foreground selected:shadow-bg-pressed",
      ghost:
        "bg-transparent selected:bg-accent selected:text-foreground selected:shadow-bg-pressed",
      outline:
        "border-input bg-transparent shadow-xs selected:bg-accent selected:text-foreground selected:shadow-bg-pressed",
    },
    size: {
      default: "bs-6 px-3",
      sm: "bs-5 px-2 data-[variant=ghost]:bs-7",
      lg: "bs-10 px-3",
      icon: "size-7 px-0 data-[variant=outline]:size-[calc(1.75rem-3px)]",
    },
    isDisabled: {
      true: "pointer-events-none opacity-50",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export function Toggle(props: ToggleButtonProps) {
  return (
    <AriaToggleButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        toggleVariants({
          ...renderProps,
          variant: props.variant,
          size: props.size,
          className,
        })
      )}
    />
  )
}
