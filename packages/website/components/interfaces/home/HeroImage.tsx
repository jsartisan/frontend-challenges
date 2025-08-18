import React from "react";
import { Logo } from "~/components/common/Logo";

export function HeroImage() {
  return (
    <div className="relative hidden grow items-center justify-center md:flex">
      <Logo svgClassName="size-[50px]" tabIndex={-1} />
      <div className="border-(--color-bd-strong) absolute size-[250px] rounded-full border border-dotted"></div>
      <div className="border-(--color-bd-strong) absolute size-[550px] rounded-full border border-dotted"></div>
      <div className="border-(--color-bd-strong) absolute size-[850px] rounded-full border border-dotted"></div>
    </div>
  );
}
