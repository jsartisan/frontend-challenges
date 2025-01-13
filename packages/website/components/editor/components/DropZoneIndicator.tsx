import { cn } from "packages/website/utils/helpers";
import { DropZone } from "../types";

interface DropZoneIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  dropZone: DropZone;
  type?: "panel" | "tab";
}

export function DropZoneIndicator(props: DropZoneIndicatorProps) {
  const { dropZone, type = "panel", ...rest } = props;

  if (!dropZone) return null;

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      onDragOver={onDragOver}
      data-drop-zone-indicator=""
      style={{ containerType: "size" }}
      className={cn({
        absolute: true,
        "top-0 w-full": dropZone === "top",
        "bottom-0 w-full": dropZone === "bottom",
        "left-0 top-0 h-full": dropZone === "left",
        "right-0 top-0 h-full": dropZone === "right",
      })}
      {...rest}
    >
      <div
        data-drop-zone-indicator-inner=""
        data-drop-zone={dropZone}
        className={cn({
          "fixed bg-purple-500": true,
          "-mt-2.5 h-1 w-[100cqw]": dropZone === "top",
          "mt-1.5 h-1 w-[100cqw]": dropZone === "bottom",
          "h-[100cqh] w-1": dropZone === "left" || dropZone === "right",
          "-ml-2.5": dropZone === "left" && type === "panel",
          "ml-1.5": dropZone === "right" && type === "panel",
          "-ml-1.5": dropZone === "left" && type === "tab",
          "ml-0.5": dropZone === "right" && type === "tab",
        })}
      />
    </div>
  );
}
