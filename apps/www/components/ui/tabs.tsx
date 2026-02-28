"use client";

import * as React from "react";
import { tv } from "tailwind-variants";
import {
  composeRenderProps,
  Tab as RACTab,
  TabList as RACTabList,
  TabPanel as RACTabPanel,
  Tabs as RACTabs,
  TabListProps,
  TabPanelProps,
  TabProps,
  TabsProps,
} from "react-aria-components";

import { focusRing } from "~/utils/helpers";

const tabsStyles = tv({
  base: "flex",
  variants: {
    orientation: {
      horizontal: "flex-col",
      vertical: "flex-row",
    },
  },
});

function Tabs(props: TabsProps) {
  return (
    <RACTabs
      data-slot="tabs"
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabsStyles({ ...renderProps, className }),
      )}
    />
  );
}

const tabListStyles = tv({
  base: "text-foreground inline-flex h-9 w-full items-center justify-start gap-2 rounded-none bg-transparent p-1",
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col items-start h-auto",
    },
  },
});

function TabsList<T extends object>(props: TabListProps<T>) {
  return (
    <RACTabList
      data-slot="tabs-list"
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabListStyles({ ...renderProps, className }),
      )}
    />
  );
}

const tabTriggerStyles = tv({
  extend: focusRing,
  base: [
    "bs-7 relative inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-sm px-2 text-xs font-medium transition-colors outline-none",
    "hover:bg-accent pressed:bg-accent",
    "[&_svg]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  variants: {
    isSelected: {
      true: [
        "before:bg-primary before:absolute before:-bottom-[calc(4px)] before:h-[2px] before:w-[calc(100%+4px)] before:content-['']",
        "[[data-panel-size='0.0']_&]:before:hidden",
      ],
    },
    isDisabled: {
      true: "opacity-50 pointer-events-none",
    },
  },
});

function TabsTrigger(props: TabProps) {
  return (
    <RACTab
      data-slot="tabs-trigger"
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabTriggerStyles({ ...renderProps, className }),
      )}
    />
  );
}

const tabPanelStyles = tv({
  extend: focusRing,
  base: "border-t-border h-[calc(100%-(--spacing(9)))] border-t outline-none",
});

function TabsContent(props: TabPanelProps) {
  return (
    <RACTabPanel
      data-slot="tabs-content"
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabPanelStyles({ ...renderProps, className }),
      )}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
