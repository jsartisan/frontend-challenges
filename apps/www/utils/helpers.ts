import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { Children, isValidElement } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getValidChildren(children: React.ReactNode) {
  return Children.toArray(children).filter((child) => isValidElement(child)) as React.ReactElement[];
}

export const focusRing = tv({
  base: "outline-none",
  variants: {
    isFocusVisible: {
      false: "outline-0",
      true: "ring-ring/50 ring-[3px] border-ring",
    },
  },
});
