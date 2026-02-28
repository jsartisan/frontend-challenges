import { DIFFICULTY_RANK } from "~/entities/challenge/model/constants";
import {
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

type DescriptionFieldsProps = {
  form: any;
};

export function DescriptionFields(props: DescriptionFieldsProps) {
  const { form } = props;

  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input autoFocus placeholder="shadcn" {...field} />
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

      <FormField
        control={form.control}
        name="readme"
        render={({ field }) => (
          <FormItem className="flex grow flex-col">
            <FormLabel>Readme</FormLabel>
            <FormControl className="grow">
              <Textarea placeholder="shadcn" className="grow resize-none" {...field} />
            </FormControl>
            <FormDescription className="flex items-center gap-2">
              <Icon name="markdown" /> Markdown is supported
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
