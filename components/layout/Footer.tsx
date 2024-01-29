"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-col items-center gap-4 bg-[var(--color-bg-secondary)] py-4 text-white sm:py-6">
      <Link
        className="inline-flex items-center text-neutral-900 transition-colors dark:text-neutral-100"
        aria-label="Go to the homepage"
        href="/"
      >
        <img src="/images/logo.svg" style={{ height: "20px" }} />
        <div className={`font-nunito ml-3 hidden text-lg font-semibold text-gray-700 md:block`}>
          Frontend<span className="text-[color:var(--color-text-brand)]">Easy</span>
        </div>
      </Link>
      <p className="flex flex-col justify-center gap-0 font-medium text-gray-500 sm:flex-row sm:gap-4">
        <a className="" href="/questions">
          Questions
        </a>
        <Link className="" href="/play">
          Playground
        </Link>
        <Link className="" href="/submit">
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
