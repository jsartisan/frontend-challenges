"use client";

import { SandpackConsole } from "@codesandbox/sandpack-react";
import { ImperativePanelHandle } from "react-resizable-panels";
import { ComponentPropsWithRef, MutableRefObject } from "react";

import { cn } from "~/utils/helpers";

type Props = {
  className?: string;
  panelRef?: MutableRefObject<ImperativePanelHandle>;
} & ComponentPropsWithRef<"div">;

export function Console(props: Props) {
  const { className } = props;

  return <SandpackConsole className={cn("flex h-full w-full flex-col overflow-hidden", className)} />;
}
