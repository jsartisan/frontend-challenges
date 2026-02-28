"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "~/components/ui/form";
import { Tabs, TabsContent } from "~/components/ui/tabs";
import { formSchema } from "~/features/submission-quiz/model/formSchema";
import { AnswerFields } from "~/features/submission-quiz/ui/AnswerFields";
import { AnswerHeader } from "~/features/submission-quiz/ui/AnswerHeader";
import { Description } from "~/features/submission-question/ui/Description";
import { DescriptionHeader } from "~/features/submission-question/ui/DescriptionHeader";
import { DescriptionFields } from "~/features/submission-question/ui/DescriptionFields";
import { generateSubmitChallengeURL } from "~/features/submission-question/lib/generateSubmitChallengeURL";
// import { Step2Header } from "../question/Step2Header";

const DEFAULT_README = `Describe the question here. Markdown is supported.

You can use code blocks as well:

\`\`\`js
console.log("Hello World!");
\`\`\`
`;

export function SubmitQuizPage() {
  const [tab, setActiveTab] = useState("description");
  const activeTab = tab || "description";
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "Title of the question",
      tags: "css, html, javascript",
      readme: DEFAULT_README,
      difficulty: "easy",
      type: "quiz",
      answer: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    window.open(generateSubmitChallengeURL(values))?.focus();
  }

  form.watch(["title", "readme", "difficulty", "answer"]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-[calc(100vh-var(--nav-top-offset))] p-4 text-sm">
        <Tabs className="h-full w-full p-0" selectedKey={activeTab || "description"} onSelectionChange={(key) => setActiveTab(String(key))}>
          <TabsContent id="description" className="h-full flex-col p-0 [&:not([hidden])]:flex">
            <DescriptionHeader form={form} setActiveTab={setActiveTab} />
            <div className="mt-6 grid grow grid-cols-2 grid-rows-1 gap-6">
              <DescriptionFields form={form} />
              <Description form={form} />
            </div>
          </TabsContent>
          <TabsContent id="code" className="h-full w-full flex-col p-0 px-0 [&:not([hidden])]:flex">
            <AnswerHeader setActiveTab={setActiveTab} />
            <AnswerFields form={form} />
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
}
