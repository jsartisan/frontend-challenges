"use client"

import React, { ReactNode } from "react"
import { Check, Minus } from "lucide-react"
import {
  CheckboxProps,
  composeRenderProps,
  Checkbox as RACCheckbox,
  CheckboxGroup as RACCheckboxGroup,
  CheckboxGroupProps as RACCheckboxGroupProps,
  ValidationResult,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { cn, focusRing } from "~/utils/helpers"
import { FieldDescription, FieldError, FieldLabel } from "./field"

export interface CheckboxGroupProps
  extends Omit<RACCheckboxGroupProps, "children"> {
  label?: string
  children?: ReactNode
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

export function CheckboxGroup(props: CheckboxGroupProps) {
  return (
    <RACCheckboxGroup
      {...props}
      className={composeRenderProps(props.className, (className) =>
        cn("flex flex-col gap-3", className)
      )}
    >
      <FieldLabel>{props.label}</FieldLabel>
      {props.children}
      {props.description && (
        <FieldDescription>{props.description}</FieldDescription>
      )}
      <FieldError>{props.errorMessage}</FieldError>
    </RACCheckboxGroup>
  )
}

const checkboxStyles = tv({
  base: "group flex items-center gap-3 text-sm transition leading-none font-medium",
  variants: {
    isDisabled: {
      false: "text-foreground",
      true: "cursor-not-allowed opacity-50",
    },
  },
})

const boxStyles = tv({
  extend: focusRing,
  base: "peer grid size-4 shrink-0 place-content-center rounded-[4px] border shadow-xs transition-shadow outline-none",
  variants: {
    isSelected: {
      false: "border-input bg-background dark:bg-input/30",
      true: "border-primary bg-primary text-primary-foreground dark:bg-primary",
    },
    isInvalid: {
      true: "border-destructive ring-destructive/20 ring-[3px] dark:ring-destructive/40",
    },
    isDisabled: {
      true: "cursor-not-allowed opacity-50",
    },
  },
})

const iconStyles = "size-3.5 text-current transition-none"

export function Checkbox(props: CheckboxProps) {
  return (
    <RACCheckbox
      {...props}
      data-slot="checkbox"
      className={composeRenderProps(props.className, (className, renderProps) =>
        checkboxStyles({ ...renderProps, className })
      )}
    >
      {({ isSelected, isIndeterminate, ...renderProps }) => (
        <>
          <div
            data-slot="checkbox-indicator"
            className={boxStyles({
              isSelected: isSelected || isIndeterminate,
              ...renderProps,
            })}
          >
            {isIndeterminate ? (
              <Minus aria-hidden className={iconStyles} />
            ) : isSelected ? (
              <Check aria-hidden className={iconStyles} />
            ) : null}
          </div>
          {props.children}
        </>
      )}
    </RACCheckbox>
  )
}
