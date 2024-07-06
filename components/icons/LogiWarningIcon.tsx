import React, { ComponentProps } from "react";

export function LogWarningIcon(props: ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="-0.75 -0.75 24 24" {...props}>
      <path
        stroke="currentcolor"
        strokeWidth="1.5"
        d="M11.25 18.281a.352.352 0 010-.703M11.25 18.281a.352.352 0 000-.703"
      ></path>
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M11.25 14.766V7.734"
      ></path>
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12.77 1.65a1.693 1.693 0 00-3.04 0L.85 19.742a1.426 1.426 0 001.28 2.055h18.24a1.426 1.426 0 001.28-2.055L12.77 1.65z"
      ></path>
    </svg>
  );
}
