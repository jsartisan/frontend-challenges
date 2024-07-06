import React, { ComponentProps } from "react";

export function ChevronUpIcon(props: ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-0.75 -0.75 24 24" {...props}>
      <path
        fill="none"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M.703 16.115l10.05-10.05a.702.702 0 01.994 0l10.05 10.05"
      ></path>
    </svg>
  );
}
