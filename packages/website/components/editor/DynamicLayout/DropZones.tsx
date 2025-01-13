import { cn } from "packages/website/utils/helpers";
import { DropZone } from "../types";
import { useDragDrop } from "packages/website/contexts/DragDropContext";

interface DropZones extends React.HTMLAttributes<HTMLDivElement> {
  path?: number[];
}

export function DropZones(props: DropZoneIndicatorProps) {
  const { path, ...rest } = props;
  const { setDropZone, setTarget, source } = useDragDrop();

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const target = e.currentTarget as HTMLElement;
    const dropZone = target.dataset.dropZone as DropZone;

    console.log("@@ source", source.path, "@@ target", path);

    if (source.type === "panel") {
      if (source.path.join("-") === path.join("-")) {
        return;
      }
    }

    setDropZone(dropZone);
    setTarget({
      path,
      type: "panel",
    });
  };

  return (
    <div className="hidden [[data-dragging=true]_&]:block">
      <div
        style={{ containerType: "size" }}
        className={cn({
          absolute: true,
          "top-0 w-full": true,
        })}
        {...rest}
      >
        <div
          data-drop-zone="top"
          onDragOver={onDragOver}
          className={cn({
            fixed: true,
            "-mt-2 h-2 w-[100cqw]": true,
          })}
        />
      </div>

      <div
        style={{ containerType: "size" }}
        className={cn({
          absolute: true,
          "right-0 top-0 h-full": true,
        })}
        {...rest}
      >
        <div
          onDragOver={onDragOver}
          data-drop-zone="right"
          className={cn({
            fixed: true,
            "ml-0 h-[100cqh] w-2": true,
          })}
        />
      </div>

      <div
        style={{ containerType: "size" }}
        className={cn({
          absolute: true,
          "bottom-0 w-full": true,
        })}
        {...rest}
      >
        <div
          data-drop-zone="bottom"
          onDragOver={onDragOver}
          className={cn({
            fixed: true,
            "mt-0 h-2 w-[100cqw]": true,
          })}
        />
      </div>

      <div
        style={{ containerType: "size" }}
        className={cn({
          absolute: true,
          "left-0 top-0 h-full": true,
        })}
        {...rest}
      >
        <div
          onDragOver={onDragOver}
          data-drop-zone="left"
          className={cn({
            fixed: true,
            "-ml-2 h-[100cqh] w-2": true,
          })}
        />
      </div>
    </div>
  );
}
