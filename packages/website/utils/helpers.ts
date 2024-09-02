import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { Children, isValidElement } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getValidChildren(children: React.ReactNode) {
  return Children.toArray(children).filter((child) => isValidElement(child)) as React.ReactElement[];
}

export const setLanguage = function (activeFile) {
  switch (activeFile.split(".").pop()) {
    case "js":
      return "javascript";
    case "jsx":
      return "javascript";
    case "ts":
      return "typescript";
    case "tsx":
      return "typescript";
    case "css":
      return "css";
    case "html":
      return "html";
    case "json":
      return "json";
    case "md":
      return "markdown";
    case "svelte":
      return "html";
    default:
      return "plaintext";
  }
};
