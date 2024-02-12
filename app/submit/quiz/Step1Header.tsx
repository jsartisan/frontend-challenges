import { Button } from "@/components/ui";

function Step1Header() {
  return (
    <div className="relative flex w-full items-end justify-between gap-3">
      <div className="flex flex-col gap-3">
        <div className="gap-3i flex items-center gap-3">
          <h1 className="text-2xl font-semibold">Submit Quiz</h1>
        </div>
        <p>Enter the title, description, and tags for your question. You will be seeing a preview on your right.</p>
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit">Submit Challenge</Button>
      </div>
    </div>
  );
}

export { Step1Header };
