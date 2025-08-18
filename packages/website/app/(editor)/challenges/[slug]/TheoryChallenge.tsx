"use client";

import dynamic from "next/dynamic";
import type { Theory } from "@/shared";

import { Solution } from "../../../../components/interfaces/challenges/Solution";
import { Skeleton } from "~/components/ui/skeleton";

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
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 md:py-12">
          <div className="flex h-full w-full flex-col gap-4 p-4">
            <div className="relative flex w-full justify-between">
              <Breadcrumb challenge={challenge} />
              <div className="flex items-center gap-2">
                <MarkCompleteButton challenge={challenge} />
              </div>
            </div>
            <div className="grid min-h-0 w-full flex-grow grid-cols-1 grid-rows-2 gap-3 sm:grid-cols-2 sm:grid-rows-1">
              <Solution solution={(challenge as Theory).content} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
