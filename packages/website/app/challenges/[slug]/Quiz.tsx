"use client";

import dynamic from "next/dynamic";
import type { Challenge, Quiz } from "@frontend-challenges/shared";
import { DEFAULT_LOCALE } from "@frontend-challenges/shared";

import { Solution } from "./Solution";
// import { Breadcrumb } from "./ChallengesNavigator";
import { Card } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";
import Description from "../../../components/editor/Description";
import { Tabs, TabsContent, TabsList, TabsTrigger, Button, Icon } from "../../../components/ui";

const MarkCompleteButton = dynamic(() => import("../../../components/editor/MarkCompleteButton"), {
  ssr: false,
  loading: () => <Skeleton className="h-8 w-20" />,
});

const Breadcrumb = dynamic(() => import("./Breadcrumb"), {
  ssr: false,
  loading: () => <Skeleton className="h-8 w-28" />,
});

type QuizProps = {
  challenge: Challenge;
  challenges: Challenge[];
};

export function Quiz(props: QuizProps) {
  const { challenge, challenges } = props;

  return (
    <>
      <div className="h-[calc(100vh_-_var(--nav-top-offset))]">
        <div className="flex h-full w-full flex-col gap-4 p-4">
          <div className="relative flex w-full justify-between">
            <Breadcrumb challenges={challenges} currentChallenge={challenge} />
            <div className="flex items-center gap-2">
              <MarkCompleteButton challenge={challenge} />
            </div>
          </div>
          <div className="grid min-h-0 w-full flex-grow grid-cols-1 grid-rows-2 gap-3 sm:grid-cols-2 sm:grid-rows-1">
            <Card className="min-h flex flex-col overflow-hidden">
              <Tabs defaultValue="description" className="h-full">
                <TabsList>
                  <TabsTrigger value="description">Description</TabsTrigger>
                  {challenge.info[DEFAULT_LOCALE]?.discussionNo && (
                    <Button variant="tertiary" size="sm" asChild>
                      <a href={challenge.discussionURL} target="_blank" rel="noopener noreferrer">
                        Discussion
                        <Icon name="external-link" />
                      </a>
                    </Button>
                  )}
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
