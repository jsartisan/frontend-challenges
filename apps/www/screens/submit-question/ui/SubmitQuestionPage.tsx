"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { SupportedTemplates } from "~/entities/challenge/model/types";

import { Form } from "~/components/ui/form";
import { Tabs, TabsContent } from "~/components/ui/tabs";
import { TEMPLATES } from "~/entities/challenge/model/templates";
import { SandpackRoot } from "~/features/code-editor/ui/SandpackRoot";
import { CodeHeader } from "~/features/submission-question/ui/CodeHeader";
import { CodeFields } from "~/features/submission-question/ui/CodeFields";
import { Description } from "~/features/submission-question/ui/Description";
import { formSchema } from "~/features/submission-question/model/formSchema";
import { DescriptionHeader } from "~/features/submission-question/ui/DescriptionHeader";
import { DescriptionFields } from "~/features/submission-question/ui/DescriptionFields";

export type FormValues = z.infer<typeof formSchema>;

const DEFAULT_README = `Describe the question here. Markdown is supported.

You can use code blocks as well:

\`\`\`js
console.log("Hello World!");
\`\`\`
`;

export function SubmitQuestionPage() {
  const [tab, setActiveTab] = useState("description");
  const activeTab = tab || "description";
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "Title of the question",
      template: "vanilla",
      tags: "css, html, javascript",
      readme: DEFAULT_README,
      difficulty: "easy",
      type: "question",
      files: TEMPLATES["vanilla"].files,
    },
  });

  form.watch(["template", "title", "readme", "difficulty"]);

  return (
    <Form {...form}>
      <SandpackRoot
        files={form.getValues().files}
        template={form.getValues().template as SupportedTemplates}
        path="/challenges/new"
      >
        <form
          className="h-full p-4"
          onSubmit={() => {
            //
          }}
        >
          <Tabs className="h-full w-full p-0" selectedKey={activeTab || "description"} onSelectionChange={(key) => setActiveTab(String(key))}>
            <TabsContent id="description" className="h-full flex-col border-none p-0 [&:not([hidden])]:flex">
              <DescriptionHeader form={form} setActiveTab={setActiveTab} />
              <div className="mt-6 grid grow grid-cols-2 grid-rows-1 gap-6">
                <DescriptionFields form={form} />
                <Description form={form} />
              </div>
            </TabsContent>
            <TabsContent id="code" className="h-full w-full flex-col border-none p-0 px-0 [&:not([hidden])]:flex">
              <CodeHeader setActiveTab={setActiveTab} form={form} />
              <CodeFields form={form} />
            </TabsContent>
          </Tabs>
        </form>
      </SandpackRoot>
    </Form>
  );
}
