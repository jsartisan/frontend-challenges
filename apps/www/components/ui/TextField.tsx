"use client";

import React from "react";
import { VariantProps } from "tailwind-variants";
import {
  TextField as AriaTextField,
  TextFieldProps as AriaTextFieldProps,
  composeRenderProps,
  ValidationResult,
} from "react-aria-components";

import { cn } from "~/utils/helpers";
import { Input, type InputProps } from "./Input";
import { FieldDescription, FieldError, FieldLabel, fieldVariants } from "./Field";

export interface TextFieldProps extends AriaTextFieldProps, VariantProps<typeof fieldVariants> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  size?: InputProps["size"];
}

export function TextField({
  description,
  errorMessage,
  label,
  orientation = "vertical",
  placeholder,
  size = "default",
  ...props
}: TextFieldProps) {
  return (
    <AriaTextField
      {...props}
      className={composeRenderProps(props.className, (className) => cn(fieldVariants({ orientation }), className))}
    >
      <FieldLabel>{label}</FieldLabel>
      <Input placeholder={placeholder} size={size} />
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  );
}
