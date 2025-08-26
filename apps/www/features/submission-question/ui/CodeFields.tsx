import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import { useSandpack } from "@codesandbox/sandpack-react";

import { Preview } from "~/features/code-editor/ui/Preview";
import { TEMPLATES } from "~/entities/challenge/model/templates";
import { CodeEditor } from "~/features/code-editor/ui/CodeEditor";
import { SupportedTemplates } from "~/entities/challenge/model/types";
import { FileExplorer } from "~/features/code-editor/ui/FileExplorer";
import { SUPPORTED_TEMPLATES } from "~/entities/challenge/model/constants";
import { formSchema } from "~/features/submission-question/model/formSchema";
import { ResizableLayoutTab } from "~/features/code-editor/ui/ResizableLayoutTab";
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

type Step2FieldsProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export function CodeFields(props: Step2FieldsProps) {
  const { form } = props;
  const { sandpack } = useSandpack();
  const { activeFile, files } = sandpack;

  return (
    <ResizablePanelGroup direction="horizontal" className="mt-6 grid grow gap-1">
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
            children: (
              <CodeEditor
                path="/submit/question"
                template={form.getValues("template") as SupportedTemplates}
                file={file}
              />
            ),
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
