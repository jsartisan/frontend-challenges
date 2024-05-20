import React, { ComponentProps } from "react";

export function ChallengeIcon(props: ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="-0.75 -0.75 20 20">
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3.469 5.203a1.734 1.734 0 103.469 0 1.734 1.734 0 10-3.47 0M11.563 13.297a1.734 1.734 0 103.468 0 1.734 1.734 0 10-3.469 0"
      ></path>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M2.698 1.156h13.104s1.542 0 1.542 1.542v13.104s0 1.542-1.542 1.542H2.698s-1.542 0-1.542-1.542V2.698s0-1.542 1.542-1.542M9.25 1.156v16.188M1.156 9.25h16.188"
      ></path>
    </svg>
  );
}
