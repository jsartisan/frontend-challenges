"use client";

import { useLayout } from "@/website/providers/LayoutProvider";
import { Icon } from "../ui/icon";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { cn } from "@/website/utils/helpers";

type LayoutChangerProps = {
  className?: string;
};

export const LayoutChanger = (props: LayoutChangerProps) => {
  const { className } = props;
  const { layout, setLayout } = useLayout();

  return (
    <div className={cn("hidden items-center justify-center sm:flex", className)}>
      <ToggleGroup size="icon" variant="outline" type="single" value={layout} onValueChange={setLayout}>
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
