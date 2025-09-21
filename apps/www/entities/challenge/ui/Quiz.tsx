"use client";

import dynamic from "next/dynamic";

import type { Quiz } from "~/entities/challenge/model/types";

import { Card } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { Solution } from "~/entities/challenge/ui/Solution";
import { Description } from "~/entities/challenge/ui/Description";
import { ResourceList } from "~/entities/resource/ui/ResourceList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui";

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

type QuizChallengeProps = {
  challenge: Quiz;
};

export function Quiz(props: QuizChallengeProps) {
  const { challenge } = props;

  return (
    <>
      <div className="h-[calc(100vh-var(--nav-top-offset))]">
        <div className="flex h-full w-full flex-col gap-4 p-4">
          <div className="relative flex w-full justify-between">
            <Breadcrumb challenge={challenge} />
            <div className="flex items-center gap-2">
              <MarkCompleteButton challenge={challenge} />
            </div>
          </div>
          <div className="grid min-h-0 w-full grow grid-cols-1 grid-rows-2 gap-3 sm:grid-cols-2 sm:grid-rows-1">
            <Card className="min-h flex flex-col overflow-hidden">
              <Tabs defaultValue="description" className="h-full">
                <TabsList>
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="overflow-y-auto">
                  <Description challenge={challenge} />
                </TabsContent>
                <TabsContent value="resources" className="overflow-y-auto">
                  <ResourceList challenge={challenge} />
                </TabsContent>
              </Tabs>
            </Card>
            <Solution
              solution={challenge.solution["en"]}
              right_answer={challenge.info["en"]?.right_answer}
              options={challenge.info["en"]?.options as string[]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
