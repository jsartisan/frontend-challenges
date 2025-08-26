import React, { ComponentProps } from "react";

export function BugIcon(props: ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.75 -0.75 24 24" {...props}>
      <path
        fill="none"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3.516 13.404a7.734 7.734 0 1015.468 0 7.734 7.734 0 10-15.468 0zM4.367 9.889h13.766M11.25 9.889v11.25M4.024 10.642a4.898 4.898 0 00-2.618-.75M1.406 19.732a4.912 4.912 0 003.68-1.654M1.406 14.107h2.142M18.476 10.642a4.898 4.898 0 012.618-.75M21.094 19.732a4.912 4.912 0 01-3.68-1.654M21.094 14.107h-2.142M5.588 1.406c0 2.754.213 3.776 2.519 4.93M16.838 1.406c0 2.754-.214 3.776-2.52 4.93"
      ></path>
    </svg>
  );
}
