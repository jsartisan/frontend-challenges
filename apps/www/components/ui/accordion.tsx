"use client"

import React, { useContext } from "react"
import { ChevronDown } from "lucide-react"
import {
  Disclosure as AriaDisclosure,
  DisclosureGroup as AriaDisclosureGroup,
  DisclosureGroupProps as AriaDisclosureGroupProps,
  DisclosurePanel as AriaDisclosurePanel,
  DisclosurePanelProps as AriaDisclosurePanelProps,
  DisclosureProps as AriaDisclosureProps,
  Button,
  composeRenderProps,
  DisclosureGroupStateContext,
  DisclosureStateContext,
  Heading,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { cn } from "~/utils/helpers"

const disclosure = tv({
  base: "group",
  variants: {
    isInGroup: {
      true: "border-b last:border-b-0",
    },
  },
})

const disclosureButton = tv({
  base: "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50",
  variants: {
    isDisabled: {
      true: "pointer-events-none opacity-50",
    },
  },
})

const chevron = tv({
  base: "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200",
  variants: {
    isExpanded: {
      true: "rotate-180",
    },
  },
})

export interface AccordionProps extends AriaDisclosureGroupProps {
  children: React.ReactNode
}

export function Accordion({ children, ...props }: AccordionProps) {
  return (
    <AriaDisclosureGroup {...props} data-slot="accordion">
      {children}
    </AriaDisclosureGroup>
  )
}

export interface AccordionItemProps extends AriaDisclosureProps {
  children: React.ReactNode
}

export function AccordionItem({ children, ...props }: AccordionItemProps) {
  const isInGroup = useContext(DisclosureGroupStateContext) !== null
  return (
    <AriaDisclosure
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        disclosure({ ...renderProps, isInGroup, className })
      )}
    >
      {children}
    </AriaDisclosure>
  )
}

export interface AccordionTriggerProps {
  children: React.ReactNode
  className?: string
}

export function AccordionTrigger({ children, className }: AccordionTriggerProps) {
  const { isExpanded } = useContext(DisclosureStateContext)!
  return (
    <Heading className="flex">
      <Button
        slot="trigger"
        className={(renderProps) => cn(disclosureButton({ ...renderProps }), className)}
      >
        {children}
        <ChevronDown aria-hidden className={chevron({ isExpanded })} />
      </Button>
    </Heading>
  )
}

export interface AccordionContentProps extends AriaDisclosurePanelProps {
  children: React.ReactNode
}

export function AccordionContent({ children, ...props }: AccordionContentProps) {
  return (
    <AriaDisclosurePanel
      {...props}
      className={
        "h-(--disclosure-panel-height) overflow-hidden text-sm motion-safe:transition-[height]"
      }
    >
      <div className={cn("pt-0 pb-4", props.className)}>{children}</div>
    </AriaDisclosurePanel>
  )
}
