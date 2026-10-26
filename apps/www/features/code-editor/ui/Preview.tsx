"use client";

import { useEffect, useRef, useState } from "react";
import { SandpackPreview, SandpackTests, useSandpack } from "@codesandbox/sandpack-react";

import { cn } from "~/utils/helpers";
import { track } from "~/shared/lib/analytics";
import { TEMPLATES } from "~/entities/challenge/model/templates";
import { SupportedTemplates } from "~/entities/challenge/model/types";

type Specs = Parameters<NonNullable<React.ComponentProps<typeof SandpackTests>["onComplete"]>>[0];
type Describe = Specs[string];

type PreviewProps = {
  className?: string;
  isTestsMode?: boolean;
  template: SupportedTemplates;
  // when set, test results are reported to analytics with these properties
  analyticsProperties?: Record<string, unknown>;
};

function countTests(describe: Describe, counts = { passed: 0, failed: 0 }) {
  Object.values(describe.tests).forEach((test) => {
    if (test.status === "pass") counts.passed += 1;
    if (test.status === "fail") counts.failed += 1;
  });

  Object.values(describe.describes).forEach((child) => countTests(child as Describe, counts));

  return counts;
}

export function Preview(props: PreviewProps) {
  const { analyticsProperties, className, template = "vanilla" } = props;
  const lastTestResult = useRef<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { sandpack } = useSandpack();
  const { activeFile } = sandpack;
  const isTestFile = activeFile.includes(".test.");
  const mode = "mode" in TEMPLATES[template] ? (TEMPLATES[template] as any).mode : undefined;
  const showTestsOnly = isTestFile || mode == "tests";
  const showPreviewOnly = !(isTestFile || mode == "tests");

  // tests re-run on every edit in watch mode, so only report when the outcome changes
  const onTestsComplete = (specs: Specs) => {
    if (!analyticsProperties) return;

    const counts = { passed: 0, failed: 0, errored: 0 };

    Object.values(specs).forEach((spec) => {
      if (spec.error) counts.errored += 1;
      countTests(spec, counts);
    });

    const total = counts.passed + counts.failed;
    const allPassed = total > 0 && counts.failed === 0 && counts.errored === 0;
    const result = `${counts.passed}/${counts.failed}/${counts.errored}`;
    const previousResult = lastTestResult.current;

    if (result === previousResult) return;

    lastTestResult.current = result;

    const properties = {
      ...analyticsProperties,
      tests_total: total,
      tests_passed: counts.passed,
      tests_failed: counts.failed,
      has_errors: counts.errored > 0,
      all_passed: allPassed,
    };

    track("Tests Run", properties);

    if (allPassed) {
      track("Tests Passed", properties);
    }
  };

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
    <div className={cn("relative flex h-full w-full flex-col overflow-hidden", className)}>
      {loading ? (
        <div className="flex h-full flex-col justify-center gap-2 text-center">
          <p className="animate-spin text-3xl">⚙️</p>
          <p className="text-lg font-semibold">Loading Preview...</p>
        </div>
      ) : (
        <>
          {showTestsOnly && <SandpackTests onComplete={onTestsComplete} className={cn("absolute! inset-0! z-10")} />}
          {showPreviewOnly && (
            <SandpackPreview
              showOpenNewtab
              showNavigator
              showOpenInCodeSandbox={false}
              className={cn("absolute! inset-0!", showPreviewOnly ? "z-10" : "z-0")}
            />
          )}
        </>
      )}
    </div>
  );
}
