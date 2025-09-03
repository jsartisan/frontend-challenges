import { useSandpack } from "@codesandbox/sandpack-react";
import React, { useEffect, useRef, useState } from "react";
import { ImperativePanelGroupHandle, ImperativePanelHandle } from "react-resizable-panels";

import { cn } from "~/utils/helpers";
import { Card, Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui";

type ResizableLayoutTabProps = {
  children: {
    title: string;
    value: string;
    children: React.ReactNode;
  }[];
  defaultValue?: string;
  value?: string;
  panelRef?: React.RefObject<ImperativePanelHandle>;
  groupDirection?: "horizontal" | "vertical";
  groupRef?: React.RefObject<ImperativePanelGroupHandle>;
  tabless?: boolean;
};

export const ResizableLayoutTab = (props: ResizableLayoutTabProps) => {
  const { children, defaultValue, panelRef, tabless, value } = props;
  const { sandpack } = useSandpack();
  const [activeFile, setActiveFile] = useState(value || defaultValue);

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

  useEffect(() => {
    if (value) {
      setActiveFile(value);
    }
  }, [value]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateShadows = () => {
      if (!el) return;
      const { clientWidth, scrollLeft, scrollWidth } = el;
      // Allow a small tolerance (1px) to avoid lingering shadow due to rounding
      setShowLeftShadow(scrollLeft > 0);
      setShowRightShadow(scrollLeft + clientWidth < scrollWidth - 1);
    };

    updateShadows(); // run once on mount
    el.addEventListener("scroll", updateShadows);
    window.addEventListener("resize", updateShadows);

    return () => {
      el.removeEventListener("scroll", updateShadows);
      window.removeEventListener("resize", updateShadows);
    };
  }, []);

  return (
    <Card
      className={cn(
        "@container-[size] h-full w-full overflow-hidden shadow-none",
        "before:shadow-card before:fixed before:z-[-1] before:h-[calc(100cqh+1px)] before:w-[calc(100cqw+1px)] before:rounded-[inherit] before:border before:border-transparent",
        tabless &&
          "before:shadow-none [[data-panel-group-direction=horizontal]_div:not([data-panel-size='0.0'])_&]:border-none [[data-panel-group-direction=horizontal]_div:not([data-panel-size='0.0'])_&]:bg-transparent",
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
        {/*
         * The wrapper below enables overflow scrolling while hiding the native
         * scrollbar. We rely on custom shadows (rendered as absolutely
         * positioned gradient overlays) to hint overflow.
         */}
        <div className="relative">
          {/* gradient shadows */}
          {showLeftShadow && (
            <div className="from-(--color-bd) pointer-events-none absolute left-0 top-0 z-10 h-full w-4 bg-gradient-to-r to-transparent" />
          )}
          {showRightShadow && (
            <div className="from-(--color-bd) pointer-events-none absolute right-0 top-0 z-10 h-full w-4 bg-gradient-to-l to-transparent" />
          )}

          <div
            ref={scrollRef}
            className={cn(
              "flex overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none]",
              /* hide WebKit scrollbar */
              "[&::-webkit-scrollbar]:hidden",
            )}
          >
            <TabsList
              className={cn(
                "group/tabs-list flex-shrink-0",
                tabless && "hidden [[data-panel-group-direction=horizontal]_[data-panel-size='0.0']_&]:flex",
              )}
            >
              {children.map((child) => (
                <TabsTrigger
                  key={child.value}
                  value={child.value}
                  onClick={() => {
                    if (panelRef?.current?.isCollapsed()) {
                      panelRef?.current?.expand();
                    }
                  }}
                >
                  {child.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>
        {children.map((child) => (
          <TabsContent key={child.value} value={child.value} className={cn(tabless && "border-none")}>
            {child.children}
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
};
