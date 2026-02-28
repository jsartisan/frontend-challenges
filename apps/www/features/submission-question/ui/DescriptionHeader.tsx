import { z } from "zod";
import { UseFormReturn } from "react-hook-form";

import { Button } from "~/components/ui/button";
import { formSchema } from "~/features/submission-quiz/model/formSchema";

type DescriptionHeaderProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  setActiveTab: (tab: string) => void;
};

export function DescriptionHeader(props: DescriptionHeaderProps) {
  const { form, setActiveTab } = props;

  return (
    <div className="relative flex w-full items-end justify-between gap-3">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold">Submit Quiz</h1>
        </div>
        <p className="text-sm">
          Enter the title, description, and tags for your question. You will be seeing a preview on your right.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          className="self-end"
          variant="secondary"
          onPress={() => {
            form.trigger(["title", "readme", "difficulty", "tags"]).then(() => {
              if (form.formState.isValid) {
                setActiveTab("code");
              }
            });
          }}
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}
