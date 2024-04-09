"use client";

import { useTheme } from "next-themes";
import React, { useEffect } from "react";
import { Icon, IconButton, ToggleGroup, ToggleGroupItem } from "../ui";

export default function ThemeChanger() {
  const { resolvedTheme, setTheme } = useTheme();

  const onValueChange = (value: string) => {
    if (value === "" || value === resolvedTheme) return;

    setTheme(value);
  };

  return (
    <>
      <ToggleGroup variant="ghost" size="icon" type="single" value={resolvedTheme} onValueChange={onValueChange}>
        <ToggleGroupItem value="light">
          <Icon name="sun" />
        </ToggleGroupItem>
        <ToggleGroupItem value="dark">
          <Icon name="moon" />
        </ToggleGroupItem>
        <ToggleGroupItem value="system">
          <Icon name="book" />
        </ToggleGroupItem>
      </ToggleGroup>
    </>
  );
}
