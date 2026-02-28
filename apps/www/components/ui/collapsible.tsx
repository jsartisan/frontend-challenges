"use client"

import React from "react"
import {
  Disclosure as AriaDisclosure,
  DisclosurePanel as AriaDisclosurePanel,
  DisclosureProps,
  DisclosurePanelProps,
  Button,
} from "react-aria-components"

import { cn } from "~/utils/helpers"

export function Collapsible(props: DisclosureProps) {
  return <AriaDisclosure {...props} />
}

export function CollapsibleTrigger({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <Button slot="trigger" className={cn("outline-none", className)}>
      {children}
    </Button>
  )
}

export function CollapsibleContent({
  children,
  className,
  ...props
}: DisclosurePanelProps) {
  return (
    <AriaDisclosurePanel
      {...props}
      className={cn(
        "h-(--disclosure-panel-height) overflow-hidden motion-safe:transition-[height]",
        className
      )}
    >
      {children}
    </AriaDisclosurePanel>
  )
}
