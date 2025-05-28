import React from "react";
import { Logo } from "~/components/common/Logo";

export function HeroImage() {
  return (
    <div className="relative hidden flex-grow items-center justify-center md:flex">
      <Logo svgClassName="size-[50px]" tabIndex={-1} />
      <div className="absolute size-[250px] rounded-full border border-dotted border-[var(--color-bd-strong)]"></div>
      <div className="absolute size-[550px] rounded-full border border-dotted border-[var(--color-bd-strong)]"></div>
      <div className="absolute size-[850px] rounded-full border border-dotted border-[var(--color-bd-strong)]"></div>
    </div>
  );
}
