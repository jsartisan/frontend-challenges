"use client";

import { cn } from "@/web/utils/helpers";
import { ResizablePanelGroup } from "@/web/components/ui/resizable";

import { DynamicResizablePanel } from "./DynamicLayoutPanel";
import { DynamicResizableHandle } from "./DynamicLayoutHandle";
import { Fragment, useEffect, useRef, useState } from "react";
import { LayoutManager } from "./LayoutManager";
import { DynamicLayoutTab } from "./DynamicLayoutTab";
import { DragDropItem, DragDropProvider, DropZone } from "@/web/contexts/DragDropContext";

import { LayoutGroup, LayoutItem, LayoutTab } from "./types";

export type DynamicResizableLayoutProps = {
  layout: LayoutGroup;
  componentsMap: Record<string, LayoutTab>;
  onLayoutChange?: (layout: LayoutGroup) => void;
  setLayout: (layout: LayoutGroup) => void;
};

export const DynamicLayoutRoot = (props: DynamicResizableLayoutProps) => {
  const { layout, componentsMap, onLayoutChange, setLayout } = props;
  const [sourceItemPath, setSourceItemPath] = useState<number[] | null>(null);
  const layoutManager = useRef(new LayoutManager(layout));

  useEffect(() => {
    layoutManager.current.layout = layout;
  }, [layout]);

  const updateLayout = (source: DragDropItem, target: DragDropItem, dropZone: DropZone) => {
    if (!source || !dropZone) return;

    const newLayout = layoutManager.current.updateLayout(source, target, dropZone);

    setLayout(newLayout);

    onLayoutChange?.(newLayout);
  };

  const renderLayoutItem = (item: LayoutItem, path: number[] = []): React.ReactNode => {
    const isGroup = layoutManager.current.isLayoutGroup(item);

    if (isGroup) {
      return renderLayout(item, [...path]);
    }

    return (
      <DynamicLayoutTab path={path} updateLayout={updateLayout} item={item}>
        {item.children
          .filter((child) => componentsMap[child])
          .map((child) => {
            return componentsMap[child];
          })}
      </DynamicLayoutTab>
    );
  };

  const renderLayout = (item: LayoutGroup, path: number[] = []): React.ReactNode => {
    return (
      <ResizablePanelGroup
        direction={item.direction}
        key={`${item.id}-${item.children.length}`}
        data-key={`${item.id}-${item.children.length}`}
        className={cn(
          "group/layout-group !grid gap-4  sm:!flex sm:gap-1",
          item.direction === "horizontal" &&
            "[[data-panel-collapsed=true]_&]:flex-col [[data-panel-collapsed=true]_&]:[writing-mode:tb]",
        )}
      >
        {item.children.map((child, index) => (
          <Fragment key={child.id}>
            {index > 0 && <DynamicResizableHandle path={[...path, index]} direction={item.direction} key={child.id} />}
            <DynamicResizablePanel
              key={`${item.id}-${index}`}
              updateLayout={updateLayout}
              sourceItemPath={sourceItemPath}
              setSourceItemPath={setSourceItemPath}
              path={[...path, index]}
              {...child}
              draggable={layoutManager.current.isLayoutGroup(child) === false}
              direction={item.direction}
            >
              {renderLayoutItem(child, [...path, index])}
            </DynamicResizablePanel>
          </Fragment>
        ))}
      </ResizablePanelGroup>
    );
  };

  return <DragDropProvider>{renderLayout(layout)}</DragDropProvider>;
};
