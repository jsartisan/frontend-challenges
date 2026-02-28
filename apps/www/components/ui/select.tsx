"use client"

import React from "react"
import { ChevronDown } from "lucide-react"
import {
  Select as AriaSelect,
  SelectProps as AriaSelectProps,
  composeRenderProps,
  SelectValue,
  ValidationResult,
  ListBoxItemProps,
} from "react-aria-components"

import { cn } from "~/utils/helpers"
import { Button, ButtonProps } from "./button"
import { FieldDescription, FieldError, FieldLabel } from "./field"
import {
  DropdownItem,
  DropdownSection,
  DropdownSectionProps,
  ListBox,
} from "./list-box"
import { Popover } from "./popover"

export interface SelectProps<T extends object>
  extends Omit<AriaSelectProps<T>, "children"> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  items?: Iterable<T>
  children: React.ReactNode | ((item: T) => React.ReactNode)
  size?: ButtonProps["size"]
  variant?: ButtonProps["variant"]
}

export function Select<T extends object>({
  label,
  description,
  errorMessage,
  children,
  items,
  size = "default",
  variant = "secondary",
  ...props
}: SelectProps<T>) {
  return (
    <AriaSelect<T>
      {...props}
      className={composeRenderProps(props.className, (className) =>
        cn("group relative flex flex-col gap-1", className)
      )}
    >
      {label && <FieldLabel>{label}</FieldLabel>}
      <Button
        size={size}
        variant={variant}
        data-slot="select-trigger"
        className="text-start"
      >
        <SelectValue
          data-slot="select-value"
          className="placeholder-shown:text-muted-foreground flex-1 text-sm"
        >
          {({ selectedText, defaultChildren }) =>
            selectedText || defaultChildren
          }
        </SelectValue>
        <ChevronDown aria-hidden />
      </Button>
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldError>{errorMessage}</FieldError>
      <Popover className="w-56 min-w-(--trigger-width)">
        <ListBox
          items={items}
          className="max-h-[inherit] overflow-auto border-none p-1 outline-hidden [clip-path:inset(0_0_0_0_round_.75rem)]"
        >
          {children}
        </ListBox>
      </Popover>
    </AriaSelect>
  )
}

export function SelectItem(props: ListBoxItemProps) {
  return <DropdownItem {...props} />
}

export function SelectSection<T extends object>(
  props: DropdownSectionProps<T>
) {
  return <DropdownSection {...props} />
}
