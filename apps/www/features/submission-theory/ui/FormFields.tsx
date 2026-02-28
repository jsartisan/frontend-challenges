import { z } from "zod";
import Markdown from "react-markdown";
import { UseFormReturn } from "react-hook-form";

import { components } from "~/shared/ui/mdx/components";
import { DIFFICULTY_RANK } from "~/entities/challenge/model/constants";
import { formSchema } from "~/features/submission-theory/model/formSchema";
import {
  Card,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icon,
  Input,
  Textarea,
} from "~/components/ui";
import { Select, SelectItem } from "~/components/ui/select";

type AnswerFieldsProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export function FormFields(props: AnswerFieldsProps) {
  const { form } = props;

  return (
    <div className="mt-6 grid grow grid-cols-2 gap-3">
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
                  <Select selectedKey={field.value} onSelectionChange={(key) => field.onChange(String(key))}>
                    {DIFFICULTY_RANK.map((difficulty) => (
                      <SelectItem key={difficulty} id={difficulty}>
                        {difficulty}
                      </SelectItem>
                    ))}
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
            <FormItem className="flex grow flex-col">
              <FormLabel>Answer</FormLabel>
              <FormControl className="grow">
                <Textarea
                  placeholder="Write your answer. We encourage to add some resources too for everyone to understand the answer."
                  className="grow resize-none"
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
  );
}
