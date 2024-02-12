"use client";

import Link from "next/link";
import { Logo } from "../common/Logo";

export default function Footer() {
  return (
    <div className="flex flex-col items-center gap-4 bg-[var(--color-bg-secondary)] py-4 text-white sm:py-6">
      <Logo />
      <p className="flex flex-col justify-center gap-0 font-medium text-gray-500 sm:flex-row sm:gap-4">
        <a className="" href="/questions">
          Questions
        </a>
        <Link className="" href="/play">
          Playground
        </Link>
        <Link className="" href="/submit/question">
          Submit
        </Link>
        <Link className="" href="/blog">
          Blog
        </Link>
        <a className="" href="/blog/how-to-contribute">
          Contribute
        </a>
      </p>
      <p className="text-gray-400">&copy; 2023 FrontendEasy. All rights reserved </p>
    </div>
  );
}
