import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "../../utils/helpers";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track className="bg-(--color-bd-subtle) relative h-1.5 w-full grow overflow-hidden rounded-full">
      <SliderPrimitive.Range className="bg-primary absolute h-full" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="focus-visible:ring-ring border-(--color-bd-accent) bg-(--color-bg) focus-visible:outline-hidden block h-4 w-4 rounded-full border shadow-sm transition-colors focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
