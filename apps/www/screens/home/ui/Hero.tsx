import { REPO } from "~/shared/config/paths";
import { Icon, Separator, LinkButton } from "~/components/ui";

import { HeroImage } from "./HeroImage";

export function Hero() {
  return (
    <div className="flex flex-col items-center gap-4 py-4 text-center md:items-start md:py-6 md:pb-12 md:pt-16 md:text-start">
      <a href={REPO} target="_blank" rel="noreferrer" className="rounded">
        <div className="border-ring/50 inline-flex h-8 items-center rounded-md border border-dashed bg-opacity-20 px-2 py-1 text-sm">
          <span className="text-primary font-semibold">We&apos;re Open Source</span>
          <Separator orientation="vertical" className="border-ring/50 mx-2 border-l border-dashed bg-transparent" />
          Star us on GitHub
        </div>
      </a>
      <div className="flex">
        <div className="z-10 flex w-full flex-col gap-4 md:w-7/12">
          <div className="text-2xl font-bold md:text-4xl">Your Playground for Frontend Mastery.</div>
          <div className="text-muted-foreground leading-relaxed">
            FrontendChallenges is a collection of frontend interview questions and answers. It is designed to help you
            prepare for frontend interviews. It&apos;s free and open source.
          </div>
          <div className="mt-2 flex justify-center gap-3 md:justify-start">
            <LinkButton size="lg" variant="primary" href="/challenges">
              Get Started
            </LinkButton>
            <LinkButton
              size="lg"
              variant="secondary"
              className="flex gap-2"
              href={REPO}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="github" /> Github
            </LinkButton>
          </div>
        </div>
        <HeroImage />
      </div>
    </div>
  );
}
