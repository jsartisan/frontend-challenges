"use client"

import {
  composeRenderProps,
  Link as RACLink,
  LinkProps as RACLinkProps,
} from "react-aria-components"
import { VariantProps } from "tailwind-variants"

import { buttonVariants } from "./button"

export interface LinkButtonProps
  extends RACLinkProps,
    VariantProps<typeof buttonVariants> {}

export function LinkButton(props: LinkButtonProps) {
  return (
    <RACLink
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        buttonVariants({
          ...renderProps,
          className,
          variant: props.variant,
          size: props.size,
        })
      )}
    />
  )
}
