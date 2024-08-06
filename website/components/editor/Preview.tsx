"use client";

import { SandpackPreview, SandpackTests, useSandpack } from "@codesandbox/sandpack-react";
import { Card } from "../ui/card";
import { cn } from "@/website/utils/helpers";
import { useEffect, useState } from "react";
import { SupportedTemplates } from "@/types";
import { TEMPLATES } from "@/website/templates";
import { memo } from "react";

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
  const mode = "mode" in TEMPLATES[template] ? (TEMPLATES[template] as any).mode : undefined;
  const showTestsOnly = isTestFile || mode == "tests";
  const showPreviewOnly = !(isTestFile || mode == "tests");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <Card className={cn("relative flex h-full w-full flex-col overflow-hidden", className)}>
      {loading ? (
        <div className="flex h-full flex-col justify-center gap-2 text-center">
          <p className="animate-spin text-3xl">⚙️</p>
          <p className="text-lg font-semibold">Loading Preview...</p>
        </div>
      ) : (
        <>
          {showTestsOnly && <SandpackTests className={cn("!absolute !inset-0 z-10")} />}
          {showPreviewOnly && (
            <SandpackPreview
              showOpenNewtab
              showNavigator
              showOpenInCodeSandbox={false}
              className={cn("!absolute !inset-0", showPreviewOnly ? "z-10" : "z-0")}
            />
          )}
        </>
      )}
    </Card>
  );
}

const MemoizedPreview = memo(Preview);

export default MemoizedPreview;
