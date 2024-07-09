import React from "react";
import { Logo } from "../common/Logo";

export function HeroImage() {
  return (
    <div className="relative flex flex-grow items-center justify-center">
      <Logo className="size-[50px]" />
      <div className="absolute size-[250px] rounded-full border border-dotted border-[var(--color-bd-strong)]"></div>
      <div className="absolute size-[550px] rounded-full border border-dotted border-[var(--color-bd-strong)]"></div>
      <div className="absolute size-[850px] rounded-full border border-dotted border-[var(--color-bd-strong)]"></div>
    </div>
  );
}
