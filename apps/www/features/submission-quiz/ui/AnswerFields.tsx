import { z } from "zod";
import Markdown from "react-markdown";
import { UseFormReturn } from "react-hook-form";

import { components } from "~/shared/ui/mdx/components";
import { formSchema } from "~/features/submission-quiz/model/formSchema";
import {
  Card,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icon,
  Textarea,
} from "~/components/ui";

type AnswerFieldsProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

function AnswerFields(props: AnswerFieldsProps) {
  const { form } = props;

  return (
    <div className="mt-6 grid grow grid-cols-2 gap-3">
      <Card className="flex h-full p-4">
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

export { AnswerFields };
