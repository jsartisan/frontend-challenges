import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { DISCORD, REPO } from "@/constants";

export function Community() {
  return (
    <div className="border-b border-t border-[var(--color-border)] bg-[var(--color-bg)] py-6 text-left sm:py-16 sm:text-center">
      <div className="container !max-w-[600px]">
        <p className="text-2xl font-bold sm:text-5xl">Community</p>{" "}
        <p className="my-2.5 text-sm leading-relaxed text-gray-600 sm:my-5 sm:text-lg">
          frontend-challenges.com is an{" "}
          <a
            href={REPO}
            target="_blank"
            className="font-medium text-gray-600 underline underline-offset-2 hover:text-black"
            rel="noreferrer"
          >
            open source project on GitHub{" "}
          </a>
          and is created by the community for the community.
        </p>
        <div className="mb-1.5 flex flex-col justify-start gap-2 sm:mb-0 sm:flex-row sm:justify-center sm:gap-3">
          <Button asChild variant="secondary">
            <a href={REPO} target="_blank" rel="noreferrer">
              <GitHubLogoIcon />
              <span className="ml-2 hover:block">Give us a star on Github</span>
            </a>
          </Button>
          <Button asChild variant="discord">
            <a href={DISCORD} target="_blank" rel="noreferrer">
              <DiscordLogoIcon />
              <span className="ml-2">Join us on Discord</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
