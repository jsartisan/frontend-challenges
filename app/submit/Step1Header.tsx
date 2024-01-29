import { Button } from "@/components/ui";

type Step1HeaderProps = {
  form: any;
  setActiveTab: (tab: string) => void;
};

function Step1Header(props: Step1HeaderProps) {
  const { form, setActiveTab } = props;

  return (
    <div className="relative flex w-full items-end justify-between gap-3">
      <div className="flex flex-col gap-3">
        <div className="gap-3i flex items-center gap-3">
          <h1 className="text-2xl font-semibold">Submit Question</h1>
        </div>
        <p>Enter the title, description, and tags for your question. You will be seeing a preview on your right.</p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          className="self-end"
          variant="secondary"
          onClick={() => {
            form.trigger(["title", "readme", "difficulty", "tags"]).then(() => {
              if (form.formState.isValid) {
                setActiveTab("code");
              }
            });
          }}
        >
          Next Step
        </Button>
        {form.getValues().type === "quiz" && <Button type="submit">Submit Challenge</Button>}
      </div>
    </div>
  );
}

export { Step1Header };
