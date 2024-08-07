import { ComponentProps } from "react";

export const MarkdownIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-0.75 -0.75 48 48" height="48" width="48" {...props}>
      <path
        stroke="#000000"
        strokeLinejoin="round"
        d="M1.453125 10.171875c0 -2.140104375 1.7348956249999998 -3.875 3.875 -3.875h35.84375c2.1401625 0 3.875 1.7348956249999998 3.875 3.875v26.15625c0 2.1401625 -1.7348375 3.875 -3.875 3.875H5.328125c-2.140104375 0 -3.875 -1.7348375 -3.875 -3.875V10.171875Z"
        strokeWidth="1.5"
      />
      <path
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.6875 31V15.5l5.8125 9.299999999999999L21.3125 15.5v15.5"
        strokeWidth="1.5"
      />
      <path stroke="#000000" strokeLinecap="round" strokeLinejoin="round" d="M32.9375 15.5v15.5" strokeWidth="1.5" />
      <path
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m27.125 25.1875 5.8125 5.8125 5.8125 -5.8125"
        strokeWidth="1.5"
      />
    </svg>
  );
};
