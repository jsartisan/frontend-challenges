"use client";

import { Icon } from "../ui/icon";
import { cn } from "../../utils/helpers";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { LayoutGroup } from "../editor/DynamicLayout/types";
import { STORAGE_KEY } from "packages/shared/src";

type LayoutChangerProps = {
  className?: string;
  layout: LayoutGroup | "layout-1" | "layout-2" | "layout-3";
  setLayout: (layout: LayoutChangerProps["layout"]) => void;
};

export const LayoutChanger = (props: LayoutChangerProps) => {
  const { className, layout, setLayout } = props;

  return (
    <div className={cn("hidden items-center justify-center sm:flex", className)}>
      <ToggleGroup
        size="icon"
        variant="outline"
        type="single"
        value={["layout-1", "layout-2", "layout-3"].includes(layout as any) ? (layout as any) : undefined}
        onValueChange={(value) => {
          if (value) {
            if (["layout-1", "layout-2", "layout-3"].includes(value)) {
              localStorage.setItem(`${STORAGE_KEY}:layout`, value);
              setLayout(value as "layout-1" | "layout-2" | "layout-3");
            }
          }
        }}
      >
        <ToggleGroupItem value="layout-1">
          <Icon name="layout-1" />
        </ToggleGroupItem>
        <ToggleGroupItem value="layout-2">
          <Icon name="layout-2" />
        </ToggleGroupItem>
        <ToggleGroupItem value="layout-3">
          <Icon name="layout-3" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
