"use client";

import { useTheme } from "next-themes";
import React from "react";
import { Icon, IconButton } from "../ui";

export function ThemeChanger() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <IconButton variant="tertiary" onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}>
      <Icon name="sun" className="block dark:hidden" />
      <Icon name="moon" className="hidden dark:block " />
      <span className="sr-only">Toggle theme</span>
    </IconButton>
  );
}
