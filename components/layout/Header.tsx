import { REPO } from "@/constants";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { IconButton, Separator } from "../ui";
import { Logo } from "../common/Logo";
import { SearchItem } from "@/types";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";
import { SubmissionNavigator } from "../common/SubmissionNavigator";
import Link from "next/link";

const SpotLight = dynamic(() => import("@/components/common/Spotlight"), {
  ssr: false,
  loading: () => <Skeleton className="hidden h-8 w-20 md:flex" />,
});

type HeaderProps = {
  challenges: SearchItem[];
};

export async function Header(props: HeaderProps) {
  const { challenges } = props;

  return (
    <>
      <div className="sticky top-0 z-30 w-full border-b border-[var(--color-bd)] bg-[var(--color-bg)] bg-opacity-5 backdrop-blur-md transition-[background-color]">
        <div className="mx-auto px-4">
          <div className="flex h-[var(--navbar-height)] items-center justify-between md:justify-start md:gap-4">
            <div className="flex items-center justify-start gap-3">
              <Logo />
              <SpotLight items={challenges} />
            </div>
            <div className="ms-auto flex h-full items-center gap-3">
              <div className="hidden items-center gap-4 md:flex">
                <Link href="/challenges" className="font-medium">
                  Challenges
                </Link>
                <Link href="/study-plans" className="font-medium">
                  Study Plans
                </Link>
                <Link href="/play" className="font-medium">
                  Playground
                </Link>
              </div>
              <Separator orientation="vertical" className="mx-3 hidden md:flex" />
              <SubmissionNavigator />
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
