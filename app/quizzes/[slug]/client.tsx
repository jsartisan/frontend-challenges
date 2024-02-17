"use client";

import { Card } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
} from "@/components/ui";
import * as z from "zod";
import Description from "@/components/editor/Description";
import { AnswerList } from "@/components/quizzes/AnswerList";
import Link from "next/link";
import { Quiz } from "@/types";
import { getShareAnswerURL } from "@/utils/url";
import { Solution } from "./Solution";

export const formSchema = z.object({
  answer: z.string(),
});

export type FormValues = z.infer<typeof formSchema>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Client(props: { quiz: Quiz }) {
  const { quiz } = props;

  return (
    <>
      <div className="h-[calc(100vh_-_var(--nav-top-offset))]">
        <div className="flex h-full w-full flex-col gap-4 p-4">
          <div className="relative flex w-full justify-between">
            <div className="flex items-center">
              <Breadcrumb separator="/">
                <BreadcrumbItem>
                  <BreadcrumbLink as={Link} href="/">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink as={Link} href="/quizzes">
                    Quizzes
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink href={`/quizzes/${quiz.path}`}>{quiz.info["en"]?.title}</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="secondary"
                onClick={() => {
                  const URL = getShareAnswerURL({ challenge: quiz });

                  if (URL !== "") {
                    window.open(URL, "_blank")?.focus();
                  }
                }}
              >
                Share Solution
              </Button>
            </div>
          </div>
          <div className="grid min-h-0 w-full flex-grow grid-cols-2 gap-3">
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
