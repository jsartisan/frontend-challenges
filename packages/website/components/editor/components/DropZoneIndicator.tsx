import { cn } from "packages/website/utils/helpers";
import { DropZone } from "../types";

interface DropZoneIndicatorProps {
  dropZone: DropZone;
}

export function DropZoneIndicator({ dropZone }: DropZoneIndicatorProps) {
  if (!dropZone) return null;

  return (
    <div
      className={cn({
        absolute: true,
        "top-0": dropZone === "top",
        "bottom-0": dropZone === "bottom",
        "left-0 top-0": dropZone === "left",
        "right-0 top-0": dropZone === "right",
      })}
    >
      <div
        className={cn({
          "fixed bg-purple-500": true,
          "-mt-2.5 h-1 w-[100cqw]": dropZone === "top",
          "mt-1.5 h-1 w-[100cqw]": dropZone === "bottom",
          "-ml-2.5 h-[100cqh] w-1": dropZone === "left",
          "ml-1.5 h-[100cqh] w-1": dropZone === "right",
        })}
      />
    </div>
  );
}
