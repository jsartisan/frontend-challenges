"use client";

import * as z from "zod";
import { Difficulty } from "@/types";
import { TEMPLATES } from "@/templates";
import { useForm } from "react-hook-form";
import { DIFFICULTY_RANK } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, Form } from "@/components/ui";
import SandpackRoot from "@/components/editor/SandpackRoot";

import { Description } from "./Description";
import { Step1Fields } from "./Step1Fields";
import { Step2Fields } from "./Step2Fields";
import { Step1Header } from "./Step1Header";
import { Step2Header } from "./Step2Header";
import { useState } from "react";

export const formSchema = z.object({
  title: z.string().min(2).max(50),
  template: z.string().optional(),
  readme: z.string(),
  tags: z.string(),
  files: z.any().optional(),
  type: z.enum(["question", "quiz"]),
  answer: z.string().optional(),
  difficulty: z.enum(DIFFICULTY_RANK as [Difficulty]),
});

export type FormValues = z.infer<typeof formSchema>;

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
      <SandpackRoot files={form.getValues().files}>
        <form className="h-full p-4">
          <Tabs className="h-full w-full p-0 " value={activeTab || "description"} onValueChange={setActiveTab}>
            <TabsContent value="description" className="h-full flex-col p-0 [&:not([hidden])]:flex">
              <Step1Header form={form} setActiveTab={setActiveTab} />
              <div className="mt-6 grid flex-grow grid-cols-2 grid-rows-1 gap-6">
                <Step1Fields form={form} />
                <Description form={form} />
              </div>
            </TabsContent>
            <TabsContent value="code" className="h-full w-full flex-col p-0 px-0 [&:not([hidden])]:flex">
              <Step2Header setActiveTab={setActiveTab} form={form} />
              <Step2Fields form={form} />
            </TabsContent>
          </Tabs>
        </form>
      </SandpackRoot>
    </Form>
  );
}
