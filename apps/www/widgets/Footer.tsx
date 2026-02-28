"use client";

import dynamic from "next/dynamic";

import { Logo } from "~/shared/ui/Logo";
import { Icon, Link } from "~/components/ui";
import { Skeleton } from "~/components/ui/skeleton";

const ThemeChanger = dynamic(() => import("~/widgets/ThemeChanger"), {
  loading: () => (
    <>
      <div className="flex h-8 gap-2">
        <Skeleton className="size-7" />
        <Skeleton className="size-7" />
        <Skeleton className="size-7" />
      </div>
    </>
  ),
});

export function Footer() {
  return (
    <div className="border-border bg-background border-t py-6">
      <div className="max-w-(--breakpoint-xl) mx-auto flex flex-col justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <Logo isTextVisible />
            <span className="text-muted-foreground text-xs">by</span>
            <a
              className="bg-muted text-foreground flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium"
              href="https://x.com/pawankumar2901"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="x" size="xs" />
              Pawan Kumar
            </a>{" "}
            /
            <a href="https://www.linkedin.com/in/pawan-kumar-93a0a1115/" target="_blank" rel="noopener noreferrer">
              <Icon name="linkedin" size="sm" />
            </a>
          </div>
          <p className="flex flex-wrap justify-center gap-3 font-medium sm:justify-start sm:gap-4">
            <Link className="text-muted-foreground hover:text-muted-foreground/80" href="/challenges">
              Challenges
            </Link>
            <Link className="text-muted-foreground hover:text-muted-foreground/80" href="/play">
              Playground
            </Link>
            <a
              className="text-muted-foreground hover:text-muted-foreground/80"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/jsartisan/frontend-challenges/issues/new?assignees=jsartisan&labels=feedback&template=feedback.md&title=%5BFeedback%5D%3A+..."
            >
              Feedback
            </a>
            <Link className="text-muted-foreground hover:text-muted-foreground/80" href="/blog">
              Blog
            </Link>
            <Link
              className="text-muted-foreground hover:text-muted-foreground/80"
              href="/blog/how-to-contribute"
            >
              Contribute
            </Link>
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 sm:items-end">
          <div className="flex items-center gap-2">
            <ThemeChanger />
          </div>
          <p className="text-muted-foreground/60">&copy; 2025 FrontendChallenges. All rights reserved </p>
        </div>
      </div>
    </div>
  );
}
