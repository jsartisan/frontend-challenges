import React, { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, Icon, IconButton } from "../ui";

import { cn } from "packages/website/utils/helpers";
import { ImperativePanelGroupHandle, ImperativePanelHandle } from "react-resizable-panels";
import { useSandpack } from "@codesandbox/sandpack-react";

type ResizableLayoutTabProps = {
  children: {
    title: string;
    value: string;
    children: React.ReactNode;
  }[];
  defaultValue?: string;
  panelRef?: React.RefObject<ImperativePanelHandle>;
  groupDirection?: "horizontal" | "vertical";
  groupRef?: React.RefObject<ImperativePanelGroupHandle>;
};

export const ResizableLayoutTab = (props: ResizableLayoutTabProps) => {
  const { children, defaultValue, panelRef, groupDirection = "horizontal", groupRef } = props;
  const { sandpack } = useSandpack();

  const iconName = (() => {
    if (groupDirection === "vertical" && panelRef?.current?.isCollapsed()) {
      return "expand-vertical";
    }

    if (groupDirection === "vertical" && panelRef?.current?.isExpanded()) {
      return "collapse-vertical";
    }

    if (groupDirection === "horizontal" && panelRef?.current?.isExpanded()) {
      return "collapse-horizontal";
    }

    return "expand-horizontal";
  })();

  const onValueChange = (value: string) => {
    sandpack.setActiveFile(value);
  };

  return (
    <Card className="h-full w-full overflow-hidden">
      <Tabs
        defaultValue={defaultValue}
        className={cn(
          "h-full w-full flex-col",
          "[[data-panel-group-direction=horizontal]_[data-panel-size='0.0']_&]:[writing-mode:tb] [[data-panel-group-direction=vertical]_[data-panel-size='0.0']_&]:[writing-mode:lr]",
        )}
        onValueChange={onValueChange}
      >
        <TabsList className="group/tabs-list">
          {children.map((child) => (
            <TabsTrigger
              key={child.value}
              value={child.value}
              onClick={() => {
                panelRef.current?.isCollapsed() ? panelRef.current?.expand() : undefined;
              }}
            >
              {child.title}
            </TabsTrigger>
          ))}
          <div className="absolute end-1 opacity-0 transition-opacity duration-100 group-hover/tabs-list:opacity-100">
            <IconButton
              size="sm"
              variant="tertiary"
              onClick={() => {
                panelRef?.current?.isCollapsed() ? panelRef.current?.expand() : panelRef.current?.collapse();
              }}
            >
              <Icon name={iconName} />
            </IconButton>
          </div>
        </TabsList>
        {children.map((child) => (
          <TabsContent key={child.value} value={child.value}>
            {child.children}
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
};
