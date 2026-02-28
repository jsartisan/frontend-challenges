"use client"

import * as React from "react"
import {
  DialogTrigger,
  composeRenderProps,
} from "react-aria-components"

import { cn } from "~/utils/helpers"
import { Popover, PopoverProps } from "./popover"

// HoverCard is implemented using Popover with hover trigger behavior
// React Aria doesn't have a native HoverCard, so we use Popover
export function HoverCard(props: React.ComponentProps<typeof DialogTrigger>) {
  return <DialogTrigger {...props} />
}

export function HoverCardTrigger({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  children,
  ...props
}: PopoverProps & {
  align?: "start" | "center" | "end"
  sideOffset?: number
}) {
  return (
    <Popover
      offset={sideOffset}
      className={cn(
        "w-64 p-4",
        className
      )}
      {...props}
    >
      {children}
    </Popover>
  )
}
