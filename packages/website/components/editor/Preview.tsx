"use client";

import { useEffect, useState, memo } from "react";
import { SandpackPreview, SandpackTests, useSandpack } from "@codesandbox/sandpack-react";

import { Card } from "../ui/card";
import { cn } from "../../utils/helpers";
import { TEMPLATES } from "@frontend-challenges/shared/src/templates";
import { SupportedTemplates } from "@frontend-challenges/shared";

type PreviewProps = {
  className?: string;
  isTestsMode?: boolean;
  template: SupportedTemplates;
  dispatchTestsRanEvent?: boolean;
};

function Preview(props: PreviewProps) {
  const { className, template = "vanilla", dispatchTestsRanEvent } = props;
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

  useEffect(() => {
    if (showPreviewOnly) {
      sandpack.runSandpack();
    }
  }, [showPreviewOnly]);

  return (
    <Card className={cn("relative flex h-full w-full flex-col overflow-hidden", className)}>
      {loading ? (
        <div className="flex h-full flex-col justify-center gap-2 text-center">
          <p className="animate-spin text-3xl">⚙️</p>
          <p className="text-lg font-semibold">Loading Preview...</p>
        </div>
      ) : (
        <>
          {showTestsOnly && (
            <SandpackTests
              onComplete={(specs) => {
                dispatchTestsRanEvent &&
                  document.dispatchEvent(
                    new CustomEvent("tests-ran", {
                      detail: {
                        passed: Object.values(specs).every((spec) => {
                          return Object.values(spec.describes).every((describe) => {
                            return Object.values(describe.tests).every((test) => {
                              return test.status === "pass";
                            });
                          });
                        }),
                      },
                      bubbles: true,
                    }),
                  );
              }}
              className={cn("!absolute !inset-0")}
            />
          )}
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
