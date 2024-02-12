"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui";
import { getSubmitChallengeURL } from "@/utils/questions";

import { Description } from "../question/Description";
import { Step1Fields } from "../question/Step1Fields";
import { Step1Header } from "./Step1Header";
import { formSchema } from "../question/client";

const DEFAULT_README = `Describe the question here. Markdown is supported.

You can use code blocks as well:

\`\`\`js
console.log("Hello World!");
\`\`\`
`;

export default function Client() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "Title of the question",
      tags: "css, html, javascript",
      readme: DEFAULT_README,
      difficulty: "easy",
      type: "quiz",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values });
    window.open(getSubmitChallengeURL(values), "_blank")?.focus();
  }

  form.watch(["title", "readme", "difficulty"]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-[calc(100vh_-_var(--nav-top-offset))] flex-col p-4"
      >
        <Step1Header />
        <div className="mt-6 grid h-full flex-grow grid-cols-2 grid-rows-1 gap-6">
          <Step1Fields form={form} />
          <Description form={form} />
        </div>
      </form>
    </Form>
  );
}
