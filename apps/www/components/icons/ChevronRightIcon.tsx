import React, { ComponentProps } from "react";

export function ChevronRightIcon(props: ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.75 -0.75 24 24" {...props}>
      <path
        fill="none"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6.225.914l9.849 9.85c.269.268.269.704 0 .973l-9.85 9.849"
      ></path>
    </svg>
  );
}
