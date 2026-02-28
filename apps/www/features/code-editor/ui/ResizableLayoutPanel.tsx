import { ImperativePanelHandle } from "react-resizable-panels";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import { cn } from "~/utils/helpers";
import { Card, Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui";

export type ResizableLayoutTabPanel = {
  children: {
    title: string;
    value: string;
    children: React.ReactNode;
  }[];
  defaultValue?: string;
  value?: string;
  panelRef?: React.RefObject<ImperativePanelHandle>;
  tabless?: boolean;
  actions?: React.ReactNode;
  onValueChange?: (value: string) => void;
};

export const ResizableLayoutPanel = (props: ResizableLayoutTabPanel) => {
  const { actions, children, defaultValue, panelRef, tabless, value } = props;
  const [selectedTab, setSelectedTab] = useState(value || defaultValue);

  const onValueChange = (value: string) => {
    props.onValueChange?.(value);
    setSelectedTab(value);
  };

  useEffect(() => {
    if (value) setSelectedTab(value);
  }, [value]);

  // useEffect(() => {
  //   const handleSetActiveFile = (e: CustomEvent<string>) => {
  //     const tab = children.find((child) => child.value === e.detail);

  //     console.log({ e: e.detail, children });

  //     if (tab) {
  //       setSelectedTab(tab.value);
  //     }
  //   };

  //   window.addEventListener("setActiveFile", handleSetActiveFile as EventListener);

  //   return () => {
  //     window.removeEventListener("setActiveFile", handleSetActiveFile as EventListener);
  //   };
  // }, [children]);

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

  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const setHeightVar = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        cardRef.current.style.setProperty("--height", `${rect.height}px`);
        cardRef.current.style.setProperty("--width", `${rect.width}px`);
      }
    };

    setHeightVar();

    const observer = new window.ResizeObserver(() => {
      setHeightVar();
    });

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Card
      className={cn(
        "h-full w-full overflow-hidden",
        tabless &&
          "before:shadow-none [[data-panel-group-direction=horizontal]_div:not([data-panel-size='0.0'])_&]:border-none [[data-panel-group-direction=horizontal]_div:not([data-panel-size='0.0'])_&]:bg-transparent",
      )}
      ref={cardRef}
    >
      <Tabs
        value={selectedTab}
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
        <div className="flex w-full items-center">
          <div
            ref={scrollRef}
            className={cn(
              "relative flex grow overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none]",
              /* hide WebKit scrollbar */
              "[&::-webkit-scrollbar]:hidden",
            )}
          >
            {/* gradient shadows */}
            {showLeftShadow && (
              <div className="from-border pointer-events-none absolute left-0 top-0 z-10 h-full w-4 bg-gradient-to-r to-transparent" />
            )}
            {showRightShadow && (
              <div className="from-border pointer-events-none absolute right-0 top-0 z-10 h-full w-4 bg-gradient-to-l to-transparent" />
            )}
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
          {actions && <div className="gpa-2 ms-auto flex items-center p-1">{actions}</div>}
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
