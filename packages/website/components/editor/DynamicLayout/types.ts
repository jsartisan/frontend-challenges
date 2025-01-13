import { ResizablePanel } from "@/web/components/ui/resizable";

type Direction = "horizontal" | "vertical";

export type LayoutItem = LayoutPanel | LayoutGroup;

export type LayoutTab = {
  id: string;
  title: string;
  children: React.ReactNode;
};

export type LayoutGroup = {
  id: string;
  direction: Direction;
  children: LayoutItem[];
};

export type LayoutPanel = Omit<React.ComponentProps<typeof ResizablePanel>, "children"> & {
  id: string;
  children: string[];
  defaultCollapsed?: boolean;
};
