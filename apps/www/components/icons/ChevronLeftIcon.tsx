import React, { ComponentProps } from "react";

export function ChevronLeftIcon(props: ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.75 -0.75 24 24" {...props}>
      <path
        fill="none"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M16.275 21.586L6.426 11.737c-.27-.269-.27-.705 0-.974l9.849-9.849"
      ></path>
    </svg>
  );
}
