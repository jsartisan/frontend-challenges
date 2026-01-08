"use client";

import React from "react";
import { Check } from "lucide-react";
import { tv } from "tailwind-variants";
import {
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  ListBoxProps as AriaListBoxProps,
  Collection,
  composeRenderProps,
  Header,
  ListBoxItemProps,
  ListBoxSection,
  SectionProps,
} from "react-aria-components";

import { cn, focusRing } from "~/utils/helpers";

type ListBoxProps<T> = Omit<AriaListBoxProps<T>, "layout" | "orientation">;

export function ListBox<T extends object>({ children, ...props }: ListBoxProps<T>) {
  return (
    <AriaListBox
      {...props}
      className={composeRenderProps(props.className, (className) =>
        cn("rounded-lg border border-gray-300 p-1 outline-0 dark:border-zinc-600", className),
      )}
    >
      {children}
    </AriaListBox>
  );
}

export const itemStyles = tv({
  extend: focusRing,
  base: "group relative flex cursor-default items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors outline-none select-none",
  variants: {
    isSelected: {
      false: "hover:bg-accent hover:text-accent-foreground",
      true: "bg-accent text-accent-foreground",
    },
    isDisabled: {
      true: "pointer-events-none opacity-50",
    },
    isFocusVisible: {
      true: "ring-ring ring-2 ring-offset-1",
    },
  },
});

export function ListBoxItem(props: ListBoxItemProps) {
  const textValue = props.textValue || (typeof props.children === "string" ? props.children : undefined);
  return (
    <AriaListBoxItem {...props} textValue={textValue} className={itemStyles}>
      {composeRenderProps(props.children, (children) => (
        <>
          {children}
          <div className="absolute right-4 bottom-0 left-4 hidden h-px bg-white/20 forced-colors:bg-[HighlightText] [.group[data-selected]:has(+[data-selected])_&]:block" />
        </>
      ))}
    </AriaListBoxItem>
  );
}

export const dropdownItemStyles = tv({
  base: "group [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  variants: {
    variant: {
      default: "",
      destructive:
        "data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive",
    },
    isFocused: {
      true: "bg-accent text-accent-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function DropdownItem(props: ListBoxItemProps) {
  const textValue = props.textValue || (typeof props.children === "string" ? props.children : undefined);
  return (
    <AriaListBoxItem {...props} textValue={textValue} className={dropdownItemStyles}>
      {composeRenderProps(props.children, (children, { isSelected }) => (
        <>
          <span className="group-selected:font-semibold flex flex-1 items-center gap-2 truncate font-normal">
            {children}
          </span>
          <span className="flex w-5 items-center">{isSelected && <Check className="h-4 w-4" />}</span>
        </>
      ))}
    </AriaListBoxItem>
  );
}

export interface DropdownSectionProps<T> extends SectionProps<T> {
  title?: string;
  items?: Iterable<T>;
}

export function DropdownSection<T extends object>(props: DropdownSectionProps<T>) {
  return (
    <ListBoxSection className="group/section after:block after:h-[5px] after:content-[''] first:-mt-[5px]">
      <Header className="sticky -top-[5px] z-10 -mx-1 -mt-px truncate px-4 py-1 text-sm font-medium backdrop-blur-md group-first/section:mt-1 [&+*]:mt-1">
        {props.title}
      </Header>
      <Collection items={props.items}>{props.children}</Collection>
    </ListBoxSection>
  );
}
