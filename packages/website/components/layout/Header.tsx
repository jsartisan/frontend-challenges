import dynamic from "next/dynamic";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { REPO } from "@/shared";
import { Logo } from "~/components/common/Logo";
import UserNav from "~/components/interfaces/auth/UserNav";
import { Skeleton } from "~/components/ui/skeleton";
import { getChallenges } from "@frontend-challenges/backend";
import { Icon, IconButton, Link, Separator } from "~/components/ui";

const SpotLight = dynamic(() => import("../../components/common/Spotlight"), {
  ssr: false,
  loading: () => <Skeleton className="hidden h-8 w-20 md:flex" />,
});

const CompletionStats = dynamic(() => import("../common/CompletionStats"), {
  ssr: false,
  loading: () => <Skeleton className="size-8" />,
});

export async function Header() {
  const challenges = await getChallenges();
  const challengesSlim = challenges.map((challenge) => ({
    no: challenge.no,
    path: challenge.path,
    title: challenge.info.en?.title ?? "",
    difficulty: challenge.difficulty,
  }));

  return (
    <>
      <div className="sticky top-0 z-30 w-full border-b border-[var(--color-bd)] bg-[var(--color-bg)] bg-opacity-5 backdrop-blur-md transition-[background-color]">
        <div className="mx-auto px-4">
          <div className="flex h-[var(--navbar-height)] items-center justify-between md:justify-start md:gap-4">
            <div className="flex items-center justify-start gap-3">
              <Logo />
              <SpotLight items={challengesSlim} />
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
                  <Icon name="external-link" size="sm" className="text-[var(--color-fg-neutral-subtle)]" />
                </Link>
              </div>
            </div>
            <div className="ms-auto flex h-full items-center gap-3">
              <CompletionStats challenges={challengesSlim} />
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
