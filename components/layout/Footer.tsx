import Link from "next/link";
import dynamic from "next/dynamic";
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

export default function Footer() {
  return (
    <div className="border-t border-[var(--color-border)] bg-background  py-4 sm:py-6">
      <div className="mx-auto flex max-w-screen-xl justify-between px-4 sm:px-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Logo isTextVisible />
            <span className="text-xs text-[var(--color-fg-subtle)]">by</span>
            <a
              className="rounded-md bg-[var(--color-bg-neutral)] px-2 py-0.5 text-xs font-medium text-[var(--color-fg)]"
              href="https://twitter.com/pawankumar2901"
              target="_blank"
              rel="noopener noreferrer"
            >
              pawankumar2901
            </a>
          </div>
          <p className="flex flex-wrap justify-center gap-2 font-medium sm:gap-4">
            <Link
              className="text-[var(--color-fg-neutral-subtle)] hover:text-[var(--color-fg-neutral-subtle-hover)]"
              href="/challenges"
            >
              Challenges
            </Link>
            <Link
              className="text-[var(--color-fg-neutral-subtle)] hover:text-[var(--color-fg-neutral-subtle-hover)]"
              href="/play"
            >
              Playground
            </Link>
            <Link
              className="text-[var(--color-fg-neutral-subtle)] hover:text-[var(--color-fg-neutral-subtle-hover)]"
              href="/submit/question"
            >
              Submit
            </Link>
            <Link
              className="text-[var(--color-fg-neutral-subtle)] hover:text-[var(--color-fg-neutral-subtle-hover)]"
              href="/blog"
            >
              Blog
            </Link>
            <a
              className="text-[var(--color-fg-neutral-subtle)] hover:text-[var(--color-fg-neutral-subtle-hover)]"
              href="/blog/how-to-contribute"
            >
              Contribute
            </a>
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <ThemeChanger />
          </div>
          <p className="text-gray-400">&copy; 2024 FrontendChallenges. All rights reserved </p>
        </div>
      </div>
    </div>
  );
}
