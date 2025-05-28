import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card } from "../ui";

import { cn } from "~/utils/helpers";
import { useSandpack } from "@codesandbox/sandpack-react";
import { ImperativePanelGroupHandle, ImperativePanelHandle } from "react-resizable-panels";

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
  tabless?: boolean;
};

export const ResizableLayoutTab = (props: ResizableLayoutTabProps) => {
  const { children, defaultValue, panelRef, tabless } = props;
  const { sandpack } = useSandpack();
  const [activeFile, setActiveFile] = useState(defaultValue);

  // Clean up effect when component unmounts
  useEffect(() => {
    return () => {
      // Reset active file when unmounting
      if (activeFile?.startsWith("/")) {
        sandpack.setActiveFile("");
      }
    };
  }, [activeFile, sandpack]);

  const onValueChange = (value: string) => {
    if (value.startsWith("/")) {
      setActiveFile(value);
      sandpack.setActiveFile(value);
      return;
    }
    setActiveFile(value);
  };

  useEffect(() => {
    const handleSetActiveFile = (e: CustomEvent<string>) => {
      const tab = children.find((child) => child.value === e.detail);

      if (tab) {
        setActiveFile(tab.value);
      }
    };

    window.addEventListener("setActiveFile", handleSetActiveFile as EventListener);

    return () => {
      window.removeEventListener("setActiveFile", handleSetActiveFile as EventListener);
    };
  }, [children]);

  return (
    <Card
      className={cn(
        "h-full w-full overflow-hidden",
        tabless &&
          "[[data-panel-group-direction=horizontal]_div:not([data-panel-size='0.0'])_&]:border-none [[data-panel-group-direction=horizontal]_div:not([data-panel-size='0.0'])_&]:bg-transparent",
      )}
    >
      <Tabs
        value={activeFile}
        className={cn(
          "h-full w-full flex-col",
          "[[data-panel-group-direction=horizontal]_[data-panel-size='0.0']_&]:[writing-mode:tb] [[data-panel-group-direction=vertical]_[data-panel-size='0.0']_&]:[writing-mode:lr]",
        )}
        onValueChange={onValueChange}
      >
        <TabsList
          className={cn(
            "group/tabs-list",
            tabless && "hidden [[data-panel-group-direction=horizontal]_[data-panel-size='0.0']_&]:flex",
          )}
        >
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
        </TabsList>
        {children.map((child) => (
          <TabsContent key={child.value} value={child.value} className={cn(tabless && "border-none")}>
            {child.children}
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
};
