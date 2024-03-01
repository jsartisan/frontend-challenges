import Link from "next/link";
import { Logo } from "../common/Logo";

export default function Footer() {
  return (
    <div className="flex flex-col items-center gap-4 bg-[var(--color-bg-secondary)] py-4 sm:py-6">
      <Logo />
      <p className="flex flex-wrap justify-center gap-2 px-4 font-medium sm:gap-4">
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
      <p className="text-gray-400">&copy; 2024 FrontendChallenges. All rights reserved </p>
    </div>
  );
}
