"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "../../utils/helpers";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 rounded-md bg-[var(--color-bg-assistive)] px-3 py-1.5 text-xs text-[var(--color-fg-on-assistive)]",
      className,
    )}
    {...props}
  />
));

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

const TooltipArrow = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow>
>((props, ref) => (
  <TooltipPrimitive.Arrow
    ref={ref}
    className="absolute z-50 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-[225deg] transform border-l border-t border-transparent bg-[var(--color-bg-assistive)] fill-transparent"
    {...props}
  />
));

TooltipArrow.displayName = TooltipPrimitive.Arrow.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, TooltipArrow };
