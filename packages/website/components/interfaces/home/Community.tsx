import { DISCUSSIONS, REPO } from "@/shared";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { Button } from "~/components/ui";

export function Community() {
  return (
    <div className="bg-(--color-bg-secondary) py-12 text-left sm:text-center md:py-16">
      <div className="max-w-[600px]! container flex flex-col gap-4">
        <p className="flex h-[1cap] items-center justify-center text-2xl font-bold sm:text-5xl">Community</p>{" "}
        <p className="text-(--color-fg-subtle) text-center text-sm leading-relaxed sm:text-lg">
          frontend-challenges.com is an{" "}
          <a
            href={REPO}
            target="_blank"
            className="hover:text-(--color-fg) font-medium underline underline-offset-2"
            rel="noreferrer"
          >
            open source project on GitHub{" "}
          </a>
          and is created by the community for the community.
        </p>
        <div className="mt-2 flex flex-col justify-start gap-3 sm:flex-row sm:justify-center">
          <Button asChild variant="secondary">
            <a href={REPO} target="_blank" rel="noreferrer">
              <GitHubLogoIcon />
              <span>Give us a star on Github</span>
            </a>
          </Button>
          <Button asChild variant="secondary">
            <a href={DISCUSSIONS} target="_blank" rel="noreferrer">
              <GitHubLogoIcon />
              <span>Join us on Discussions</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
