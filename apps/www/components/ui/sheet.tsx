"use client";

import * as React from "react";
import {
  DialogTrigger,
  Heading,
  Modal,
  ModalOverlay,
  Dialog as RACDialog,
  type HeadingProps,
  type ModalOverlayProps,
} from "react-aria-components";

import { cn } from "~/utils/helpers";

interface SheetContextValue {
  side?: "top" | "right" | "bottom" | "left";
}

const SheetContext = React.createContext<SheetContextValue>({});

interface SheetProps {
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
}

function Sheet({ children, side = "right" }: SheetProps) {
  return (
    <SheetContext.Provider value={{ side }}>
      <DialogTrigger>{children}</DialogTrigger>
    </SheetContext.Provider>
  );
}

function SheetContent({
  children,
  className,
  isDismissable = true,
  ...props
}: Omit<ModalOverlayProps, "children"> & {
  children: React.ReactNode;
}) {
  const { side = "right" } = React.useContext(SheetContext);

  return (
    <ModalOverlay
      isDismissable={isDismissable}
      data-slot="sheet-portal"
      className={cn(
        "data-[entering]:animate-in data-[exiting]:animate-out data-[exiting]:fade-out-0 data-[entering]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        "data-[entering]:duration-500 data-[exiting]:duration-300",
      )}
      {...props}
    >
      <Modal
        data-slot="sheet-content"
        className={({ isEntering, isExiting }) =>
          cn(
            "bg-background fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out outline-none",
            isEntering && "animate-in duration-500",
            isExiting && "animate-out duration-300",
            side === "right" && [
              "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
              isEntering && "slide-in-from-right",
              isExiting && "slide-out-to-right",
            ],
            side === "left" && [
              "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
              isEntering && "slide-in-from-left",
              isExiting && "slide-out-to-left",
            ],
            side === "top" && [
              "inset-x-0 top-0 h-auto border-b",
              isEntering && "slide-in-from-top",
              isExiting && "slide-out-to-top",
            ],
            side === "bottom" && [
              "inset-x-0 bottom-0 h-auto border-t",
              isEntering && "slide-in-from-bottom",
              isExiting && "slide-out-to-bottom",
            ],
            className,
          )
        }
      >
        <RACDialog className="relative flex h-full max-h-full flex-col overflow-auto outline-none">
          {children}
        </RACDialog>
      </Modal>
    </ModalOverlay>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sheet-header" className={cn("flex flex-col gap-1.5 p-4", className)} {...props} />;
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sheet-footer" className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />;
}

function SheetTitle({ className, ...props }: HeadingProps) {
  return (
    <Heading
      slot="title"
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  );
}

function SheetDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="sheet-description" className={cn("text-muted-foreground text-sm", className)} {...props} />;
}

export { Sheet, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription };
