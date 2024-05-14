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
  CssColorIcon,
  SystemIcon,
  UserIcon,
  MoonIcon,
  SpinnerIcon,
  SortIcon,
  CheckIcon,
  ChallengeIcon,
  BlogIcon,
  HomeIcon,
} from "../icons";
import { TidyIcon } from "../icons/TidyIcon";
import { cn } from "@/utils/helpers";
import * as RadixIcon from "@radix-ui/react-icons";
import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { ArrowUpIcon } from "../icons/ArrowUpIcon";
import { ArrowDownIcon } from "../icons/ArrowDownIcon";

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
    | "caret-down"
    | "css-color"
    | "tidy"
    | "plus-circled"
    | "system"
    | "user"
    | "spinner"
    | "sort"
    | "arrow-up"
    | "arrow-down"
    | "check-circle"
    | "blog"
    | "challenge";
  className?: string;
} & VariantProps<typeof iconVariants>;

const iconVariants = cva("", {
  defaultVariants: {
    size: "default",
  },
  variants: {
    size: {
      default: "h-6 w-6",
      lg: "h-11 w-11",
      sm: "h-4 w-4",
      xs: "h-3 w-3",
    },
  },
});

const Icon = React.forwardRef<SVGSVGElement, IconProps>(({ className, name, size, ...props }, ref) => {
  let icon;

  switch (name) {
    case "play":
      icon = RadixIcon.PlayIcon;
      break;
    case "home":
      icon = HomeIcon;
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
      icon = MoonIcon;
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
    case "css-color":
      icon = CssColorIcon;
      break;
    case "plus-circled":
      icon = RadixIcon.PlusCircledIcon;
      break;
    case "tidy":
      icon = TidyIcon;
      break;
    case "system":
      icon = SystemIcon;
      break;
    case "user":
      icon = UserIcon;
      break;
    case "spinner":
      icon = SpinnerIcon;
      break;
    case "sort":
      icon = SortIcon;
      break;
    case "arrow-up":
      icon = ArrowUpIcon;
      break;
    case "arrow-down":
      icon = ArrowDownIcon;
      break;
    case "check-circle":
      icon = CheckIcon;
      break;
    case "blog":
      icon = BlogIcon;
      break;
    case "challenge":
      icon = ChallengeIcon;
      break;
    default:
      icon = RadixIcon.Pencil1Icon;
      break;
  }

  return React.createElement(icon, {
    ...props,
    className: cn(iconVariants({ className, size })),
    ref,
  });
});

Icon.displayName = "Icon";

export { Icon };
