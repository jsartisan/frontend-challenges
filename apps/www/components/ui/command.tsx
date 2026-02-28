"use client";

import * as React from "react";
import { SearchIcon } from "lucide-react";
import {
  Autocomplete,
  Collection,
  Header,
  Input,
  ListBoxSection,
  ListLayout,
  Menu,
  MenuItem,
  MenuSection,
  Separator,
  TextField,
  useFilter,
  Virtualizer,
  type SeparatorProps,
  type TextFieldProps,
} from "react-aria-components";

import { cn } from "~/utils/helpers";

import { Modal } from "./modal";
import { Dialog, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";

interface CommandContextValue {
  filter: (string: string, substring: string) => boolean;
  value?: string;
  onValueChange?: (value: string) => void;
}

const CommandContext = React.createContext<CommandContextValue | null>(null);

function useCommandContext() {
  const context = React.useContext(CommandContext);
  if (!context) {
    throw new Error("Command components must be used within a Command component");
  }
  return context;
}

interface CommandProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
  filter?: CommandContextValue["filter"];
  filterBehavior?: "contains" | "startsWith";
}

function Command({ children, className, filterBehavior = "contains", onValueChange, value, ...props }: CommandProps) {
  const { contains, startsWith } = useFilter({ sensitivity: "base" });
  const filter = filterBehavior === "contains" ? contains : startsWith;

  const contextValue = React.useMemo(() => ({ filter, value, onValueChange }), [filter, value, onValueChange]);

  return (
    <CommandContext.Provider value={contextValue}>
      <div
        data-slot="command"
        className={cn(
          "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
          className,
        )}
        {...props}
      >
        <Autocomplete filter={filter}>{children}</Autocomplete>
      </div>
    </CommandContext.Provider>
  );
}

function CommandDialog({
  children,
  className,
  description = "Search for a command to run...",
  showCloseButton = true,
  title = "Command Palette",
  ...props
}: React.ComponentProps<typeof DialogTrigger> & {
  title?: string;
  description?: string;
  className?: string;
  showCloseButton?: boolean;
}) {
  return (
    <DialogTrigger {...props}>
      <Modal>
        <Dialog className={cn("w-[600px] overflow-hidden p-0", className)}>
          <DialogHeader className="sr-only">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <Command className="[&_[data-slot=command-group-heading]]:text-muted-foreground [&_[data-slot=command-group-heading]]:px-2 [&_[data-slot=command-group-heading]]:font-medium [&_[data-slot=command-group]:not([hidden])_~[data-slot=command-group]]:pt-0 [&_[data-slot=command-group]]:px-2 [&_[data-slot=command-input-wrapper]]:h-12 [&_[data-slot=command-input-wrapper]_svg]:h-5 [&_[data-slot=command-input-wrapper]_svg]:w-5 [&_[data-slot=command-input]]:h-12 [&_[data-slot=command-item]]:px-2 [&_[data-slot=command-item]]:py-3 [&_[data-slot=command-item]_svg]:h-5 [&_[data-slot=command-item]_svg]:w-5">
            {children}
          </Command>
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}

interface CommandInputProps extends Omit<TextFieldProps, "children"> {
  inputClassName?: string;
  wrapperClassName?: string;
  placeholder?: string;
}

function CommandInput({
  inputClassName,
  placeholder = "Type a command or search...",
  wrapperClassName,
  ...props
}: CommandInputProps) {
  return (
    <TextField
      aria-label="Search commands"
      className={cn("flex h-9 items-center gap-2 border-b px-3", wrapperClassName)}
      data-slot="command-input-wrapper"
      {...props}
    >
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <Input
        placeholder={placeholder}
        className={cn(
          "placeholder:text-muted-foreground outline-hidden flex h-10 w-full rounded-md bg-transparent py-3 text-sm disabled:cursor-not-allowed disabled:opacity-50",
          inputClassName,
        )}
        data-slot="command-input"
      />
    </TextField>
  );
}

interface CommandListProps extends React.ComponentProps<typeof Menu> {
  emptyMessage?: React.ReactNode;
  enableVirtualization?: boolean;
}

function CommandList({ children, className, emptyMessage, enableVirtualization = false, ...props }: CommandListProps) {
  if (!enableVirtualization) {
    return (
      <Menu
        data-slot="command-list"
        className={cn("outline-hidden max-h-[300px] scroll-py-1 overflow-y-auto overflow-x-hidden", className)}
        renderEmptyState={() => emptyMessage && <CommandEmpty>{emptyMessage}</CommandEmpty>}
        {...props}
      >
        <Collection>{children}</Collection>
      </Menu>
    );
  }

  return (
    <Virtualizer
      layout={ListLayout}
      layoutOptions={{
        estimatedRowHeight: 36,
        estimatedHeadingHeight: 32,
        gap: 0,
        padding: 4,
      }}
    >
      <Menu
        data-slot="command-list"
        className={cn("outline-hidden max-h-[300px] scroll-py-1 overflow-y-auto overflow-x-hidden", className)}
        renderEmptyState={() => emptyMessage && <CommandEmpty>{emptyMessage}</CommandEmpty>}
        {...props}
      >
        <Collection>{children}</Collection>
      </Menu>
    </Virtualizer>
  );
}

interface CommandEmptyProps {
  children: React.ReactNode;
  className?: string;
}

function CommandEmpty({ children, className }: CommandEmptyProps) {
  return (
    <div data-slot="command-empty" className={cn("py-6 text-center text-sm", className)}>
      {children}
    </div>
  );
}

interface CommandGroupProps extends Omit<React.ComponentProps<typeof ListBoxSection<object>>, "children"> {
  heading?: string;
  children: React.ReactNode;
}

function CommandGroup({ children, className, heading, ...props }: CommandGroupProps) {
  return (
    <MenuSection data-slot="command-group" className={cn("text-foreground overflow-hidden p-1", className)} {...props}>
      {heading && (
        <Header data-slot="command-group-heading" className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
          {heading}
        </Header>
      )}
      <Collection>{children}</Collection>
    </MenuSection>
  );
}

function CommandSeparator({ className, ...props }: SeparatorProps) {
  return <Separator data-slot="command-separator" className={cn("bg-border -mx-1 h-px", className)} {...props} />;
}

interface CommandItemProps extends Omit<React.ComponentProps<typeof MenuItem>, "children"> {
  children: React.ReactNode;
}

function CommandItem({ children, className, ...props }: CommandItemProps) {
  return (
    <MenuItem
      data-slot="command-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground outline-hidden relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      {children}
    </MenuItem>
  );
}

function CommandShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn("text-muted-foreground ml-auto text-xs tracking-widest", className)}
      {...props}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
