"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { REPO } from "@/constants";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Separator } from "../ui/separator";
import { Icon } from "../ui/icon";
import { IconButton } from "../ui";
import { Logo } from "../common/Logo";

type HeaderProps = {
  include?: ("layout-changer" | "share-solution")[];
};

export function Header(props: HeaderProps) {
  const { include = [] } = props;
  const { setTheme } = useTheme();

  return (
    <div className="sticky top-0 z-30 w-full border-b border-[var(--color-border)] bg-[var(--color-bg)] bg-opacity-5 backdrop-blur-md transition-[background-color]">
      <div className="mx-auto px-4 sm:px-6">
        <div className="flex h-[var(--navbar-height)] items-center justify-between md:justify-start md:gap-4">
          <div className="flex items-center justify-start">
            <Logo />
          </div>
          <div className="ml-auto flex items-center gap-2">
            {include.includes("share-solution") && (
              <>
                <Separator orientation="vertical" className="mx-2" />
              </>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <IconButton variant="tertiary">
                  <Icon name="sun" className="block dark:hidden" />
                  <Icon name="moon" className="hidden dark:block " />
                  <span className="sr-only">Toggle theme</span>
                </IconButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <IconButton asChild variant="tertiary">
              <a href={REPO} target="_blank" rel="noreferrer">
                <GitHubLogoIcon />
              </a>
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}
