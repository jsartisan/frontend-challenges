"use client"

import React from "react"
import {
  Slider as AriaSlider,
  SliderProps as AriaSliderProps,
  composeRenderProps,
  SliderOutput,
  SliderThumb,
  SliderTrack,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { cn, focusRing } from "~/utils/helpers"
import { FieldLabel } from "./field"

const trackStyles = tv({
  base: "rounded-full bg-muted relative overflow-hidden",
  variants: {
    orientation: {
      horizontal: "w-full h-1.5",
      vertical: "h-full w-1.5 ml-[50%] -translate-x-[50%]",
    },
    isDisabled: {
      false: "",
      true: "opacity-50",
    },
  },
})

const rangeStyles = tv({
  base: "bg-primary absolute",
  variants: {
    orientation: {
      horizontal: "h-full",
      vertical: "w-full",
    },
  },
})

const thumbStyles = tv({
  extend: focusRing,
  base: "size-4 group-orientation-horizontal:mt-4 group-orientation-vertical:ml-3 rounded-full bg-white border border-primary shadow-sm transition-[color,box-shadow] outline-hidden",
  variants: {
    isDragging: {
      true: "ring-4 ring-ring/50",
    },
    isFocusVisible: {
      true: "ring-4 ring-ring/50",
    },
    isDisabled: {
      true: "opacity-50 pointer-events-none",
    },
  },
})

export interface SliderProps<T> extends AriaSliderProps<T> {
  label?: string
  thumbLabels?: string[]
}

export function Slider<T extends number | number[]>({
  label,
  thumbLabels,
  ...props
}: SliderProps<T>) {
  return (
    <AriaSlider
      {...props}
      className={composeRenderProps(props.className, (className) =>
        cn(
          "orientation-horizontal:grid orientation-vertical:flex orientation-horizontal:w-64 grid-cols-[1fr_auto] flex-col items-center gap-2",
          className
        )
      )}
    >
      <FieldLabel>{label}</FieldLabel>
      <SliderOutput className="orientation-vertical:hidden text-muted-foreground text-sm font-medium">
        {({ state }) =>
          state.values.map((_, i) => state.getThumbValueLabel(i)).join(" – ")
        }
      </SliderOutput>
      <SliderTrack className="group orientation-horizontal:h-6 orientation-vertical:w-6 orientation-vertical:h-64 col-span-2 flex items-center">
        {({ state, ...renderProps }) => {
          const orientation = renderProps.orientation || "horizontal"
          const isHorizontal = orientation === "horizontal"
          const minValue = state.getThumbMinValue(0)
          const maxValue = state.getThumbMaxValue(state.values.length - 1)
          const range = maxValue - minValue

          const fillStart =
            state.values.length > 1
              ? ((state.values[0] - minValue) / range) * 100
              : 0
          const fillEnd =
            state.values.length > 1
              ? ((state.values[state.values.length - 1] - minValue) / range) *
                100
              : ((state.values[0] - minValue) / range) * 100
          const fillSize = fillEnd - fillStart

          return (
            <>
              <div className={trackStyles(renderProps)}>
                <div
                  className={rangeStyles({ orientation })}
                  style={
                    isHorizontal
                      ? { left: `${fillStart}%`, width: `${fillSize}%` }
                      : { bottom: `${fillStart}%`, height: `${fillSize}%` }
                  }
                />
              </div>
              {state.values.map((_, i) => (
                <SliderThumb
                  key={i}
                  index={i}
                  aria-label={thumbLabels?.[i]}
                  className={thumbStyles}
                />
              ))}
            </>
          )
        }}
      </SliderTrack>
    </AriaSlider>
  )
}
