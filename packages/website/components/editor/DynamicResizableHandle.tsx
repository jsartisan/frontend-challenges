import { ResizableHandle } from "../ui/resizable";

type DynamicResizableHandleProps = {
  direction: "horizontal" | "vertical";
  path: number[];
};

export const DynamicResizableHandle = ({ direction }: DynamicResizableHandleProps) => {
  return (
    <div
      className={
        direction === "horizontal"
          ? "hidden w-2 sm:block"
          : "hidden sm:block [&:has([data-panel-group-direction=vertical])]:h-2"
      }
    >
      <ResizableHandle className="h-full w-full"></ResizableHandle>
    </div>
  );
};
