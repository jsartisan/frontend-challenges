"use client";

import { SandpackConsole, SandpackPreview, SandpackTests, useSandpack } from "@codesandbox/sandpack-react";
import { Card } from "../ui/card";
import { cn } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { SupportedTemplates } from "@/types";
import { TEMPLATES } from "@/templates";
import { memo } from "react";
import { Button } from "../ui";

type PreviewProps = {
  className?: string;
  isTestsMode?: boolean;
  template: SupportedTemplates;
};

function Preview(props: PreviewProps) {
  const { className, template = "vanilla" } = props;
  const [loading, setLoading] = useState(true);
  const [showLogs, setShowLogs] = useState(false);
  const { sandpack } = useSandpack();
  const { activeFile } = sandpack;
  const isTestFile = activeFile.includes(".test.");
  const mode = "mode" in TEMPLATES[template] ? (TEMPLATES[template] as any).mode : undefined;
  const showTestsOnly = (isTestFile || mode == "tests") && !showLogs;
  const showPreviewOnly = !(isTestFile || mode == "tests" || showLogs);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const showLogButton = (
    <Button size="sm" className="rounded-xl" variant="tertiary" onClick={() => setShowLogs((prev) => !prev)}>
      {showLogs ? "Hide Logs" : "Show Logs"}
    </Button>
  );

  return (
    <Card className={cn("relative flex h-full w-full flex-col overflow-hidden", className)}>
      {loading ? (
        <div className="flex h-full flex-col justify-center gap-2 text-center">
          <p className="animate-spin text-3xl">⚙️</p>
          <p className="text-lg font-semibold">Loading Preview...</p>
        </div>
      ) : (
        <>
          <SandpackConsole
            actionsChildren={showLogButton}
            className={cn("!absolute !inset-0", showLogs ? "z-10" : "z-0")}
          />
          <SandpackTests
            actionsChildren={showLogButton}
            className={cn("!absolute !inset-0", showTestsOnly ? "z-10" : "z-0")}
          />
          <SandpackPreview
            showOpenNewtab
            showNavigator
            actionsChildren={showLogButton}
            showOpenInCodeSandbox={false}
            className={cn("!absolute !inset-0", showPreviewOnly ? "z-10" : "z-0")}
          />
        </>
      )}
    </Card>
  );
}

const MemoizedPreview = memo(Preview);

export default MemoizedPreview;
