import Link from "next/link";
import dynamic from "next/dynamic";
import { Logo } from "../common/Logo";

const ThemeChanger = dynamic(() => import("../common/ThemeChanger"), {
  ssr: false,
  loading: () => <>Loading...</>,

});

export default function Footer() {
  return (
    <div className="mt-10  border-t border-[var(--color-border)] bg-[var(--color-bg)]  py-4 sm:py-6">
      <div className="mx-auto flex max-w-screen-xl justify-between px-4 sm:px-6">
        <div className="flex flex-col gap-4">
          <Logo isTextVisible />
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
          <ThemeChanger />
          <p className="text-gray-400">&copy; 2024 FrontendChallenges. All rights reserved </p>
        </div>
      </div>
    </div>
  );
}
