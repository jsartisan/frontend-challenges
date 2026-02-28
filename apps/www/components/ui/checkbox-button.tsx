"use client";

import React from "react";
import { useToggleState } from "@react-stately/toggle";
import { mergeProps, useFocusRing, VisuallyHidden, useCheckbox, AriaCheckboxProps } from "react-aria";

import { Icon } from "./icon";
import { cn } from "../../utils/helpers";

export function CheckboxButton(props: AriaCheckboxProps) {
  const state = useToggleState(props);
  const ref = React.useRef(null);
  const { inputProps } = useCheckbox(props, state, ref);
  const { focusProps } = useFocusRing();
  const isSelected = state.isSelected && !props.isIndeterminate;

  return (
    <label
      className={cn({
        "focus-visible:ring-ring hover:bg-accent focus-visible:outline-hidden active:bg-accent inline-flex h-8 items-center justify-center gap-2 whitespace-nowrap rounded border border-transparent px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&>svg]:h-5 [&>svg]:w-5 [&_img]:h-5 [&_img]:w-5":
          true,
        "border-(--color-bd-positive)": isSelected,
        "border-border": !isSelected,
      })}
    >
      <VisuallyHidden>
        <input {...mergeProps(inputProps, focusProps)} ref={ref} />
      </VisuallyHidden>
      {!isSelected && <div className="bg-muted size-5 rounded-full"></div>}
      {isSelected && (
        <Icon
          name="check"
          className={cn({
            "bg-(--color-bg-positive) text-background rounded-full": isSelected,
            "opacity-0": !isSelected,
          })}
        />
      )}
      {props.children}
    </label>
  );
}
