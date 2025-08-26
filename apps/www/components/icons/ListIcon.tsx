import React from "react";
import { ComponentProps } from "react";

function ListIcon(props: ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-0.75 -0.75 24 24" {...props}>
      <g fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <path d="M7.734 2.813h14.063M7.734 11.25h14.063M7.734 19.688h14.063M1.406.703H4.22s.703 0 .703.703V4.22s0 .703-.703.703H1.406s-.703 0-.703-.703V1.406s0-.703.703-.703M1.406 9.14H4.22s.703 0 .703.704v2.812s0 .703-.703.703H1.406s-.703 0-.703-.703V9.844s0-.703.703-.703M1.406 17.578H4.22s.703 0 .703.703v2.813s0 .703-.703.703H1.406s-.703 0-.703-.703V18.28s0-.703.703-.703"></path>
      </g>
    </svg>
  );
}

export { ListIcon };
