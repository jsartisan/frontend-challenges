import dynamic from "next/dynamic";

import { Icon, Link } from "../ui";
import { Logo } from "../common/Logo";
import { Skeleton } from "../ui/skeleton";

const ThemeChanger = dynamic(() => import("../common/ThemeChanger"), {
  ssr: false,
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
    <div className="border-t border-[var(--color-bd)] bg-[var(--color-bg)] py-6">
      <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <Logo isTextVisible />
            <span className="text-xs text-[var(--color-fg-subtle)]">by</span>
            <a
              className="flex items-center gap-1 rounded-md bg-[var(--color-bg-neutral)] px-2 py-0.5 text-xs font-medium text-[var(--color-fg)]"
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
            <Link
              className="text-[var(--color-fg-subtle)] hover:text-[var(--color-fg-subtle-hover)]"
              href="/challenges"
            >
              Challenges
            </Link>
            <Link className="text-[var(--color-fg-subtle)] hover:text-[var(--color-fg-subtle-hover)]" href="/play">
              Playground
            </Link>
            <Link
              className="text-[var(--color-fg-subtle)] hover:text-[var(--color-fg-subtle-hover)]"
              href="/submit/question"
            >
              Submit
            </Link>
            <Link className="text-[var(--color-fg-subtle)] hover:text-[var(--color-fg-subtle-hover)]" href="/blog">
              Blog
            </Link>
            <Link
              className="text-[var(--color-fg-subtle)] hover:text-[var(--color-fg-subtle-hover)]"
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
          <p className="text-[var(--color-fg-neutral-subtle)]">&copy; 2025 FrontendChallenges. All rights reserved </p>
        </div>
      </div>
    </div>
  );
}
