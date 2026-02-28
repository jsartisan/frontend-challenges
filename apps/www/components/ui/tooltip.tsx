"use client"

import * as React from "react"
import {
  Tooltip as AriaTooltip,
  TooltipProps as AriaTooltipProps,
  composeRenderProps,
  OverlayArrow,
  TooltipTrigger,
} from "react-aria-components"
import { tv } from "tailwind-variants"

export interface TooltipProps extends Omit<AriaTooltipProps, "children"> {
  children: React.ReactNode
}

const tooltipStyles = tv({
  base: "group z-50 w-fit rounded-md bg-foreground px-3 py-1.5 text-xs text-balance text-background",
  variants: {
    isEntering: {
      true: "animate-in fade-in-0 zoom-in-95 placement-bottom:slide-in-from-top-2 placement-top:slide-in-from-bottom-2 placement-left:slide-in-from-right-2 placement-right:slide-out-to-left-2",
    },
    isExiting: {
      true: "animate-out fade-out-0 zoom-out-95 placement-bottom:slide-out-to-top-2 placement-top:slide-out-to-bottom-2 placement-left:slide-out-to-right-2 placement-right:slide-out-to-left-2",
    },
  },
})

function Tooltip({ children, ...props }: TooltipProps) {
  return (
    <AriaTooltip
      {...props}
      offset={10}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tooltipStyles({ ...renderProps, className })
      )}
    >
      <OverlayArrow>
        <svg
          width={8}
          height={8}
          viewBox="0 0 8 8"
          className="group-placement-bottom:rotate-180 group-placement-left:-rotate-90 group-placement-right:rotate-90 fill-foreground forced-colors:fill-[Canvas] forced-colors:stroke-[ButtonBorder]"
        >
          <path d="M0 0 L4 4 L8 0" />
        </svg>
      </OverlayArrow>
      {children}
    </AriaTooltip>
  )
}

export { Tooltip, TooltipTrigger }
