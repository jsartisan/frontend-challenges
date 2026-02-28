import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import { useSandpack } from "@codesandbox/sandpack-react";

import { File } from "~/features/code-editor/ui/File";
import { Preview } from "~/features/code-editor/ui/Preview";
import { TEMPLATES } from "~/entities/challenge/model/templates";
import { SupportedTemplates } from "~/entities/challenge/model/types";
import { FileExplorer } from "~/features/code-editor/ui/FileExplorer";
import { SUPPORTED_TEMPLATES } from "~/entities/challenge/model/constants";
import { formSchema } from "~/features/submission-question/model/formSchema";
import { ResizableLayoutPanel } from "~/features/code-editor/ui/ResizableLayoutPanel";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui";
import { Select, SelectItem } from "~/components/ui/select";

type Step2FieldsProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export function CodeFields(props: Step2FieldsProps) {
  const { form } = props;
  const { sandpack } = useSandpack();
  const { activeFile, files, setActiveFile } = sandpack;

  return (
    <ResizablePanelGroup direction="horizontal" className="mt-6 grid grow gap-1">
      <ResizablePanel defaultSize={20}>
        <ResizableLayoutPanel tabless defaultValue="file-explorer">
          {[
            {
              title: "File Explorer",
              id: "file-explorer",
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
                            selectedKey={field.value}
                            onSelectionChange={(key) => {
                              const value = String(key);
                              field.onChange(value);
                              form.setValue("files", TEMPLATES[value as SupportedTemplates].files);
                            }}
                          >
                            {SUPPORTED_TEMPLATES.map((template) => (
                              <SelectItem key={template} id={template}>
                                {template}
                              </SelectItem>
                            ))}
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
        </ResizableLayoutPanel>
      </ResizablePanel>

      <ResizableHandle className="w-2" />
      <ResizablePanel defaultSize={50}>
        <ResizableLayoutPanel
          value={activeFile}
          onSelectionChange={(key) => {
            setActiveFile(key);
          }}
        >
          {Object.keys(files).map((file) => ({
            title: file,
            id: file,
            children: (
              <File path="/submit/question" template={form.getValues("template") as SupportedTemplates} file={file} />
            ),
          }))}
        </ResizableLayoutPanel>
      </ResizablePanel>
      <ResizableHandle className="w-2" />
      <ResizablePanel defaultSize={30}>
        <ResizableLayoutPanel value="preview">
          {[
            {
              title: "Preview",
              id: "preview",
              children: <Preview template={form.getValues("template") as SupportedTemplates} />,
            },
          ]}
        </ResizableLayoutPanel>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
