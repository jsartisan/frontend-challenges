import React, { ComponentProps } from "react";

export function ChevronDownIcon(props: ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="-0.75 -0.75 24 24" {...props}>
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M21.586 6.225l-9.85 9.848a.69.69 0 01-.973 0L.914 6.225"
      ></path>
    </svg>
  );
}
