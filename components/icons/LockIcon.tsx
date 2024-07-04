import React, { ComponentProps } from "react";

export function LockIcon(props: ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="-0.75 -0.75 24 24" {...props}>
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M17.578 9.14H4.922c-.777 0-1.406.63-1.406 1.407v9.844c0 .776.63 1.406 1.406 1.406h12.656c.777 0 1.406-.63 1.406-1.406v-9.844c0-.777-.63-1.406-1.406-1.406z"
      ></path>
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6.328 9.14V5.626a4.922 4.922 0 119.844 0v3.516"
      ></path>
      <path
        stroke="currentcolor"
        strokeWidth="1.5"
        d="M11.25 15.469a.352.352 0 010-.703M11.25 15.469a.352.352 0 000-.703"
      ></path>
    </svg>
  );
}
