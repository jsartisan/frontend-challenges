import React, { ComponentProps } from "react";

export function TidyIcon(props: ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="-0.75 -0.75 24 24" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M15.586 12.866c-4.676 1.576-6.218 3.33-7.357 7.7-1.14-4.37-2.682-6.124-7.358-7.7 4.676-1.576 6.218-3.33 7.358-7.7 1.14 4.37 2.681 6.124 7.357 7.7zM21.387 5.576c-2.638.886-3.507 1.871-4.15 4.327-.643-2.456-1.513-3.441-4.15-4.327 2.637-.885 3.507-1.87 4.15-4.326.643 2.455 1.512 3.441 4.15 4.326zM21.73 18.34c-1.953.641-2.596 1.355-3.072 3.134-.476-1.779-1.12-2.493-3.072-3.134 1.952-.642 2.596-1.356 3.072-3.135.476 1.779 1.12 2.493 3.072 3.135z"
      ></path>
    </svg>
  );
}
