import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import { useSandpack } from "@codesandbox/sandpack-react";

import { Button } from "~/components/ui/button";
import { formSchema } from "~/features/submission-question/model/formSchema";
import { generateSubmitChallengeURL } from "~/features/submission-question/lib/generateSubmitChallengeURL";

type Step2HeaderProps = {
  setActiveTab: (tab: string) => void;
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export function CodeHeader(props: Step2HeaderProps) {
  const { form, setActiveTab } = props;
  const { sandpack } = useSandpack();
  const { files } = sandpack;

  const onSubmit = () => {
    form.handleSubmit((values) => {
      window.open(
        generateSubmitChallengeURL({
          ...values,
          files,
        }),
      );
    })();
  };

  return (
    <div className="relative flex w-full items-end justify-between gap-3">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold">Setup Code</h1>
        <p>Setup the code files for your question.</p>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <Button type="button" className="self-end" variant="secondary" onPress={() => setActiveTab("description")}>
            Previous Step
          </Button>
          <Button type="button" onPress={onSubmit}>
            Submit Challenge
          </Button>
        </div>
      </div>
    </div>
  );
}
