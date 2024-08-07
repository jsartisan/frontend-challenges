import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import { useSandpack } from "@codesandbox/sandpack-react";

import { formSchema } from "./client";
import { Button } from "../../../components/ui";
import { getSubmitChallengeURL } from "../../../utils/challenges";

type Step2HeaderProps = {
  setActiveTab: (tab: string) => void;
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

function Step2Header(props: Step2HeaderProps) {
  const { setActiveTab, form } = props;
  const { sandpack } = useSandpack();
  const { files } = sandpack;

  const onSubmit = () => {
    form.handleSubmit((values) => {
      window.open(
        getSubmitChallengeURL({
          ...values,
          files,
        }),
        "_blank",
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
          <Button type="button" className="self-end" variant="secondary" onClick={() => setActiveTab("description")}>
            Previous Step
          </Button>
          <Button type="button" onClick={onSubmit}>
            Submit Challenge
          </Button>
        </div>
      </div>
    </div>
  );
}

export { Step2Header };
