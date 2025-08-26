"use client";

import React from "react";
import { useTheme } from "next-themes";

import { Icon, ToggleGroup, ToggleGroupItem } from "~/components/ui";

export default function ThemeChanger() {
  const { setTheme, theme } = useTheme();

  const onValueChange = (value: string) => {
    if (value === "" || value === theme) return;

    setTheme(value);
  };

  return (
    <>
      <ToggleGroup size="icon" variant="ghost" type="single" value={theme} onValueChange={onValueChange}>
        <ToggleGroupItem value="light">
          <Icon name="sun" />
        </ToggleGroupItem>
        <ToggleGroupItem value="dark">
          <Icon name="moon" />
        </ToggleGroupItem>
        <ToggleGroupItem value="system">
          <Icon name="system" />
        </ToggleGroupItem>
      </ToggleGroup>
    </>
  );
}
