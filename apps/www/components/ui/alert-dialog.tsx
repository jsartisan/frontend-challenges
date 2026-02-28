"use client"

import * as React from "react"
import {
  DialogProps,
  Heading,
  Dialog as RACDialog,
  DialogTrigger as RACDialogTrigger,
  Text,
  Modal,
  ModalOverlay,
  composeRenderProps,
} from "react-aria-components"

import { cn } from "~/utils/helpers"
import { Button, buttonVariants } from "./button"

export function AlertDialogTrigger(
  props: React.ComponentProps<typeof RACDialogTrigger>
) {
  return <RACDialogTrigger {...props} />
}

export function AlertDialog(props: DialogProps) {
  return (
    <RACDialog
      role="alertdialog"
      {...props}
      className={cn(
        "relative max-h-[inherit] overflow-auto p-6 outline outline-0",
        props.className
      )}
    />
  )
}

export function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

export function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
      {...props}
    />
  )
}

export function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof Heading>) {
  return (
    <Heading
      slot="title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  )
}

export function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      slot="description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

interface AlertDialogContentProps extends React.ComponentProps<typeof Modal> {
  children?: React.ReactNode
}

export function AlertDialogContent({
  children,
  className,
  ...props
}: AlertDialogContentProps) {
  return (
    <ModalOverlay
      isDismissable={false}
      className={cn(
        "fixed inset-0 z-50 bg-background/80 backdrop-blur-xs",
        "data-[entering]:animate-in data-[exiting]:animate-out",
        "data-[entering]:fade-in-0 data-[exiting]:fade-out-0"
      )}
    >
      <Modal
        {...props}
        className={composeRenderProps(className, (className) =>
          cn(
            "fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%]",
            "border bg-background shadow-lg sm:rounded-lg",
            "data-[entering]:animate-in data-[exiting]:animate-out",
            "data-[entering]:fade-in-0 data-[exiting]:fade-out-0",
            "data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95",
            className
          )
        )}
      >
        <AlertDialog>{children}</AlertDialog>
      </Modal>
    </ModalOverlay>
  )
}

export function AlertDialogAction({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button className={cn(buttonVariants(), className)} {...props}>
      {children}
    </Button>
  )
}

export function AlertDialogCancel({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      slot="close"
      variant="secondary"
      className={cn("mt-2 sm:mt-0", className)}
      {...props}
    >
      {children}
    </Button>
  )
}
