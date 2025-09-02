"use client";

import { createContext, useState } from "react";

import { setLocalStorageItem } from "~/shared/lib/localStorage";

type Layout = "layout-1" | "layout-2" | "layout-3";

type LayoutContextProps = {
  layout: Layout;
  setLayout: (layout: Layout) => void;
};

export const LayoutContext = createContext<LayoutContextProps>({
  layout: "layout-1",
  setLayout: () => {},
});

type LayoutProviderProps = {
  children: React.ReactNode;
};

export function LayoutProvider(props: LayoutProviderProps) {
  const { children } = props;
  const [layout, setLayout] = useState<Layout>("layout-1");

  const change = (layout: Layout) => {
    setLayout(layout);
    setLocalStorageItem(`layout`, layout);
  };

  return <LayoutContext.Provider value={{ layout, setLayout: change }}>{children}</LayoutContext.Provider>;
}
