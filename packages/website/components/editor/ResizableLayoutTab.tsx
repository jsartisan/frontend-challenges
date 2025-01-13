import React from "react";
import { Tabs } from "../ui/tabs";
import { Card } from "../ui";

import { cn } from "packages/website/utils/helpers";

type ResizableLayoutTabProps = {
  children: React.ReactNode;
  defaultValue: string;
};

export const ResizableLayoutTab = ({ children, defaultValue }: ResizableLayoutTabProps) => {
  return (
    <Card className="h-full w-full overflow-hidden">
      <Tabs
        defaultValue={defaultValue}
        className={cn(
          "h-full w-full flex-col",
          "[[data-panel-size='0.0'][data-panel-direction=horizontal]_&]:[writing-mode:tb]",
        )}
      >
        {children}
      </Tabs>
    </Card>
  );
};
