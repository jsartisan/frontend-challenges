import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { Children, isValidElement } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getValidChildren(children: React.ReactNode) {
  return Children.toArray(children).filter((child) => isValidElement(child)) as React.ReactElement[];
}
