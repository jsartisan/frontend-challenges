"use client";

import { ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import { DynamicResizablePanel } from "./DynamicResizablePanel";
import { DynamicResizableHandle } from "./DynamicResizableHandle";
import { Fragment, useRef, useState } from "react";
import { LayoutManager } from "./LayoutManager";

type Direction = "horizontal" | "vertical";

// Define specific types for our layout structure
export type LayoutItem = { children: React.ReactNode; defaultCollapsed?: boolean } & React.ComponentProps<
  typeof ResizablePanel
>;
export type LayoutGroup = {
  id: string;
  direction: Direction;
  children: Array<LayoutItem | LayoutGroup>;
};
export type Layout = LayoutItem | LayoutGroup;

// Props now accept a more structured layout definition
export type DynamicResizableLayoutProps = {
  layout: LayoutGroup;
};

const isLayoutGroup = (item: any): item is LayoutGroup => {
  return item && typeof item === "object" && "direction" in item && "children" in item && Array.isArray(item.children);
};

export const DynamicResizableLayout = (props: DynamicResizableLayoutProps) => {
  const { layout: defaultLayout } = props;
  const [layout, setLayout] = useState<LayoutItem | LayoutGroup>(defaultLayout);
  const [sourceItemPath, setSourceItemPath] = useState<number[] | null>(null);
  const layoutManager = useRef(new LayoutManager(defaultLayout));

  const updateLayout = (targetItemPath: number[], dropZone: "top" | "right" | "bottom" | "left" | null) => {
    if (!sourceItemPath || !dropZone) return;

    const newLayout = layoutManager.current.updateLayout(sourceItemPath, targetItemPath, dropZone);

    console.log("prev layout", layout, "## newLayout", newLayout);

    setLayout(newLayout);

    // setLayout(newLayout);
  };

  const renderLayout = (item: LayoutItem | LayoutGroup, path: number[] = []): React.ReactNode => {
    if (!isLayoutGroup(item)) {
      return item.children;
    }

    return (
      <ResizablePanelGroup
        direction={item.direction}
        key={`${item.id}-${item.children.length}`}
        className="group/layout-group !grid gap-4 sm:!flex sm:gap-1"
      >
        {item.children.map((child, index) => (
          <Fragment key={child.id}>
            {index > 0 && <DynamicResizableHandle path={[...path, index]} direction={item.direction} key={child.id} />}
            <DynamicResizablePanel
              updateLayout={updateLayout}
              sourceItemPath={sourceItemPath}
              setSourceItemPath={setSourceItemPath}
              path={[...path, index]}
              {...child}
              draggable={isLayoutGroup(child) === false}
              direction={item.direction}
            >
              {renderLayout(child, [...path, index])}
            </DynamicResizablePanel>
          </Fragment>
        ))}
      </ResizablePanelGroup>
    );
  };

  return renderLayout(layout);
};
