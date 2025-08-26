import React, { ComponentProps } from "react";

export function SettingsIcon(props: ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-0.75 -0.75 24 24" {...props}>
      <path
        fill="none"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9.887 2.286a1.835 1.835 0 002.726 0l.887-.974a1.837 1.837 0 013.197 1.325L16.63 3.95a1.836 1.836 0 001.923 1.925l1.313-.066a1.837 1.837 0 011.321 3.197l-.976.88a1.837 1.837 0 000 2.728l.976.881a1.837 1.837 0 01-1.324 3.197l-1.313-.066a1.836 1.836 0 00-1.927 1.927l.066 1.313a1.837 1.837 0 01-3.189 1.322l-.882-.976a1.837 1.837 0 00-2.726 0l-.886.976a1.837 1.837 0 01-3.194-1.32l.068-1.313a1.836 1.836 0 00-1.927-1.927l-1.313.066A1.836 1.836 0 011.312 13.5l.976-.881a1.837 1.837 0 000-2.727l-.975-.886a1.836 1.836 0 011.32-3.194l1.313.067a1.836 1.836 0 001.93-1.931l-.064-1.314a1.837 1.837 0 013.194-1.321z"
      ></path>
      <path
        fill="none"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M7.031 11.25a4.219 4.219 0 108.438 0 4.219 4.219 0 10-8.438 0z"
      ></path>
    </svg>
  );
}
