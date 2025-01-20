import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/helpers";

const toggleVariants = cva(
  cn(
    "inline-flex items-center justify-center rounded-[calc(var(--radius)-2px)] text-sm font-medium transition-colors hover:bg-muted hover:text-[var(--color-fg)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-[var(--color-bg-hover)] [&>svg]:h-5 [&>svg]:w-5",
    "area-[checked=true]:text-[var(--color-fg)] aria-[checked=true]:bg-[var(--color-bg-selected)]",
  ),
  {
    variants: {
      variant: {
        default: "bg-transparent",
        ghost: "bg-transparent",
        outline: "",
      },
      size: {
        default: "bs-6 px-3",
        sm: "bs-5 px-2 data-[variant=ghost]:bs-7",
        lg: "bs-10 px-3",
        icon: "size-7 px-0 data-[variant=outline]:size-[calc(1.75rem-2px)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root ref={ref} className={cn(toggleVariants({ variant, size, className }))} {...props} />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
