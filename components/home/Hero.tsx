import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { REPO } from "@/constants";
import Link from "next/link";
import { Icon } from "../ui";

export function Hero() {
  return (
    <div className="flex flex-col gap-4 pt-12">
      <a href={REPO} target="_blank" className="flex items-center justify-center md:justify-start" rel="noreferrer">
        <div className="inline-flex h-8 items-center rounded-md border border-dashed border-[var(--color-border-accent-subtle)] bg-opacity-20 px-2 py-1 text-sm">
          <span className="font-semibold text-[var(--color-fg-accent-strong)]">We&apos;re Open Source</span>
          <Separator
            orientation="vertical"
            className="mx-2 border-l border-dashed border-[var(--color-border-accent-subtle)] bg-transparent"
          />
          Star us on GitHub
        </div>
      </a>
      <div className="text-3xl font-bold sm:text-5xl">Level up your frontend</div>
      <div className="w-3/4 leading-relaxed text-gray-500">
        FrontendChallenges is a collection of frontend interview questions and answers. It is designed to help you prepare for
        frontend interviews. It&apos;s free and open source.
      </div>
      <div className="mt-2 flex gap-3">
        <Button asChild variant="primary">
          <Link href="/questions">Get Started</Link>
        </Button>
        <Button asChild variant="secondary" className="flex gap-2">
          <a href={REPO} target="_blank" rel="noreferrer">
            <Icon name="github" /> Github
          </a>
        </Button>
      </div>
    </div>
  );
}
