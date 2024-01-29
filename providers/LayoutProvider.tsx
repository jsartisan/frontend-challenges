"use client";
import { createContext, useContext, useEffect, useState } from "react";

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

  useEffect(() => {
    setLayout(layout);
  }, [layout]);

  const change = (layout: Layout) => {
    if (layout) {
      setLayout(layout);
    }
  };

  return <LayoutContext.Provider value={{ layout, setLayout: change }}>{children}</LayoutContext.Provider>;
}

export function useLayout() {
  const context = useContext(LayoutContext);

  if (context === undefined) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }

  return context;
}
