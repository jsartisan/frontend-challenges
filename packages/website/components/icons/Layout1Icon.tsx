import { ComponentProps } from "react";

export const Layout1Icon = (props: ComponentProps<"svg">) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m1.5 2.99707 0 18.00003c0 0.8284 0.67157 1.5 1.5 1.5l18 0c0.8284 0 1.5 -0.6716 1.5 -1.5l0 -18.00003c0 -0.82843 -0.6716 -1.5 -1.5 -1.5l-18 0c-0.82843 0 -1.5 0.67157 -1.5 1.5Z"
        strokeWidth="1.5"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m12.0029 22.4971 0 -21.00003"
        strokeWidth="1.5"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m12.0029 11.9971 10 0"
        strokeWidth="1.5"
      />
    </svg>
  );
};
