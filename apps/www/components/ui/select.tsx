"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import {
  Select as AriaSelect,
  SelectProps as AriaSelectProps,
  composeRenderProps,
  SelectValue,
  ValidationResult,
  type ListBoxItemProps,
} from "react-aria-components";

import { cn } from "~/utils/helpers";
import { Popover } from "./Popover";
import { Button, ButtonProps } from "./Button";
import { FieldDescription, FieldError, FieldLabel } from "./Field";
import { DropdownItem, DropdownSection, DropdownSectionProps, ListBox } from "./ListBox";

export interface SelectProps<T extends object> extends Omit<AriaSelectProps<T>, "children"> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
  size?: ButtonProps["size"];
  enableSearch?: boolean;
  filterBehavior?: "contains" | "startsWith";
  variant?: ButtonProps["variant"];
}

export function SelectRoot<T extends object>(props: AriaSelectProps<T>) {
  return (
    <AriaSelect<T>
      {...props}
      className={composeRenderProps(props.className, (className) =>
        cn("group relative flex flex-col gap-1", className),
      )}
    >
      {props.children}
    </AriaSelect>
  );
}

export function Select<T extends object>({
  children,
  description,
  errorMessage,
  items,
  label,
  size = "default",
  variant = "outline",
  ...props
}: SelectProps<T>) {
  return (
    <SelectRoot {...props}>
      {label && <FieldLabel>{label}</FieldLabel>}
      <Button size={size} variant={variant} data-slot="select-trigger" className="text-start">
        <SelectValue data-slot="select-value" className="placeholder-shown:text-muted-foreground flex-1 text-sm">
          {({ defaultChildren, selectedText }) => selectedText || defaultChildren}
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
    </SelectRoot>
  );
}

export function SelectItem(props: ListBoxItemProps) {
  return <DropdownItem {...props} />;
}

export function SelectSection<T extends object>(props: DropdownSectionProps<T>) {
  return <DropdownSection {...props} />;
}
