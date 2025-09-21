import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "../../utils/helpers";

export type IconProps = {
  // Accept Tabler or other SVG icon components which may allow numeric stroke.
  icon: React.ComponentType<any>;
  className?: string;
} & VariantProps<typeof iconVariants>;

const iconVariants = cva("", {
  defaultVariants: {
    size: "default",
  },
  variants: {
    size: {
      default: "size-5",
      lg: "h-11 w-11",
      sm: "h-4 w-4",
      xs: "h-3 w-3",
    },
  },
});

const Icon = React.forwardRef<SVGSVGElement, IconProps>(({ className, icon, size, ...props }, ref) => {
  return React.createElement(icon, {
    ...props,
    className: cn(iconVariants({ className, size })),
    ref,
  });
});

Icon.displayName = "Icon";

export { Icon };
