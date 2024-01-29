"use client";

import { Question, SupportedTemplates } from "@/types";
import { Button } from "@/components/ui";
import { getShareSolutionURL } from "@/utils/questions";
import { useSandpack } from "@codesandbox/sandpack-react";

type ShareSolutionProps = {
  question: Question;
  template: SupportedTemplates;
};

function ShareSolutionButton(props: ShareSolutionProps) {
  const { question, template } = props;
  const { sandpack } = useSandpack();
  const { files } = sandpack;

  const onClick = () => {
    const URL = getShareSolutionURL({
      question,
      template,
      files,
    });

    if (URL !== "") {
      window.open(URL, "_blank")?.focus();
    }
  };

  return (
    <Button variant="secondary" onClick={onClick}>
      Share Solution
    </Button>
  );
}

export { ShareSolutionButton };
