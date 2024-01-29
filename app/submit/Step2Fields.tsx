import { CodeEditor } from "@/components/editor/CodeEditor";
import { FileExplorer } from "@/components/editor/FileExplorer";
import Preview from "@/components/editor/Preview";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { SUPPORTED_TEMPLATES } from "@/constants";
import { TEMPLATES } from "@/templates";
import { SupportedTemplates } from "@/types";

type Step2FieldsProps = {
  form: any;
};

function Step2Fields(props: Step2FieldsProps) {
  const { form } = props;

  return (
    <ResizablePanelGroup direction="horizontal" className="mt-6 grid flex-grow gap-1">
      <ResizablePanel defaultSizePercentage={20} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="template"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Template</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.setValue("files", TEMPLATES[value as SupportedTemplates].files);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {SUPPORTED_TEMPLATES.map((template) => (
                        <SelectItem key={template} value={template}>
                          {template}
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
        <FileExplorer />
      </ResizablePanel>
      <ResizableHandle className="w-2" />
      <ResizablePanel defaultSizePercentage={50}>
        <FormField
          control={form.control}
          name="files"
          render={({ field }) => <CodeEditor onChange={field.onChange} />}
        />
      </ResizablePanel>
      <ResizableHandle className="w-2" />
      <ResizablePanel defaultSizePercentage={30}>
        <Preview template={form.getValues("template") as SupportedTemplates} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export { Step2Fields };
