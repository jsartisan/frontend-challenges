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
import { Badge, Icon } from "../ui";

interface SpotlightProps {
  items: SearchItem[];
}

export default function SpotLight(props: SpotlightProps) {
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
        className="text-muted-foreground hover:text-accent-foreground focus-visible:ring-ring relative hidden h-8 w-full !scale-100 animate-fade-in items-center justify-start whitespace-nowrap rounded-[0.5rem] border border-[var(--color-border)] bg-background px-4 py-2 text-sm font-normal opacity-0 shadow-none transition-colors delay-300 hover:bg-[var(--color-bg-neutral)] focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 sm:flex sm:pr-12 md:inline-flex md:w-20 lg:w-[180px]"
      >
        <span className="hidden lg:inline-flex">Search...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded-[var(--radius-sm)] border-[var(--color-border)] bg-[var(--color-bg-neutral)] px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search Challenges,..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Links">
            <CommandItem
              onSelect={() => {
                router.push("/");
                setOpen(false);
              }}
            >
              <Icon name="home" />
              <span>Home</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                router.push("/challenges");
                setOpen(false);
              }}
            >
              <Icon name="challenge" />
              <span>Challenges</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                router.push("/blog");
                setOpen(false);
              }}
            >
              <Icon name="blog" />
              <span>Blog</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                window.open(REPO, "_blank")?.focus();
                setOpen(false);
              }}
            >
              <Icon name="github" />
              <span>Github</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Challenges">
            {items.map((item) => (
              <CommandItem
                className="flex items-center justify-between  gap-2"
                key={item.path}
                onSelect={() => {
                  router.push(`/challenges/${item.path}`);
                  setOpen(false);
                }}
              >
                <span>{item.title}</span>
                <Badge variant={item.difficulty}>{item.difficulty}</Badge>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
