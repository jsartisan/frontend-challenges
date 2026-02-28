"use client"

import React, { ReactNode } from "react"
import {
  composeRenderProps,
  Radio as RACRadio,
  RadioGroup as RACRadioGroup,
  RadioGroupProps as RACRadioGroupProps,
  RadioProps,
  ValidationResult,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { cn } from "~/utils/helpers"
import {
  FieldDescription,
  FieldError,
  FieldLabel,
  fieldVariants,
} from "./field"

export interface RadioGroupProps extends Omit<RACRadioGroupProps, "children"> {
  label?: string
  children?: ReactNode
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

export function RadioGroup(props: RadioGroupProps) {
  const { orientation = "vertical", ...rest } = props

  return (
    <RACRadioGroup
      {...rest}
      className={cn(fieldVariants({ orientation }), props.className)}
    >
      <FieldLabel>{props.label}</FieldLabel>
      <div className="grid gap-3">{props.children}</div>
      {props.description && (
        <FieldDescription>{props.description}</FieldDescription>
      )}
      <FieldError>{props.errorMessage}</FieldError>
    </RACRadioGroup>
  )
}

const radioVariants = tv({
  base: "border-input text-primary aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none relative flex items-center justify-center",
  variants: {
    isFocusVisible: {
      true: "border-ring ring-ring/50 ring-[3px]",
    },
    isInvalid: {
      true: "border-destructive ring-destructive/20",
    },
    isDisabled: {
      true: "cursor-not-allowed opacity-50",
    },
  },
})

const radioIndicatorVariants = tv({
  base: "bg-primary size-2 rounded-full",
  variants: {
    isSelected: {
      true: "scale-100",
      false: "scale-0",
    },
  },
})

export function Radio(props: RadioProps) {
  return (
    <RACRadio
      {...props}
      className={composeRenderProps(props.className, (className) =>
        cn(
          "group relative flex items-center gap-2 text-sm transition",
          className
        )
      )}
    >
      {(renderProps) => (
        <>
          <div className={radioVariants(renderProps)}>
            <div className={radioIndicatorVariants(renderProps)} />
          </div>
          {props.children}
        </>
      )}
    </RACRadio>
  )
}

// Backward compatibility alias
export const RadioGroupItem = Radio
