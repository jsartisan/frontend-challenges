import { ComponentProps } from "react";

export const SystemIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.75 -0.75 20 20" {...props}>
      <defs />
      <title>monitor-1</title>
      <path
        d="M2.8921666666666668 1.15625h12.71875s2.3125 0 2.3125 2.3125v6.9375s0 2.3125 -2.3125 2.3125h-12.71875s-2.3125 0 -2.3125 -2.3125v-6.9375s0 -2.3125 2.3125 -2.3125"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M4.625 17.34375c0 -1.2772708333333334 2.0712291666666665 -2.3125 4.625 -2.3125s4.625 1.0352291666666666 4.625 2.3125Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="m9.251541666666668 12.71875 0 2.3125"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};
