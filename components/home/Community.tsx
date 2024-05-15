import { Button } from "../ui/button";
import { DISCUSSIONS, REPO } from "@/constants";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export function Community() {
  return (
    <div className="bg-[var(--color-bg-secondary)] py-20 text-left sm:text-center">
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
        <div className="mb-1.5 flex flex-col justify-start gap-3 sm:mb-0 sm:flex-row sm:justify-center">
          <Button asChild variant="secondary">
            <a href={REPO} target="_blank" rel="noreferrer">
              <GitHubLogoIcon />
              <span>Give us a star on Github</span>
            </a>
          </Button>
          <Button asChild variant="tertiary">
            <a href={DISCUSSIONS} target="_blank" rel="noreferrer">
              <GitHubLogoIcon />
              <span>Join us on Discussion</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
