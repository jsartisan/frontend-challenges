import React, { ComponentProps } from "react";

export function HomeIcon(props: ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="-0.75 -0.75 20 20">
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M2.89 10.745v6.359h4.626v-4.625a1.156 1.156 0 011.156-1.156h1.156a1.156 1.156 0 011.156 1.156v4.625h4.625v-6.36M.578 9.588l7.854-7.854a1.156 1.156 0 011.636 0l7.854 7.854"
      ></path>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12.719 4.385V3.23h2.89v4.047M1.156 17.104h16.188"
      ></path>
    </svg>
  );
}
