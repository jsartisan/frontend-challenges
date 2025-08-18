"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { getSubmitChallengeURL } from "~/utils/challenges";
import {
  Form,
  Button,
  FormDescription,
  Icon,
  Textarea,
  FormControl,
  FormItem,
  Card,
  FormField,
  FormLabel,
  FormMessage,
  Input,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  Select,
} from "~/components/ui";
import Markdown from "react-markdown";
import { components } from "../../../components/mdx";
import { DIFFICULTY_RANK } from "@/shared/src/constants";
import { Difficulty } from "@/shared";

export const formSchema = z.object({
  title: z.string().min(2).max(100),
  tags: z.string(),
  type: z.enum(["question", "quiz", "theory"]),
  answer: z.string().optional(),
  difficulty: z.enum(DIFFICULTY_RANK as [Difficulty]),
});

export default function Client() {
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
    console.log(values);
    window.open(getSubmitChallengeURL(values))?.focus();
  }

  form.watch(["title", "answer"]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-[calc(100vh_-_var(--nav-top-offset))] flex-col p-4 text-sm"
      >
        <div className="relative flex w-full items-end justify-between gap-3">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-semibold">Submit a new theory question</h1>
            <p>Write the answer for the theory question</p>
          </div>
          <div className="flex flex-col gap-3">
            <Button type="submit">Submit Challenge</Button>
          </div>
        </div>
        <div className="mt-6 grid flex-grow grid-cols-2 gap-3">
          <Card className="flex h-full flex-col gap-4 p-4">
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a concise title for your theory question"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {DIFFICULTY_RANK.map((difficulty) => (
                              <SelectItem key={difficulty} value={difficulty}>
                                {difficulty}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Answer Field */}
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem className="flex flex-grow flex-col">
                  <FormLabel>Answer</FormLabel>
                  <FormControl className="flex-grow">
                    <Textarea
                      placeholder="Write your answer. We encourage to add some resources too for everyone to understand the answer."
                      className="flex-grow resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="flex items-center gap-2">
                    <Icon name="markdown" /> Markdown is supported
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>
          <Card className="p-4">
            <Markdown components={components}>{form.getValues("answer")}</Markdown>
          </Card>
        </div>
      </form>
    </Form>
  );
}
