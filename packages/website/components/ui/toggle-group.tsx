"use client";
import * as React from "react";
import { VariantProps } from "class-variance-authority";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";

import { cn } from "../../utils/helpers";
import { toggleVariants } from "./toggle";

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({
  size: "default",
  variant: "default",
});

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    data-variant={variant}
    data-size={size}
    className={cn(
      "bs-8 bg-(--color-bg) shadow-xs inline-flex items-center justify-center gap-1 rounded p-1",
      "data-[variant=outline]:border-(--color-bd) data-[variant=outline]:border",
      "[[data-size=icon][data-variant=outline]]:p-[2px] data-[variant=ghost]:gap-2 data-[variant=ghost]:p-0 data-[variant=ghost]:shadow-none",
      "data-[size=sm][variant=outline]:bs-7",
      className,
    )}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className,
      )}
      data-variant={context.variant || variant}
      data-size={context.size || size}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
