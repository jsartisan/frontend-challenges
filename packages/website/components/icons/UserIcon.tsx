import { ComponentProps } from "react";

export const UserIcon = (props: ComponentProps<"svg">) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.75 -0.75 24 24" height="24" width="24" {...props}>
    <path
      d="M6.328125 5.625a4.921875 4.921875 0 1 0 9.84375 0 4.921875 4.921875 0 1 0 -9.84375 0Z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M2.109375 21.796875a9.140625 9.140625 0 0 1 18.28125 0"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);
