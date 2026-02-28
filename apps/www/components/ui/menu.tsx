"use client"

import React from "react"
import { Check, ChevronRight } from "lucide-react"
import {
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuProps as AriaMenuProps,
  MenuSection as AriaMenuSection,
  MenuSectionProps as AriaMenuSectionProps,
  MenuTrigger as AriaMenuTrigger,
  Collection,
  composeRenderProps,
  Header,
  MenuItemProps,
  Separator,
  SeparatorProps,
} from "react-aria-components"

import { cn } from "~/utils/helpers"
import { dropdownItemStyles } from "./list-box"
import { Popover, PopoverProps } from "./popover"

interface MenuProps<T> extends AriaMenuProps<T> {
  placement?: PopoverProps["placement"]
}

export function MenuTrigger(
  props: React.ComponentProps<typeof AriaMenuTrigger>
) {
  return <AriaMenuTrigger {...props} data-slot="menu-trigger" />
}

export function Menu<T extends object>(props: MenuProps<T>) {
  return (
    <Popover
      placement={props.placement}
      className={cn("w-56", props.className)}
    >
      <AriaMenu
        {...props}
        className="max-h-[inherit] overflow-auto rounded-[inherit] p-1 outline-0"
      />
    </Popover>
  )
}

export function MenuItem(props: MenuItemProps) {
  const textValue =
    props.textValue ||
    (typeof props.children === "string" ? props.children : undefined)
  return (
    <AriaMenuItem
      textValue={textValue}
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        dropdownItemStyles({ ...renderProps, className })
      )}
    >
      {composeRenderProps(
        props.children,
        (children, { selectionMode, isSelected, hasSubmenu }) => (
          <>
            <span className="group-selected:font-semibold flex flex-1 items-center gap-2 truncate font-normal">
              {children}
            </span>
            {selectionMode !== "none" && isSelected && (
              <Check aria-hidden className="h-4 w-4" />
            )}
            {hasSubmenu && (
              <ChevronRight aria-hidden className="absolute right-2 h-4 w-4" />
            )}
          </>
        )
      )}
    </AriaMenuItem>
  )
}

export function MenuSeparator(props: SeparatorProps) {
  return <Separator {...props} className="bg-border -mx-1 my-1 h-px" />
}

export interface MenuSectionProps<T> extends AriaMenuSectionProps<T> {
  title?: string
  items?: Iterable<T>
}

export function MenuSection<T extends object>(props: MenuSectionProps<T>) {
  return (
    <AriaMenuSection {...props}>
      {props.title && (
        <Header className="sticky -top-[5px] z-10 -mx-1 -mt-px truncate px-4 py-1 text-sm font-medium backdrop-blur-md [&+*]:mt-1">
          {props.title}
        </Header>
      )}
      <Collection items={props.items}>{props.children}</Collection>
    </AriaMenuSection>
  )
}
