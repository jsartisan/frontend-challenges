import dynamic from "next/dynamic";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { Logo } from "~/shared/ui/Logo";
import { REPO } from "~/shared/config/paths";
import UserNav from "~/features/auth/ui/UserNav";
import { Skeleton } from "~/components/ui/skeleton";
import { Icon, IconButton, Link, Separator } from "~/components/ui";
import { getChallenges } from "~/entities/challenge/api/getChallenges";

const SpotLight = dynamic(() => import("~/widgets/Spotlight").then((mod) => mod.Spotlight), {
  ssr: false,
  loading: () => <Skeleton className="hidden h-8 w-20 md:flex" />,
});

const CompletionStats = dynamic(() => import("~/features/header-completion-stats/ui/CompletionStats"), {
  ssr: false,
  loading: () => <Skeleton className="size-8" />,
});

export async function Header() {
  const challenges = await getChallenges();

  return (
    <>
      <div className="border-(--color-bd) bg-(--color-bg) sticky top-0 z-30 w-full border-b bg-opacity-5 backdrop-blur-md transition-[background-color]">
        <div className="mx-auto px-4">
          <div className="h-(--navbar-height) flex items-center justify-between md:justify-start md:gap-4">
            <div className="flex items-center justify-start gap-3">
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
                <Link
                  href="https://github.com/jsartisan/frontend-challenges/issues/new?assignees=jsartisan&labels=feedback&template=feedback.md&title=%5BFeedback%5D%3A+..."
                  target="_blank"
                  className="flex items-center gap-1 font-medium"
                >
                  Feedback
                  <Icon name="external-link" size="sm" className="text-(--color-fg-neutral-subtle)" />
                </Link>
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
