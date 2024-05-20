import { REPO } from "@/constants";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { IconButton } from "../ui";
import { Logo } from "../common/Logo";
import { SearchItem } from "@/types";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";

const SpotLight = dynamic(() => import("@/components/common/Spotlight"), {
  ssr: false,
  loading: () => <Skeleton className="h-8 w-20" />,
});

type HeaderProps = {
  challenges: SearchItem[];
};

export async function Header(props: HeaderProps) {
  const { challenges } = props;

  return (
    <>
      <div className="sticky top-0 z-30 w-full border-b border-[var(--color-border)] bg-[var(--color-bg)] bg-opacity-5 backdrop-blur-md transition-[background-color]">
        <div className="mx-auto px-4">
          <div className="flex h-[var(--navbar-height)] items-center justify-between md:justify-start md:gap-4">
            <div className="flex items-center justify-start gap-3">
              <Logo />
              <SpotLight items={challenges} />
            </div>
            <div className="ms-auto flex h-full items-center gap-3">
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
