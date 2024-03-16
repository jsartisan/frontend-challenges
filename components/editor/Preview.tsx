"use client";

import { memo } from "react";
import { cn } from "@/utils/helpers";
import { TEMPLATES } from "@/templates";
import { useEffect, useState } from "react";
import { SupportedTemplates } from "@/types";

import { Card } from "../ui/card";
import { Tabs, TabsList, TabsTrigger } from "../ui";
import { SandpackConsole, SandpackPreview, SandpackTests, useSandpack } from "@codesandbox/sandpack-react";

type PreviewProps = {
  className?: string;
  isTestsMode?: boolean;
  template: SupportedTemplates;
};

function Preview(props: PreviewProps) {
  const { className, template = "vanilla" } = props;
  const [loading, setLoading] = useState(true);
  const { sandpack } = useSandpack();
  const { activeFile } = sandpack;
  const isTestFile = activeFile.includes(".test.");
  const mode = "mode" in TEMPLATES[template] ? TEMPLATES[template].mode : undefined;
  const [activeTab, setActiveTab] = useState<"console" | "preview">("preview");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  // const { logs } = useSandpackConsole({ resetOnPreviewRestart: true });

  // console.log({ logs });

  return (
    <Card className={cn("relative flex h-full w-full flex-col overflow-hidden", className)}>
      {loading ? (
        <div className="flex h-full flex-col justify-center gap-2 text-center">
          <p className="animate-spin text-3xl">⚙️</p>
          <p className="text-lg font-semibold">Loading Preview...</p>
        </div>
      ) : (
        <>
          <div className="absolute inset-0">
            <Tabs value={activeTab} className="absolute inset-0" onValueChange={(value) => setActiveTab(value as any)}>
              <TabsList>
                <TabsTrigger value="preview">{mode === "tests" ? "Tests" : "Preview"}</TabsTrigger>
                <TabsTrigger value="console">Console</TabsTrigger>
              </TabsList>
              <div className={cn("relative hidden h-[calc(100%-40px)] w-full", activeTab === "preview" && "block")}>
                <SandpackTests
                  showWatchButton={false}
                  showVerboseButton={false}
                  className={cn(
                    "!absolute !bottom-0 !left-0 !right-0 !top-0",
                    isTestFile || mode == "tests" ? "z-10" : "z-0",
                  )}
                />
                <SandpackPreview
                  showOpenNewtab
                  showNavigator
                  showOpenInCodeSandbox={false}
                  className={cn(
                    "!absolute !bottom-0 !left-0 !right-0 !top-0",
                    isTestFile || mode == "tests" ? "z-0" : "z-10",
                  )}
                />
              </div>
              <div className={cn("relative hidden h-[calc(100%-40px)]", activeTab === "console" && "block")}>
                <SandpackConsole showHeader />
              </div>
            </Tabs>
          </div>
        </>
      )}
    </Card>
  );
}

const MemoizedPreview = memo(Preview);

export default MemoizedPreview;
