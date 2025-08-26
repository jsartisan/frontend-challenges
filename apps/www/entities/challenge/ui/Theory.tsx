"use client";

import dynamic from "next/dynamic";

import type { Theory as TheoryType } from "~/entities/challenge/model/types";

import { Footer } from "~/widgets/Footer";
import { Skeleton } from "~/components/ui/skeleton";
import { Badge, BadgeProps } from "~/components/ui";
import { Solution } from "~/entities/challenge/ui/Solution";
import { EditChallengeDropdown } from "~/entities/challenge/ui/EditChallengeDropdown";

const MarkCompleteButton = dynamic(
  () => import("~/entities/completions/ui/MarkCompleteButton").then((mod) => mod.MarkCompleteButton),
  {
    ssr: false,
    loading: () => <Skeleton className="h-8 w-20" />,
  },
);

const Breadcrumb = dynamic(() => import("~/screens/challenge/ui/Breadcrumb").then((mod) => mod.Breadcrumb), {
  ssr: false,
  loading: () => <Skeleton className="h-8 w-28" />,
});

type TheoryChallengeProps = {
  challenge: TheoryType;
};

export function Theory(props: TheoryChallengeProps) {
  const { challenge } = props;

  return (
    <>
      <main className="h-full grow">
        <div className="max-w-(--breakpoint-xl) mx-auto px-4 py-4 sm:px-6 md:py-6">
          <div className="flex h-full w-full flex-col gap-4">
            <div className="relative flex w-full justify-between">
              <Breadcrumb challenge={challenge} />
              <div className="flex items-center gap-2">
                <MarkCompleteButton challenge={challenge} />
              </div>
            </div>

            <header className="flex h-7 items-center gap-3">
              <h1 className="flex items-center gap-2 text-2xl font-bold">
                <span className="text-(--color-fg-neutral-subtle)">#{challenge.no}</span> {challenge.info["en"]?.title}
              </h1>
              <div className="ms-auto flex gap-2">
                <EditChallengeDropdown challenge={challenge} />
              </div>
            </header>
            <div className="flex items-center gap-2">
              <aside className="me-1 flex items-center gap-2">
                <span className="block whitespace-nowrap text-xs">by</span>
                <a
                  href={`https://github.com/${challenge.info["en"]?.author?.github}`}
                  target="_blank"
                  className="flex items-center gap-1"
                  rel="noreferrer"
                >
                  <span className="inline-flex size-5 shrink-0 select-none items-center justify-center overflow-hidden rounded-full">
                    <img
                      alt={challenge.info["en"]?.author?.name}
                      className="size-full object-cover"
                      src={challenge.info["en"]?.author?.avatar_url}
                    />
                  </span>
                  <span className="block whitespace-nowrap text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    {challenge.info["en"]?.author?.name ?? challenge.info["en"]?.author?.github}
                  </span>
                </a>
              </aside>
              <Badge variant={challenge.difficulty as BadgeProps["variant"]}>{challenge.difficulty}</Badge>
              {challenge.info["en"]?.tags?.map((tag) => (
                <Badge variant="secondary" key={tag}>
                  {tag}
                </Badge>
              ))}
            </div>
            <Solution solution={challenge.readme["en"]} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
