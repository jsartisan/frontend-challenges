"use client";

import { createContext, useState } from "react";

import { STORAGE_KEY } from "~/shared/config/storage";

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
    localStorage.setItem(`${STORAGE_KEY}:layout`, layout);
  };

  return <LayoutContext.Provider value={{ layout, setLayout: change }}>{children}</LayoutContext.Provider>;
}
