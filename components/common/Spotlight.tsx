"use client";

import * as React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { REPO } from "@/constants";
import { SearchItem } from "@/types";
import { useRouter } from "next/navigation";

interface SpotlightProps {
  items: SearchItem[];
}

export function SpotLight(props: SpotlightProps) {
  const router = useRouter();
  const { items } = props;
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative inline-flex h-8 w-full items-center justify-start whitespace-nowrap rounded-[0.5rem] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2 text-sm font-normal text-muted-foreground shadow-none transition-colors hover:bg-[var(--color-bg-neutral)] hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sm:pr-12 md:w-20 lg:w-[180px]"
      >
        <span className="hidden lg:inline-flex">Search...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded-[var(--radius-sm)] border-[var(--color-border)] bg-[var(--color-bg-neutral)] px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Links">
            <CommandItem>
              <span>Home</span>
            </CommandItem>
            <CommandItem onSelect={() => router.push("/challenges")}>
              <span>Challenges</span>
            </CommandItem>
            <CommandItem onSelect={() => router.push("/blog")}>
              <span>Blog</span>
            </CommandItem>
            <CommandItem onSelect={() => window.open(REPO, "_blank")?.focus()}>
              <span>Github</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Challenges">
            {items.map((item) => (
              <CommandItem key={item.path} onSelect={() => router.push(`/challenges/${item.path}`)}>
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
