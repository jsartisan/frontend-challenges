"use client"

import React from "react"
import {
  Switch as AriaSwitch,
  SwitchProps as AriaSwitchProps,
  composeRenderProps,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { cn } from "~/utils/helpers"

export interface SwitchProps extends Omit<AriaSwitchProps, "children"> {
  children?: React.ReactNode
}

const track = tv({
  base: "inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none",
  variants: {
    isSelected: {
      false: "bg-input dark:bg-input/80",
      true: "bg-primary",
    },
    isFocusVisible: {
      true: "border-ring ring-ring/50 ring-[3px]",
    },
    isDisabled: {
      true: "cursor-not-allowed opacity-50",
      false: "cursor-default",
    },
  },
})

const handle = tv({
  base: "pointer-events-none block size-4 rounded-full ring-0 transition-transform",
  variants: {
    isSelected: {
      false: "translate-x-0 bg-background dark:bg-foreground",
      true: "translate-x-[calc(100%-2px)] bg-background dark:bg-primary-foreground",
    },
  },
})

export function Switch({ children, ...props }: SwitchProps) {
  return (
    <AriaSwitch
      {...props}
      className={composeRenderProps(props.className, (className) =>
        cn(
          "group relative flex items-center gap-2 text-sm transition disabled:cursor-not-allowed",
          className
        )
      )}
    >
      {(renderProps) => (
        <>
          <div className={track(renderProps)}>
            <span className={handle(renderProps)} />
          </div>
          {children}
        </>
      )}
    </AriaSwitch>
  )
}
