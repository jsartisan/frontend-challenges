"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Step2Fields } from "./Step2Fields";
import { Step2Header } from "./Step2Header";
import { formSchema } from "../question/client";
import { Description } from "../question/Description";
import { Step1Fields } from "../question/Step1Fields";
import { Step1Header } from "../question/Step1Header";
import { getSubmitChallengeURL } from "~/utils/challenges";
import { Tabs, TabsContent, Form } from "~/components/ui";
// import { Step2Header } from "../question/Step2Header";

const DEFAULT_README = `Describe the question here. Markdown is supported.

You can use code blocks as well:

\`\`\`js
console.log("Hello World!");
\`\`\`
`;

export default function Client() {
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
    window.open(getSubmitChallengeURL(values))?.focus();
  }

  form.watch(["title", "readme", "difficulty", "answer"]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-[calc(100vh-var(--nav-top-offset))] p-4 text-sm">
        <Tabs className="h-full w-full p-0 " value={activeTab || "description"} onValueChange={setActiveTab}>
          <TabsContent value="description" className="h-full flex-col p-0 [&:not([hidden])]:flex">
            <Step1Header form={form} setActiveTab={setActiveTab} />
            <div className="mt-6 grid grow grid-cols-2 grid-rows-1 gap-6">
              <Step1Fields form={form} />
              <Description form={form} />
            </div>
          </TabsContent>
          <TabsContent value="code" className="h-full w-full flex-col p-0 px-0 [&:not([hidden])]:flex">
            <Step2Header setActiveTab={setActiveTab} />
            <Step2Fields form={form} />
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
}
