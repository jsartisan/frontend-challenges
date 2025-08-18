import { components } from "../../../components/mdx";
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
} from "../../../components/ui";
import Markdown from "react-markdown";

type Step2FieldsProps = {
  form: any;
};

function Step2Fields(props: Step2FieldsProps) {
  const { form } = props;

  return (
    <div className="mt-6 grid flex-grow grid-cols-2 gap-3">
      <Card className="flex h-full p-4">
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
  );
}

export { Step2Fields };
