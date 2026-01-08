"use client";

import React from "react";
import {
  DialogProps,
  Heading,
  Dialog as RACDialog,
  DialogTrigger as RACDialogTrigger,
  Text,
} from "react-aria-components";

import { cn } from "~/utils/helpers";

export function DialogTrigger(props: React.ComponentProps<typeof RACDialogTrigger>) {
  return <RACDialogTrigger {...props} />;
}

export function Dialog(props: DialogProps) {
  return (
    <RACDialog
      {...props}
      className={cn(
        "relative max-h-[inherit] overflow-auto p-6 outline outline-0 [[data-placement]>&]:p-4",
        props.className,
      )}
    />
  );
}

export function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

export function DialogTitle({ className, ...props }: React.ComponentProps<typeof Heading>) {
  return (
    <Heading data-slot="dialog-title" className={cn("text-lg font-semibold leading-none", className)} {...props} />
  );
}

export function DialogDescription({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text data-slot="dialog-description" className={cn("text-muted-foreground text-sm", className)} {...props} />;
}
