"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ChallengeList } from "@/shared";
import { DEFAULT_LOCALE, REPO } from "@/shared/src/constants";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { Badge, Button, Icon } from "../ui";

interface SpotlightProps {
  items: ChallengeList;
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
      <Button
        variant="secondary"
        size="sm"
        className="shadow-input ring-(--color-bd) hidden ring-1 md:flex"
        onClick={() => setOpen(true)}
      >
        <span className="text-(--color-fg) hidden text-sm lg:inline-flex">Search...</span>
        <kbd className="border-(--color-bd) bg-(--color-bg-neutral) pointer-events-none ml-8 h-4 select-none items-center gap-1 rounded-sm px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
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
                className="flex items-center justify-between gap-2"
                key={item.path}
                onSelect={() => {
                  router.push(`/challenges/${item.path}`);
                  setOpen(false);
                }}
              >
                <span>{item.info[DEFAULT_LOCALE]?.title}</span>
                <Badge variant={item.difficulty}>{item.difficulty}</Badge>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
