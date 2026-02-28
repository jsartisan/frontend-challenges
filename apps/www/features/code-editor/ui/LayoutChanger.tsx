"use client";

import { cn } from "~/utils/helpers";
import { Icon } from "~/components/ui/icon";
import { setLocalStorageItem } from "~/shared/lib/localStorage";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

type LayoutChangerProps = {
  className?: string;
  layout: "layout-1" | "layout-2" | "layout-3";
  setLayout: (layout: LayoutChangerProps["layout"]) => void;
};

export const LayoutChanger = (props: LayoutChangerProps) => {
  const { className, layout, setLayout } = props;

  return (
    <div className={cn("hidden items-center justify-center sm:flex", className)}>
      <ToggleGroup size="icon" variant="outline">
        <ToggleGroupItem
          id="layout-1"
          isSelected={layout === "layout-1"}
          onChange={() => {
            setLocalStorageItem("layout", "layout-1");
            setLayout("layout-1");
          }}
        >
          <Icon name="layout-1" />
        </ToggleGroupItem>
        <ToggleGroupItem
          id="layout-2"
          isSelected={layout === "layout-2"}
          onChange={() => {
            setLocalStorageItem("layout", "layout-2");
            setLayout("layout-2");
          }}
        >
          <Icon name="layout-2" />
        </ToggleGroupItem>
        <ToggleGroupItem
          id="layout-3"
          isSelected={layout === "layout-3"}
          onChange={() => {
            setLocalStorageItem("layout", "layout-3");
            setLayout("layout-3");
          }}
        >
          <Icon name="layout-3" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
