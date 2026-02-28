"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { REPO } from "~/shared/config/paths";
import { Badge, Button, Icon } from "~/components/ui";
import { DEFAULT_LOCALE } from "~/shared/config/locale";
import { ChallengeList } from "~/entities/challenge/model/types";
import {
  Command,
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/components/ui/command";

interface SpotlightProps {
  items: ChallengeList;
}

export function Spotlight(props: SpotlightProps) {
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

  const sortedItems = React.useMemo(() => {
    return items.sort((a, b) => {
      if (a.info[DEFAULT_LOCALE]?.tags?.includes("blind75")) {
        return 1;
      }
      if (b.info[DEFAULT_LOCALE]?.tags?.includes("blind75")) {
        return -1;
      }
      return 0;
    });
  }, [items]);

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        className="shadow-input ring-border active:shadow-input active:bg-accent hidden border-none ring-1 md:flex"
        onPress={() => setOpen(true)}
      >
        <span className="text-foreground hidden text-sm lg:inline-flex">Search...</span>
        <kbd className="border-border bg-muted pointer-events-none ml-8 h-4 select-none items-center gap-1 rounded-sm px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <Command>
        <CommandDialog isOpen={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Search Challenges..." autoFocus />
          <CommandList emptyMessage="No results found.">
            <CommandGroup heading="Links">
              <CommandItem
                id="home"
                textValue="Home"
                onAction={() => {
                  router.push("/");
                  setOpen(false);
                }}
              >
                <Icon name="home" />
                <span>Home</span>
              </CommandItem>
              <CommandItem
                id="challenges"
                textValue="Challenges"
                onAction={() => {
                  router.push("/challenges");
                  setOpen(false);
                }}
              >
                <Icon name="challenge" />
                <span>Challenges</span>
              </CommandItem>
              <CommandItem
                id="blog"
                textValue="Blog"
                onAction={() => {
                  router.push("/blog");
                  setOpen(false);
                }}
              >
                <Icon name="blog" />
                <span>Blog</span>
              </CommandItem>
              <CommandItem
                id="github"
                textValue="Github"
                onAction={() => {
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
              {sortedItems.map((item) => (
                <CommandItem
                  id={item.path}
                  className="flex items-center justify-between gap-2"
                  key={item.path}
                  textValue={item.info[DEFAULT_LOCALE]?.title}
                  onAction={() => {
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
      </Command>
    </>
  );
}
