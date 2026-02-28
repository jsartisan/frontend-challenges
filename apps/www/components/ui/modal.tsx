"use client"

import React from "react"
import {
  ModalOverlay,
  ModalOverlayProps,
  Modal as RACModal,
} from "react-aria-components"
import { tv } from "tailwind-variants"

const overlayStyles = tv({
  base: "absolute top-0 left-0 w-full h-(--page-height) isolate z-20 bg-black/[50%] backdrop-blur-lg",
  variants: {
    isEntering: {
      true: "animate-in fade-in duration-200 ease-out",
    },
    isExiting: {
      true: "animate-out fade-out duration-200 ease-in",
    },
  },
})

const modalStyles = tv({
  base: "max-h-[inherit] overflow-auto rounded-lg border bg-background shadow-lg outline outline-0 sm:rounded-lg",
  variants: {
    isEntering: {
      true: "animate-in fade-in-0 zoom-in-95 duration-200",
    },
    isExiting: {
      true: "animate-out fade-out-0 zoom-out-95 duration-200",
    },
  },
})

export function Modal(props: ModalOverlayProps) {
  const { isDismissable = true } = props

  return (
    <ModalOverlay
      {...props}
      className={overlayStyles}
      isDismissable={isDismissable}
    >
      <div className="sticky top-0 left-0 box-border flex h-(--visual-viewport-height) w-full items-center justify-center p-4">
        <RACModal {...props} className={modalStyles} />
      </div>
    </ModalOverlay>
  )
}
