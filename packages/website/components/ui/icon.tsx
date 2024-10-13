import * as React from "react";
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
  ExternalLinkIcon,
  EditIcon,
  FilterIcon,
  LockIcon,
  LogClearIcon,
  LogErrorIcon,
  LogInfoIcon,
  LogWarningIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  LogAllIcon,
  TypescriptColorIcon,
  ListIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  VerticalDotsIcon,
  LinkedinIcon,
  XIcon,
  BugIcon,
} from "../icons";
import { TidyIcon } from "../icons/TidyIcon";
import { cn } from "../../utils/helpers";
import * as RadixIcon from "@radix-ui/react-icons";
import { VariantProps, cva } from "class-variance-authority";
import { ArrowUpIcon } from "../icons/ArrowUpIcon";
import { ArrowDownIcon } from "../icons/ArrowDownIcon";
import { SettingsIcon } from "../icons/SettingsIcon";

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
    | "chevron-down"
    | "chevron-up"
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
    | "challenge"
    | "external-link"
    | "edit"
    | "filter"
    | "lock"
    | "log-clear"
    | "log-error"
    | "log-info"
    | "log-warning"
    | "log-all"
    | "typescript-color"
    | "list"
    | "vertical-dots"
    | "linkedin"
    | "x"
    | "bug"
    | "settings";
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
      icon = ChevronRightIcon;
      break;
    case "chevron-left":
      icon = ChevronLeftIcon;
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
    case "external-link":
      icon = ExternalLinkIcon;
      break;
    case "edit":
      icon = EditIcon;
      break;
    case "filter":
      icon = FilterIcon;
      break;
    case "lock":
      icon = LockIcon;
      break;
    case "log-clear":
      icon = LogClearIcon;
      break;
    case "log-error":
      icon = LogErrorIcon;
      break;
    case "log-info":
      icon = LogInfoIcon;
      break;
    case "log-warning":
      icon = LogWarningIcon;
      break;
    case "log-clear":
      icon = LogClearIcon;
      break;
    case "log-all":
      icon = LogAllIcon;
      break;
    case "chevron-down":
      icon = ChevronDownIcon;
      break;
    case "chevron-up":
      icon = ChevronUpIcon;
      break;
    case "typescript-color":
      icon = TypescriptColorIcon;
      break;
    case "list":
      icon = ListIcon;
      break;
    case "vertical-dots":
      icon = VerticalDotsIcon;
      break;
    case "linkedin":
      icon = LinkedinIcon;
      break;
    case "x":
      icon = XIcon;
      break;
    case "bug":
      icon = BugIcon;
      break;
    case "settings":
      icon = SettingsIcon;
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
