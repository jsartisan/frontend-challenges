"use client";

import { Console as ConsoleFeed } from "console-feed";
import { ImperativePanelHandle } from "react-resizable-panels";
import { ComponentPropsWithRef, useRef, useState } from "react";
import { useSandpackConsole } from "@codesandbox/sandpack-react";
import {
  Icon,
  IconButton,
  Input,
  ResizablePanel,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
} from "../ui";
import { Card } from "../ui/card";
import { cn } from "../../utils/helpers";

type Props = {
  className?: string;
} & ComponentPropsWithRef<"div">;

export function Console(props: Props) {
  const { className, ...rest } = props;
  const ref = useRef<ImperativePanelHandle>(null);
  const [filterType, setFilterType] = useState<"warn" | "error" | "info" | "debug" | "all">("all");
  const [consoleCollapsed, setConsoleCollapsed] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const { logs, reset } = useSandpackConsole({ resetOnPreviewRestart: true });

  const onClickConsolePanel = () => {
    if (ref.current) {
      if (consoleCollapsed) {
        ref.current.expand();
      } else {
        ref.current.collapse();
      }
    }
  };

  return (
    <ResizablePanel
      collapsible
      collapsedSizePixels={40}
      minSizePixels={200}
      className="min-h-[200px] sm:min-h-0"
      ref={ref}
      onCollapse={() => {
        setConsoleCollapsed(true);
      }}
      onExpand={() => {
        setConsoleCollapsed(false);
      }}
    >
      <div className="flex h-full flex-grow" data-is-collpased={consoleCollapsed}>
        <Card className={cn("flex h-full w-full flex-col overflow-hidden", className)} {...rest}>
          <div className="flex items-center justify-between" style={{ minHeight: 38 }} onClick={onClickConsolePanel}>
            <div className="pl-3 text-base">Console</div>
            <IconButton variant="tertiary" size="sm" className="mx-1">
              <Icon name={consoleCollapsed ? "chevron-up" : "chevron-down"} />
            </IconButton>
          </div>
          <div className="flex items-center gap-2 border-y border-y-[var(--color-bd)] px-2 py-2">
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
              <Tooltip>
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

              <Tooltip>
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

              <Tooltip>
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

              <Tooltip>
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
            <Tooltip>
              <TooltipTrigger asChild>
                <IconButton variant="tertiary" size="sm" className="ml-auto" onClick={reset}>
                  <Icon name="log-clear" />
                </IconButton>
              </TooltipTrigger>

              <TooltipContent>
                Clear all logs
                <TooltipArrow />
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="overflow-auto">
            <ConsoleFeed
              filter={filterType !== "all" ? [filterType] : undefined}
              searchKeywords={searchKeyword}
              logs={logs as any}
            />
          </div>
        </Card>
      </div>
    </ResizablePanel>
  );
}

export default Console;
