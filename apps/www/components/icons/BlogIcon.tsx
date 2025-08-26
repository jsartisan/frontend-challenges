import React, { ComponentProps } from "react";

export function BlogIcon(props: ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} fill="none" viewBox="-0.75 -0.75 20 20">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M16.766 15.61h-2.313l-3.469 2.312v-2.313H9.828c-.617 0-1.156-.54-1.156-1.156V9.828c0-.617.54-1.156 1.156-1.156h6.938c.616 0 1.156.54 1.156 1.156v4.625c0 .694-.54 1.156-1.156 1.156zM10.984 10.984h4.625M10.984 13.297h4.625"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M5.885 16.534L.578 17.922 1.963 12.6m3.922 3.934L1.963 12.6m3.922 3.934l.692-.695M1.963 12.6L13.115 1.417c1.077-1.08 2.846-1.157 4 0 1.076 1.08 1.076 2.854 0 4.01L15.806 6.74m-3-5.013l4.005 4.005m-3.313.7l-2.692-2.7"
      ></path>
    </svg>
  );
}
