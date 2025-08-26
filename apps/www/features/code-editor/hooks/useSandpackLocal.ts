import { useContext } from "react";

import { SandpackLocalContext } from "../context/SandpackLocalProvider";

export const useSandpackLocal = () => {
  const context = useContext(SandpackLocalContext);

  if (!context) {
    throw new Error("useSandpackLocal must be used within a SandpackLocalProvider");
  }

  return context;
};
