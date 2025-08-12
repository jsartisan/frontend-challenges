import { SupportedTemplates } from "@/shared";
import { SUPPORTED_TEMPLATES, TEMPLATES } from "@/shared";

import Preview from "~/components/editor/Preview";
import CodeEditor from "~/components/editor/CodeEditor";
import { FileExplorer } from "~/components/editor/FileExplorer";
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
} from "~/components/ui";
import { ResizableLayoutTab } from "~/components/editor/ResizableLayoutTab";
import { useSandpack } from "@codesandbox/sandpack-react";

type Step2FieldsProps = {
  form: any;
};

function Step2Fields(props: Step2FieldsProps) {
  const { form } = props;
  const { sandpack } = useSandpack();
  const { files, activeFile } = sandpack;

  return (
    <ResizablePanelGroup direction="horizontal" className="mt-6 grid flex-grow gap-1">
      <ResizablePanel defaultSize={20}>
        <ResizableLayoutTab tabless defaultValue="file-explorer">
          {[
            {
              title: "File Explorer",
              value: "file-explorer",
              children: (
                <div className="flex flex-col gap-4">
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
                </div>
              ),
            },
          ]}
        </ResizableLayoutTab>
      </ResizablePanel>

      <ResizableHandle className="w-2" />
      <ResizablePanel defaultSize={50}>
        <ResizableLayoutTab value={activeFile}>
          {Object.keys(files).map((file) => ({
            title: file,
            value: file,
            children: <CodeEditor path="/submit/question" template={form.getValues("template")} file={file} />,
          }))}
        </ResizableLayoutTab>
      </ResizablePanel>
      <ResizableHandle className="w-2" />
      <ResizablePanel defaultSize={30}>
        <ResizableLayoutTab value="preview">
          {[
            {
              title: "Preview",
              value: "preview",
              children: <Preview template={form.getValues("template") as SupportedTemplates} />,
            },
          ]}
        </ResizableLayoutTab>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export { Step2Fields };
