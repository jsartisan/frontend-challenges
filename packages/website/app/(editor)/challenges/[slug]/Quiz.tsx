"use client";

import dynamic from "next/dynamic";
import type { Challenge, Quiz } from "@/shared";

import { Solution } from "../../../../components/interfaces/challenges/Solution";
import { Card } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import Description from "~/components/interfaces/challenges/Description";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui";

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

type QuizChallengeProps = {
  challenge: Quiz;
  challenges: Challenge[];
};

export function Quiz(props: QuizChallengeProps) {
  const { challenge, challenges } = props;

  return (
    <>
      <div className="h-[calc(100vh_-_var(--nav-top-offset))]">
        <div className="flex h-full w-full flex-col gap-4 p-4">
          <div className="relative flex w-full justify-between">
            <Breadcrumb challenge={challenge} challenges={challenges} />
            <div className="flex items-center gap-2">
              <MarkCompleteButton challenge={challenge} />
            </div>
          </div>
          <div className="grid min-h-0 w-full flex-grow grid-cols-1 grid-rows-2 gap-3 sm:grid-cols-2 sm:grid-rows-1">
            <Card className="min-h flex flex-col overflow-hidden">
              <Tabs defaultValue="description" className="h-full">
                <TabsList>
                  <TabsTrigger value="description">Description</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="overflow-y-auto">
                  <Description challenge={challenge} />
                </TabsContent>
              </Tabs>
            </Card>
            <Solution solution={(challenge as Quiz).solution["en"]} />
          </div>
        </div>
      </div>
    </>
  );
}
