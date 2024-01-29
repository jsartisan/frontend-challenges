import { type ClassValue, clsx } from "clsx";
import { Children, isValidElement } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getValidChildren(children: React.ReactNode) {
  return Children.toArray(children).filter((child) => isValidElement(child)) as React.ReactElement[];
}

export function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export const IS_SERVER = typeof window === "undefined";
export const IS_CLIENT = !IS_SERVER;

export const pipe = (value: any, ...fns: ((any) => any)[]) => fns.reduce((acc, fn) => fn(acc), value);
