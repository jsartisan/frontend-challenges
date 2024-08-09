import { REPO } from "@frontend-challenges/shared";

import { Icon, Link } from "../ui";
import { HeroImage } from "./HeroImage";
import { Separator } from "../ui/separator";
import { Button } from "../../components/ui/button";

export function Hero() {
  return (
    <div className="flex flex-col items-center gap-4 py-12 text-center md:items-start md:py-16 md:text-start">
      <a href={REPO} target="_blank" rel="noreferrer" className="rounded">
        <div className="inline-flex h-8 items-center rounded-md border border-dashed border-[var(--color-bd-accent-subtle)] bg-opacity-20 px-2 py-1 text-sm">
          <span className="font-semibold text-[var(--color-fg-accent-strong)]">We&apos;re Open Source</span>
          <Separator
            orientation="vertical"
            className="mx-2 border-l border-dashed border-[var(--color-bd-accent-subtle)] bg-transparent"
          />
          Star us on GitHub
        </div>
      </a>
      <div className="flex">
        <div className="z-10 flex w-full flex-col gap-4 md:w-6/12">
          <div className="text-3xl font-bold md:text-5xl">Frontend Challenges</div>
          <div className="leading-relaxed text-[var(--color-fg-subtle)]">
            FrontendChallenges is a collection of frontend interview questions and answers. It is designed to help you
            prepare for frontend interviews. It&apos;s free and open source.
          </div>
          <div className="mt-2 flex justify-center gap-3 md:justify-start">
            <Button size="lg" asChild variant="primary">
              <Link href="/challenges">Get Started</Link>
            </Button>
            <Button size="lg" asChild variant="secondary" className="flex gap-2">
              <a href={REPO} target="_blank" rel="noreferrer">
                <Icon name="github" /> Github
              </a>
            </Button>
          </div>
        </div>
        <HeroImage />
      </div>
    </div>
  );
}
