import React, { ComponentProps } from "react";

export function LogInfoIcon(props: ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="-0.75 -0.75 24 24" {...props}>
      <path
        stroke="currentcolor"
        strokeWidth="1.5"
        d="M11.25 16.172a.352.352 0 010-.703M11.25 16.172a.352.352 0 000-.703"
      ></path>
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M11.25 12.656V4.922"
      ></path>
      <path
        stroke="currentcolor"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M11.25 21.797c5.825 0 10.547-4.722 10.547-10.547S17.075.703 11.25.703.703 5.425.703 11.25 5.425 21.797 11.25 21.797z"
      ></path>
    </svg>
  );
}
