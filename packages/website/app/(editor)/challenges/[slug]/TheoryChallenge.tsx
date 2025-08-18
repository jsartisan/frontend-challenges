"use client";

import dynamic from "next/dynamic";
import type { Theory } from "@/shared";

import { Solution } from "../../../../components/interfaces/challenges/Solution";
import { Skeleton } from "~/components/ui/skeleton";
import { Badge, BadgeProps } from "~/components/ui";
import EditDropdown from "~/components/editor/EditDropdown";

const MarkCompleteButton = dynamic(
  () => import("~/components/interfaces/challenges/MarkCompleteButton").then((mod) => mod.MarkCompleteButton),
  {
    ssr: false,
    loading: () => <Skeleton className="h-8 w-20" />,
  },
);

const Breadcrumb = dynamic(
  () => import("~/components/interfaces/challenges/Breadcrumb").then((mod) => mod.Breadcrumb),
  {
    ssr: false,
    loading: () => <Skeleton className="h-8 w-28" />,
  },
);

type TheoryChallengeProps = {
  challenge: Theory;
};

export function TheoryChallenge(props: TheoryChallengeProps) {
  const { challenge } = props;

  return (
    <>
      <main className="h-full grow">
        <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 md:py-6">
          <div className="flex h-full w-full flex-col gap-4">
            <div className="relative flex w-full justify-between">
              <Breadcrumb challenge={challenge} />
              <div className="flex items-center gap-2">
                <MarkCompleteButton challenge={challenge} />
              </div>
            </div>

            <header className="flex h-7 items-center gap-3">
              <h1 className="flex items-center gap-2 text-2xl font-bold">
                <span className="text-[var(--color-fg-neutral-subtle)]">#{challenge.no}</span>{" "}
                {challenge.info["en"]?.title}
              </h1>
              <div className="ms-auto flex gap-2">
                <EditDropdown challenge={challenge} />
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
            <Solution solution={(challenge as Theory).readme["en"]} />
          </div>
        </div>
      </main>
    </>
  );
}
