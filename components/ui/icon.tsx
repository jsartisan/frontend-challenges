import * as React from "react";

import * as RadixIcon from "@radix-ui/react-icons";
import { cn } from "@/utils/helpers";
import {
  Layout1Icon,
  Layout2Icon,
  Layout3Icon,
  MarkdownIcon,
  ReactColorIcon,
  SvelteColorIcon,
  VanillaColorIcon,
  VueColorIcon,
  JavascriptColorIcon,
} from "../icons";
import { VariantProps, cva } from "class-variance-authority";

export type IconProps = {
  name:
    | "pencil"
    | "sun"
    | "moon"
    | "layout-1"
    | "layout-2"
    | "layout-3"
    | "check"
    | "chevron-right"
    | "chevron-left"
    | "home"
    | "markdown"
    | "eye"
    | "book"
    | "react-color"
    | "plus"
    | "cross"
    | "delete"
    | "vue-color"
    | "vanilla-color"
    | "svelte-color"
    | "external-link"
    | "javascript-color"
    | "github"
    | "play"
    | "code"
    | "file-text"
    | "caret-down";
  className?: string;
} & VariantProps<typeof iconVariants>;

const iconVariants = cva("", {
  variants: {
    size: {
      default: "h-6 w-6",
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      lg: "h-11 w-11",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const Icon = React.forwardRef<SVGSVGElement, IconProps>(({ className, size, name, ...props }, ref) => {
  let icon;

  switch (name) {
    case "play":
      icon = RadixIcon.PlayIcon;
      break;
    case "home":
      icon = RadixIcon.HomeIcon;
      break;
    case "chevron-right":
      icon = RadixIcon.ChevronRightIcon;
      break;
    case "chevron-left":
      icon = RadixIcon.ChevronLeftIcon;
      break;
    case "check":
      icon = RadixIcon.CheckIcon;
      break;
    case "pencil":
      icon = RadixIcon.Pencil1Icon;
      break;
    case "sun":
      icon = RadixIcon.SunIcon;
      break;
    case "moon":
      icon = RadixIcon.MoonIcon;
      break;
    case "layout-1":
      icon = Layout1Icon;
      break;
    case "layout-2":
      icon = Layout2Icon;
      break;
    case "layout-3":
      icon = Layout3Icon;
      break;
    case "markdown":
      icon = MarkdownIcon;
      break;
    case "eye":
      icon = RadixIcon.EyeOpenIcon;
      break;
    case "book":
      icon = RadixIcon.ReaderIcon;
      break;
    case "react-color":
      icon = ReactColorIcon;
      break;
    case "plus":
      icon = RadixIcon.PlusIcon;
      break;
    case "cross":
      icon = RadixIcon.Cross1Icon;
      break;
    case "delete":
      icon = RadixIcon.TrashIcon;
      break;
    case "vue-color":
      icon = VueColorIcon;
      break;
    case "javascript-color":
      icon = JavascriptColorIcon;
      break;
    case "svelte-color":
      icon = SvelteColorIcon;
      break;
    case "external-link":
      icon = RadixIcon.ExternalLinkIcon;
      break;
    case "vanilla-color":
      icon = VanillaColorIcon;
      break;
    case "github":
      icon = RadixIcon.GitHubLogoIcon;
      break;
    case "code":
      icon = RadixIcon.CodeIcon;
      break;
    case "file-text":
      icon = RadixIcon.FileTextIcon;
      break;
    case "caret-down":
      icon = RadixIcon.CaretDownIcon;
      break;
    default:
      icon = RadixIcon.Pencil1Icon;
      break;
  }

  return React.createElement(icon, {
    ...props,
    ref,
    className: cn(iconVariants({ size, className })),
  });
});

Icon.displayName = "Icon";

export { Icon };
