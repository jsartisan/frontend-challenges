import { Button } from "~/components/ui";

type AnswerStepHeaderProps = {
  setActiveTab: (tab: string) => void;
};

export function AnswerHeader(props: AnswerStepHeaderProps) {
  const { setActiveTab } = props;

  return (
    <div className="relative flex w-full items-end justify-between gap-3">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold">Enter answer</h1>
        <p>Write the answer for the quiz</p>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <Button type="button" className="self-end" variant="secondary" onClick={() => setActiveTab("description")}>
            Previous Step
          </Button>
          <Button type="submit">Submit Challenge</Button>
        </div>
      </div>
    </div>
  );
}
