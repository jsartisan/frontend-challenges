import React, { ComponentProps } from "react";

export function VerticalDotsIcon(props: ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-0.75 -0.75 24 24" {...props}>
      <path
        fill="none"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M8.777 19.339a2.46 2.46 0 104.922 0 2.46 2.46 0 10-4.922 0zM8.777 3.167a2.46 2.46 0 104.922 0 2.46 2.46 0 10-4.922 0zM8.777 11.253a2.46 2.46 0 104.922 0 2.46 2.46 0 10-4.922 0z"
      ></path>
    </svg>
  );
}

export default VerticalDotsIcon;
