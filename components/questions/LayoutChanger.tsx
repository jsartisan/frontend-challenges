"use client";

import { useLayout } from "@/providers/LayoutProvider";

import { Icon } from "../ui/icon";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { cn } from "@/utils/helpers";

type LayoutChangerProps = {
  className?: string;
};

export const LayoutChanger = (props: LayoutChangerProps) => {
  const { className } = props;
  const { layout, setLayout } = useLayout();

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <ToggleGroup variant="outline" size="icon" type="single" value={layout} onValueChange={setLayout}>
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
