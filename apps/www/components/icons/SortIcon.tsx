import { ComponentProps } from "react";

export const SortIcon = (props: ComponentProps<"svg">) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-0.75 -0.75 20 20" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      d="M0.578125 14.568672916666667h5.627083333333333"
      strokeWidth="1.5"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      d="M0.578125 9.25h11.408333333333335"
      strokeWidth="1.5"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      d="M0.578125 3.9313270833333336h17.34375"
      strokeWidth="1.5"
    />
  </svg>
);
