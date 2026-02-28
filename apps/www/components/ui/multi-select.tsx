import * as React from "react";
import { Check } from "lucide-react";
import { DialogTrigger } from "react-aria-components";

import { Icon } from "./icon";
import { Badge } from "./badge";
import { Button } from "./button";
import { cn } from "~/utils/helpers";
import { Separator } from "./separator";
import { Popover } from "./popover";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./command";

interface MultiSelectProps {
  title?: string;
  selectedValues?: string[];
  setSelectedValues: (values: string[]) => void;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export function MultiSelect(props: MultiSelectProps) {
  const { options, selectedValues: selectedValuesProp = [], setSelectedValues, title } = props;
  const selectedValues = new Set(selectedValuesProp);

  return (
    <DialogTrigger>
      <Button variant="secondary" className="hidden lg:flex">
        <Icon name="plus-circled" />
        {title}
        {selectedValues?.size > 0 && (
          <>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
              {selectedValues.size}
            </Badge>
            <div className="hidden space-x-1 lg:flex">
              {selectedValues.size > 2 ? (
                <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                  {selectedValues.size} selected
                </Badge>
              ) : (
                options
                  .filter((option) => selectedValues.has(option.value))
                  .map((option) => (
                    <Badge variant="secondary" key={option.value} className="rounded-sm px-1 font-normal">
                      {option.label}
                    </Badge>
                  ))
              )}
            </div>
          </>
        )}
      </Button>
      <Popover placement="bottom start" className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={title} autoFocus />
          <CommandList emptyMessage="No results found.">
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    id={option.value}
                    textValue={option.label}
                    onAction={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value);
                      } else {
                        selectedValues.add(option.value);
                      }
                      const filterValues = Array.from(selectedValues);

                      setSelectedValues(filterValues);
                    }}
                  >
                    <div
                      className={cn(
                        "border-border mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                        isSelected ? "text-primary-foreground bg-background" : "[&_svg]:invisible",
                      )}
                    >
                      <Check className={cn("h-4 w-4")} />
                    </div>
                    {option.icon && <option.icon className="text-muted-foreground mr-2 h-4 w-4" />}
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem id="clear-filters" textValue="Clear filters" onAction={() => setSelectedValues([])} className="justify-center text-center">
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </Popover>
    </DialogTrigger>
  );
}
