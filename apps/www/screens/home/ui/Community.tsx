import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { Button } from "~/components/ui";
import { REPO } from "~/shared/config/paths";

export function Community() {
  return (
    <div className="pb-8 pt-12 text-left sm:text-center md:pt-20">
      <div className="max-w-[600px]! container flex flex-col gap-4">
        <p className="box-trim flex items-center justify-center text-4xl font-bold sm:text-5xl">Community</p>{" "}
        <p className="text-muted-foreground text-center text-sm leading-relaxed sm:text-lg">
          frontend-challenges.com is an{" "}
          <a
            href={REPO}
            target="_blank"
            className="hover:text-foreground font-medium underline underline-offset-2"
            rel="noreferrer"
          >
            open source project on GitHub{" "}
          </a>
          and is created by the community for the community.
        </p>
        <div className="mt-2 flex justify-center gap-3">
          <Button asChild variant="secondary">
            <a href={REPO} target="_blank" rel="noreferrer">
              <GitHubLogoIcon />
              <span>Give us a star on Github</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
