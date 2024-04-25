"use client";

import type { Quiz } from "@/types";
import { Card } from "@/components/ui/card";
import { getShareAnswerURL } from "@/utils/url";
import Description from "@/components/editor/Description";
import { AnswerList } from "@/components/quizzes/AnswerList";
import { Tabs, TabsContent, TabsList, TabsTrigger, Button } from "@/components/ui";

import { Solution } from "./Solution";
import { Breadcrumb } from "./Breadcrumb";

export function Quiz(props: { quiz: Quiz }) {
  const { quiz } = props;

  const onShareSolution = () => {
    const URL = getShareAnswerURL({ challenge: quiz });

    if (URL !== "") {
      window.open(URL, "_blank")?.focus();
    }
  };

  return (
    <>
      <div className="h-[calc(100vh_-_var(--nav-top-offset))]">
        <div className="flex h-full w-full flex-col gap-4 p-4">
          <div className="relative flex w-full justify-between">
            <Breadcrumb challenge={quiz} />
            <div className="flex items-center gap-4">
              <Button variant="secondary" onClick={onShareSolution}>
                Share Solution
              </Button>
            </div>
          </div>
          <div className="grid min-h-0 w-full flex-grow grid-cols-1 grid-rows-2 gap-3 sm:grid-cols-2 sm:grid-rows-1">
            <Card className="min-h flex flex-col overflow-hidden">
              <Tabs defaultValue="description" className="h-full">
                <TabsList>
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="solutions">Submissions</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="overflow-y-auto">
                  <Description challenge={quiz} />
                </TabsContent>
                <TabsContent value="solutions">
                  <AnswerList challenge={quiz} />
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
