"use client";

import React from "react";
import { useTheme } from "next-themes";

import { Icon } from "~/components/ui/icon";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

export default function ThemeChanger() {
  const { setTheme, theme } = useTheme();

  return (
    <>
      <ToggleGroup size="icon" variant="ghost" className="shadow-none!">
        <ToggleGroupItem id="light" isSelected={theme === "light"} onChange={() => setTheme("light")}>
          <Icon name="sun" />
        </ToggleGroupItem>
        <ToggleGroupItem id="dark" isSelected={theme === "dark"} onChange={() => setTheme("dark")}>
          <Icon name="moon" />
        </ToggleGroupItem>
        <ToggleGroupItem id="system" isSelected={theme === "system"} onChange={() => setTheme("system")}>
          <Icon name="system" />
        </ToggleGroupItem>
      </ToggleGroup>
    </>
  );
}
