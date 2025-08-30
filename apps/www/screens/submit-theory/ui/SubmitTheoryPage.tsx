"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "~/components/ui";
import { FormHeader } from "~/features/submission-theory/ui/FormHeader";
import { FormFields } from "~/features/submission-theory/ui/FormFields";
import { formSchema } from "~/features/submission-theory/model/formSchema";
import { generateSubmitChallengeURL } from "~/features/submission-question/lib/generateSubmitChallengeURL";

export function SubmitTheoryPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "Title of the question",
      tags: "css, html, javascript",
      difficulty: "easy",
      type: "theory",
      answer: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    window.open(generateSubmitChallengeURL(values))?.focus();
  }

  form.watch(["title", "answer"]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-[calc(100vh-var(--nav-top-offset))] flex-col p-4 text-sm"
      >
        <FormHeader />
        <FormFields form={form} />
      </form>
    </Form>
  );
}
