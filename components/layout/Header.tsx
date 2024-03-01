import { REPO } from "@/constants";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { IconButton } from "../ui";
import { Logo } from "../common/Logo";
import { Separator } from "../ui/separator";
import { ThemeChanger } from "../common/ThemeChanger";
import { SubmissionNavigator } from "../common/SubmissionNavigator";

export function Header() {
  return (
    <div className="sticky top-0 z-30 w-full border-b border-[var(--color-border)] bg-[var(--color-bg)] bg-opacity-5 backdrop-blur-md transition-[background-color]">
      <div className="mx-auto px-4 sm:px-6">
        <div className="flex h-[var(--navbar-height)] items-center justify-between md:justify-start md:gap-4">
          <div className="flex items-center justify-start">
            <Logo />
          </div>
          <div className="ms-auto flex h-full items-center gap-2">
            <SubmissionNavigator />
            <Separator orientation="vertical" className="mx-2" />
            <ThemeChanger />
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
