"use client";

import * as React from "react";
import {
  Tooltip as AriaTooltip,
  TooltipTrigger as AriaTooltipTrigger,
  type TooltipProps as AriaTooltipProps,
  type TooltipTriggerComponentProps,
} from "react-aria-components";

import { cn } from "~/utils/helpers";

function HoverCard({ closeDelay = 0, delay = 0, ...props }: TooltipTriggerComponentProps) {
  return <AriaTooltipTrigger data-slot="hover-card" delay={delay} closeDelay={closeDelay} {...props} />;
}

interface HoverCardContentProps extends AriaTooltipProps {
  className?: string;
}

function HoverCardContent({ className, offset = 4, ...props }: HoverCardContentProps) {
  return (
    <AriaTooltip
      data-slot="hover-card-content"
      offset={offset}
      className={cn(
        "bg-popover text-popover-foreground data-[entering]:animate-in data-[exiting]:animate-out data-[exiting]:fade-out-0 data-[entering]:fade-in-0 data-[exiting]:zoom-out-95 data-[entering]:zoom-in-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 z-50 w-64 rounded-md border p-4 shadow-md outline-hidden",
        className,
      )}
      {...props}
    />
  );
}

export { HoverCard, HoverCardContent };
