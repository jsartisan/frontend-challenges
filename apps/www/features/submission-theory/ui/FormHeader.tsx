import { Button } from "~/components/ui";

export function FormHeader() {
  return (
    <div className="relative flex w-full items-end justify-between gap-3">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold">Submit a new theory question</h1>
        <p>Write the answer for the theory question</p>
      </div>
      <div className="flex flex-col gap-3">
        <Button type="submit">Submit Challenge</Button>
      </div>
    </div>
  );
}
