import { useEffect, useState } from "react";

import { LayoutItem, LayoutTab } from "./types";
import { Card, Icon, IconButton, Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui";
import { ImperativePanelHandle } from "react-resizable-panels";
import { cn } from "packages/website/utils/helpers";
import { DropZoneIndicator } from "../components/DropZoneIndicator";
import { DropZone, DragDropItem, useDragDrop } from "packages/website/contexts/DragDropContext";

type DynamicLayoutTabProps = {
  children: LayoutTab[];
  path: number[];
  panelRef?: React.RefObject<ImperativePanelHandle>;
  updateLayout: (source: DragDropItem, target: DragDropItem, dropZone: DropZone) => void;
  item: LayoutItem;
};

export const DynamicLayoutTab = (props: DynamicLayoutTabProps) => {
  const { children, panelRef, path, updateLayout, item } = props;
  const { source, dropZone, setSource, setTarget, setDropZone } = useDragDrop();
  const [activeTab, setActiveTab] = useState(item.children[0]);
  const [draggedTabId, setDraggedTabId] = useState<string | null>(null);

  console.log("@@ item", item);

  useEffect(() => {
    const handleSetActiveFile = (e: CustomEvent<string>) => {
      const tab = children.find((child) => child.id === e.detail);
      if (tab) {
        setActiveTab(tab.id);
      }
    };

    window.addEventListener("setActiveFile", handleSetActiveFile as EventListener);

    return () => {
      window.removeEventListener("setActiveFile", handleSetActiveFile as EventListener);
    };
  }, [children]);

  const onTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    panelRef?.current?.expand(30);

    dispatchEvent(new CustomEvent("openParentPanel", { detail: path }));
  };

  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    // add data-dragging attribute to the body
    document.body.setAttribute("data-dragging", "true");

    const tabId = e.currentTarget.getAttribute("data-id");
    const child = children.find((child) => child.id === tabId);
    const sourcePath = [...path, child ? children.indexOf(child) : 0];

    setSource({
      type: "tab",
      path: sourcePath,
    });

    // Create drag image
    const dragImage = document.createElement("div");
    dragImage.className =
      "fixed left-0 top-0 bg-[var(--color-bg)] border border-[var(--color-bd)] rounded-md px-2 py-1 pointer-events-none";
    dragImage.textContent = e.currentTarget.textContent;
    document.body.appendChild(dragImage);

    e.dataTransfer.setDragImage(dragImage, 0, 0);

    requestAnimationFrame(() => {
      document.body.removeChild(dragImage);
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (source?.type === "panel") {
      return;
    }

    const tabsList = e.currentTarget;
    const mouseX = e.clientX;

    const tabButtons = Array.from(tabsList.getElementsByTagName("button"));

    const closestButton = tabButtons.reduce(
      (closest, button) => {
        const rect = button.getBoundingClientRect();
        const buttonCenterX = rect.left + rect.width / 2;
        const distanceToMouse = Math.abs(mouseX - buttonCenterX);

        if (!closest || distanceToMouse < closest.distance) {
          return { button, distance: distanceToMouse };
        }
        return closest;
      },
      { button: null, distance: Infinity } as { button: HTMLButtonElement | null; distance: number },
    );

    if (closestButton.button) {
      const dataId = closestButton.button.getAttribute("data-id");
      const rect = closestButton.button.getBoundingClientRect();
      const zone: DropZone = mouseX > rect.left + rect.width / 2 ? "right" : "left";

      setDropZone(zone);
      setTarget({
        type: "tab",
        path: [...path, children.indexOf(children.find((child) => child.id === dataId) ?? children[0])],
      });

      setDraggedTabId(dataId ?? null);
    }
  };

  const handleDragLeave = () => {
    setDropZone(null);
    setDraggedTabId(null);
    setTarget(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const child = children.find((child) => child.id === draggedTabId);
    const targetPath = [...path, child ? children.indexOf(child) : 0];

    updateLayout(
      source,
      {
        type: "tab",
        path: targetPath,
      },
      dropZone,
    );

    setDropZone(null);
    setDraggedTabId(null);
    setTarget(null);

    document.body.removeAttribute("data-dragging");
  };

  const handleDragEnd = () => {
    document.body.removeAttribute("data-dragging");
  };

  const handleDragStartTabList = (e: React.DragEvent<HTMLDivElement>) => {
    setSource({
      path: path,
      type: "panel",
    });

    // add data-dragging attribute to the body
    document.body.setAttribute("data-dragging", "true");

    e.dataTransfer.effectAllowed = "move";

    // Create drag image
    const dragImage = document.createElement("div");
    dragImage.className =
      "fixed left-0 top-0 bg-[var(--color-bg)] border border-[var(--color-bd)] rounded-md px-2 py-1 pointer-events-none";
    dragImage.textContent = "panel";
    document.body.appendChild(dragImage);

    // Set the drag image and offset
    e.dataTransfer.setDragImage(dragImage, 0, 0);

    // Clean up the temporary element after a short delay
    requestAnimationFrame(() => {
      document.body.removeChild(dragImage);
    });
  };

  return (
    <Card className=" group/card flex h-full w-full flex-col overflow-hidden">
      <Tabs
        value={activeTab}
        className={cn(
          "h-full w-full flex-col",
          "[[data-panel-collapsed=true][data-panel-direction=horizontal]_&]:[writing-mode:tb]",
        )}
        onValueChange={setActiveTab}
      >
        <TabsList
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onDragStart={handleDragStartTabList}
          className="group/tabs-list flex"
          draggable
        >
          <div className="flex flex-1 items-center">
            {children.map((child) => (
              <div className="relative" key={child.id}>
                <TabsTrigger
                  value={child.id}
                  draggable
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onClick={onTabClick}
                  data-id={child.id}
                >
                  {child.title}
                </TabsTrigger>
                <DropZoneIndicator dropZone={draggedTabId === child.id ? dropZone : null} type="tab" />
              </div>
            ))}
          </div>
          <div className="absolute end-1 opacity-0 transition-opacity duration-100 group-hover/tabs-list:opacity-100">
            <IconButton
              size="sm"
              variant="tertiary"
              onClick={() => panelRef?.current?.expand()}
              className={cn(
                "hidden",
                "[[data-panel-direction=vertical][data-panel-collapsed=true]:not(:has([data-panel-direction]))_&]:flex",
              )}
            >
              <Icon name="expand-vertical" />
            </IconButton>
            <IconButton
              size="sm"
              variant="tertiary"
              className={cn(
                "hidden",
                "[[data-panel-direction=vertical][data-panel-collapsed=false]:not(:has([data-panel-direction]))_&]:flex",
              )}
              onClick={() => panelRef?.current?.collapse()}
            >
              <Icon name="collapse-vertical" />
            </IconButton>
            <IconButton
              size="sm"
              variant="tertiary"
              className={cn(
                "hidden",
                "[[data-panel-direction=horizontal][data-panel-collapsed=false]:not(:has([data-panel-group-direction]))_&]:flex",
              )}
              onClick={() => panelRef?.current?.collapse()}
            >
              <Icon name="collapse-horizontal" />
            </IconButton>

            <IconButton
              size="sm"
              variant="tertiary"
              className={cn(
                "hidden",
                "[[data-panel-direction=horizontal][data-panel-collapsed=true]:not(:has([data-panel-group-direction]))_&]:flex",
              )}
              onClick={() => panelRef?.current?.expand()}
            >
              <Icon name="expand-horizontal" />
            </IconButton>
          </div>
        </TabsList>
        {children.map((child) => (
          <TabsContent
            value={child.id}
            key={child.id}
            className="h-[calc(100%-theme(spacing.9))] w-full [[data-panel-collapsed=true]_&]:hidden"
          >
            {child.children}
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
};
