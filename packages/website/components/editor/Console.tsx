"use client";

import { Console as ConsoleFeed } from "console-feed";
import { ImperativePanelHandle } from "react-resizable-panels";
import { ComponentPropsWithRef, MutableRefObject, useState } from "react";
import { useSandpackConsole } from "@codesandbox/sandpack-react";
import {
  Icon,
  IconButton,
  Input,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../ui";
import { Card } from "../ui/card";
import { cn } from "../../utils/helpers";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type Props = {
  className?: string;
  panelRef?: MutableRefObject<ImperativePanelHandle>;
} & ComponentPropsWithRef<"div">;

function Console(props: Props) {
  const { className, panelRef } = props;
  const [filterType, setFilterType] = useState<"warn" | "error" | "info" | "debug" | "all">("all");
  const [consoleFontSize, setConsoleFontSize] = useState(13);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const { logs, reset } = useSandpackConsole({ resetOnPreviewRestart: false });

  const onClickConsolePanel = () => {
    if (panelRef?.current) {
      if (panelRef?.current.isCollapsed()) {
        panelRef.current.expand();
      } else {
        panelRef.current.collapse();
      }
    }
  };

  return (
    <div className="flex h-full flex-grow">
      <Card className={cn("flex h-full w-full flex-col overflow-hidden", className)}>
        <div className={"flex !min-h-10 items-center justify-between"} onClick={onClickConsolePanel}>
          <div className="pl-3 text-base">Console</div>
          <IconButton variant="tertiary" size="sm" className="mx-1">
            <Icon name={"chevron-down"} />
          </IconButton>
        </div>
        <div className={cn("flex items-center gap-2 overflow-hidden border-y border-y-[var(--color-bd)] px-2 py-2")}>
          <Tooltip delayDuration={1}>
            <TooltipTrigger asChild>
              <IconButton variant="tertiary" size="sm" onClick={reset}>
                <Icon name="log-clear" />
              </IconButton>
            </TooltipTrigger>

            <TooltipContent>
              Clear all logs
              <TooltipArrow />
            </TooltipContent>
          </Tooltip>
          <Input
            placeholder="Type here to filter logs"
            className="w-48"
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <ToggleGroup
            type="single"
            size="icon"
            variant="outline"
            onValueChange={(value) => setFilterType(value as any)}
            value={filterType}
          >
            <Tooltip delayDuration={1}>
              <TooltipTrigger asChild>
                <ToggleGroupItem value="all">
                  <Icon name="log-all" />
                </ToggleGroupItem>
              </TooltipTrigger>

              <TooltipContent>
                All logs
                <TooltipArrow />
              </TooltipContent>
            </Tooltip>

            <Tooltip delayDuration={1}>
              <TooltipTrigger asChild>
                <ToggleGroupItem value="error">
                  <Icon name="log-error" className="text-red-500" />
                </ToggleGroupItem>
              </TooltipTrigger>

              <TooltipContent>
                Error logs
                <TooltipArrow />
              </TooltipContent>
            </Tooltip>

            <Tooltip delayDuration={1}>
              <TooltipTrigger asChild>
                <ToggleGroupItem value="warn">
                  <Icon name="log-warning" className="text-yellow-500" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>
                Warning logs
                <TooltipArrow />
              </TooltipContent>
            </Tooltip>

            <Tooltip delayDuration={1}>
              <TooltipTrigger asChild>
                <ToggleGroupItem value="info">
                  <Icon name="log-info" className="text-blue-500" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>
                Info logs
                <TooltipArrow />
              </TooltipContent>
            </Tooltip>
          </ToggleGroup>
          <div className="ms-auto">
            <Popover>
              <PopoverTrigger asChild>
                <IconButton variant="tertiary" type="button" size="sm">
                  <Icon name="settings" />
                </IconButton>
              </PopoverTrigger>
              <PopoverContent align="end">
                <div className="font-bold">Console Settings</div>
                <div className="mt-2 flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    <Label>Font Size</Label>
                    <Select
                      onValueChange={(value: string) => setConsoleFontSize(parseInt(value))}
                      value={consoleFontSize.toString()}
                      defaultValue={consoleFontSize.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select locale" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {[...Array(9)]
                            .map((v, i) => i + 12)
                            .map((fontSize) => (
                              <SelectItem key={fontSize} value={fontSize.toString()}>
                                {fontSize}px
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="overflow-auto">
          <ConsoleFeed
            filter={filterType !== "all" ? [filterType] : undefined}
            searchKeywords={searchKeyword}
            logs={logs as any}
            styles={{
              BASE_FONT_SIZE: consoleFontSize,
            }}
          />
        </div>
      </Card>
    </div>
  );
}

export default Console;
