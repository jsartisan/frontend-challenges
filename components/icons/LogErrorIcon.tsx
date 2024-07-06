import React, { ComponentProps } from "react";

export function LogErrorIcon(props: ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-0.75 -0.75 24 24" {...props}>
      <path
        fill="none"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M14.233 8.267l-5.966 5.965M8.267 8.267l5.966 5.965M.703 11.25a10.547 10.547 0 1021.094 0 10.547 10.547 0 10-21.094 0z"
      ></path>
    </svg>
  );
}
