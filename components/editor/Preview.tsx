"use client";

import { SandpackPreview, SandpackTests, useSandpack } from "@codesandbox/sandpack-react";
import { Card } from "../ui/card";
import { cn } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { SupportedTemplates } from "@/types";
import { TEMPLATES } from "@/templates";

type PreviewProps = {
  className?: string;
  isTestsMode?: boolean;
  template: SupportedTemplates;
};

export default function Preview(props: PreviewProps) {
  const { className, template = "vanilla" } = props;
  const [loading, setLoading] = useState(true);
  const { sandpack } = useSandpack();
  const { activeFile } = sandpack;
  const isTestFile = activeFile.includes(".test.");
  const mode = "mode" in TEMPLATES[template] ? TEMPLATES[template].mode : undefined;

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
          <SandpackTests
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
        </>
      )}
    </Card>
  );
}
