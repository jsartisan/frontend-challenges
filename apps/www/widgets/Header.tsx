import { use } from "react";
import dynamic from "next/dynamic";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { Logo } from "~/shared/ui/Logo";
import { REPO } from "~/shared/config/paths";
import UserNav from "~/features/auth/ui/UserNav";
import { Skeleton } from "~/components/ui/skeleton";
import { DropdownMenuArrow } from "~/components/ui/dropdown-menu";
import { getChallenges } from "~/entities/challenge/api/getChallenges";
import { Button, Icon, IconButton, Link, Separator } from "~/components/ui";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";

const SpotLight = dynamic(() => import("~/widgets/Spotlight").then((mod) => mod.Spotlight), {
  loading: () => <Skeleton className="hidden h-8 w-20 md:flex" />,
});

const CompletionStats = dynamic(() => import("~/features/header-completion-stats/ui/CompletionStats"), {
  loading: () => <Skeleton className="size-8" />,
});

export function Header() {
  const challenges = use(getChallenges());

  return (
    <>
      <div className="border-border bg-background sticky top-0 z-30 w-full border-b bg-opacity-5 backdrop-blur-md transition-[background-color]">
        <div className="mx-auto px-4">
          <div className="h-(--navbar-height) flex items-center justify-between md:justify-start md:gap-4">
            <div className="flex flex-grow items-center justify-start gap-3">
              <Logo />
              <SpotLight items={challenges} />
              <div className="hidden items-center gap-4 md:flex">
                <Link href="/challenges" className="font-medium">
                  Challenges
                </Link>
                <Link href="/roadmaps" className="font-medium">
                  Roadmaps
                </Link>
                <Link href="/play" className="font-medium">
                  Playground
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="tertiary" size="sm" className="text-md -ms-1 py-0 font-medium">
                      Submit
                      <Icon name="caret-down" className="-me-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuArrow />
                    <DropdownMenuItem asChild className="flex-col items-start">
                      <Link href={`/submit/question`} className="block">
                        <div>Question</div>
                        <div className="text-muted-foreground/60 text-xs">
                          Question are the challenges that require coding.
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="flex-col items-start">
                      <Link href={`/submit/quiz`} className="block">
                        <div>Quiz</div>
                        <div className="text-muted-foreground/60 text-xs">
                          Quiz tests the concepts but don't require coding.
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="flex-col items-start">
                      <Link href={`/submit/theory`} className="block">
                        <div>Theory</div>
                        <div className="text-muted-foreground/60 text-xs">
                          Theory challenge are just one-liner questions.
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="ms-auto flex h-full items-center gap-3">
              <CompletionStats challenges={challenges} />
              <UserNav />
              <Separator orientation="vertical" className="mx-1 hidden md:flex" />
              <IconButton asChild variant="tertiary">
                <a href={REPO} target="_blank" rel="noreferrer">
                  <GitHubLogoIcon />
                </a>
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
