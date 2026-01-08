import type { VariantProps } from "tailwind-variants";

import * as React from "react";
import { tv } from "tailwind-variants";

export type IconProps = {
  icon: React.ElementType;
  className?: string;
} & VariantProps<typeof iconVariants>;

const iconVariants = tv({
  base: "",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      md: "size-5",
      lg: "size-6",
      sm: "size-4",
      xs: "size-3",
      xl: "size-8",
    },
  },
});

const Icon = React.forwardRef<SVGSVGElement, IconProps>(({ className, icon, size, ...props }, ref) => {
  return React.createElement(icon, {
    ...props,
    className: iconVariants({ className, size }),
    ref,
  });
});

Icon.displayName = "Icon";

export { Icon };
