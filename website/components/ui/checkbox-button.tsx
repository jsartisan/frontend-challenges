"use client";

import React from "react";
import { mergeProps, useFocusRing, VisuallyHidden, useCheckbox, AriaCheckboxProps } from "react-aria";
import { useToggleState } from "@react-stately/toggle";
import { Icon } from "./icon";
import { cn } from "@/website/utils/helpers";

export function CheckboxButton(props: AriaCheckboxProps) {
  const state = useToggleState(props);
  const ref = React.useRef(null);
  const { inputProps } = useCheckbox(props, state, ref);
  const { focusProps } = useFocusRing();
  const isSelected = state.isSelected && !props.isIndeterminate;

  return (
    <label
      className={cn({
        "focus-visible:ring-ring inline-flex h-8 items-center justify-center gap-2 whitespace-nowrap rounded border border-transparent px-3 py-2 text-sm font-medium transition-colors hover:bg-[var(--color-bg-hover)] focus-visible:outline-none focus-visible:ring-1 active:bg-[var(--color-bg-active)] disabled:pointer-events-none disabled:opacity-50 [&>svg]:h-5 [&>svg]:w-5 [&_img]:h-5 [&_img]:w-5":
          true,
        "border-[var(--color-bd-positive)]": isSelected,
        "border-[var(--color-bd)]": !isSelected,
      })}
    >
      <VisuallyHidden>
        <input {...mergeProps(inputProps, focusProps)} ref={ref} />
      </VisuallyHidden>
      {!isSelected && <div className="size-5 rounded-full bg-[var(--color-bg-neutral)]"></div>}
      {isSelected && (
        <Icon
          name="check"
          className={cn({
            "rounded-full bg-[var(--color-bg-positive)] text-[var(--color-fg-invert)]": isSelected,
            "opacity-0": !isSelected,
          })}
        />
      )}
      {props.children}
    </label>
  );
}
