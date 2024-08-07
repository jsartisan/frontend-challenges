"use client";

import dynamic from "next/dynamic";
import type { Quiz } from "@frontend-challenges/shared";
import { DEFAULT_LOCALE } from "@frontend-challenges/shared";

import { Solution } from "./Solution";
import { Breadcrumb } from "./Breadcrumb";
import { Card } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";
import Description from "../../../components/editor/Description";
import { Tabs, TabsContent, TabsList, TabsTrigger, Button, Icon } from "../../../components/ui";

const MarkCompleteButton = dynamic(() => import("../../../components/editor/MarkCompleteButton"), {
  ssr: false,
  loading: () => <Skeleton className="h-8 w-20" />,
});

export function Quiz(props: { quiz: Quiz }) {
  const { quiz } = props;

  return (
    <>
      <div className="h-[calc(100vh_-_var(--nav-top-offset))]">
        <div className="flex h-full w-full flex-col gap-4 p-4">
          <div className="relative flex w-full justify-between">
            <Breadcrumb challenge={quiz} />
            <div className="flex items-center gap-2">
              <MarkCompleteButton challenge={quiz} />
            </div>
          </div>
          <div className="grid min-h-0 w-full flex-grow grid-cols-1 grid-rows-2 gap-3 sm:grid-cols-2 sm:grid-rows-1">
            <Card className="min-h flex flex-col overflow-hidden">
              <Tabs defaultValue="description" className="h-full">
                <TabsList>
                  <TabsTrigger value="description">Description</TabsTrigger>
                  {quiz.info[DEFAULT_LOCALE]?.discussionNo && (
                    <Button variant="tertiary" size="sm" asChild>
                      <a href={quiz.discussionURL} target="_blank" rel="noopener noreferrer">
                        Discussion
                        <Icon name="external-link" />
                      </a>
                    </Button>
                  )}
                </TabsList>
                <TabsContent value="description" className="overflow-y-auto">
                  <Description challenge={quiz} />
                </TabsContent>
              </Tabs>
            </Card>
            <Solution solution={quiz.solution["en"]} />
          </div>
        </div>
      </div>
    </>
  );
}
