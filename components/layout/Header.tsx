"use client";

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
import { Badge, IconButton } from "../ui";
import { Logo } from "../common/Logo";
import { useRouter } from "next/navigation";

export function Header() {
  const { setTheme } = useTheme();
  const router = useRouter();

  return (
    <div className="sticky top-0 z-30 w-full border-b border-[var(--color-border)] bg-[var(--color-bg)] bg-opacity-5 backdrop-blur-md transition-[background-color]">
      <div className="mx-auto px-4 sm:px-6">
        <div className="flex h-[var(--navbar-height)] items-center justify-between md:justify-start md:gap-4">
          <div className="flex items-center justify-start">
            <Logo />
          </div>
          <div className="ml-auto flex h-full items-center gap-2">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <IconButton variant="tertiary" className="gap-2">
                  <Icon name="plus" />
                </IconButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => router.push("/submit/question")}>
                  <div className="flex gap-2">
                    <Badge variant="quiz">
                      <Icon name="code" size="sm" />
                    </Badge>
                    <div className="flex flex-col gap-1">
                      <div>Question</div>
                      <p className="text-xs text-[var(--color-fg-neutral-subtle)]">
                        Challenges that tests codig skills
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => router.push("/submit/quiz")}>
                  <div className="flex gap-2">
                    <Badge variant="question">
                      <Icon name="file-text" size="sm" />
                    </Badge>
                    <div className="flex flex-col gap-1">
                      <div>Quiz</div>
                      <p className="text-xs text-[var(--color-fg-neutral-subtle)]">Challenges that tests concepts</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Separator orientation="vertical" className="mx-2" />
            <DropdownMenu modal={false}>
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
