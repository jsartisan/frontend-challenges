import { useSandpack } from "@codesandbox/sandpack-react";

import { Button } from "~/components/ui";
import { getShareAnswerURL } from "~/utils/answers";
import { Challenge, SupportedTemplates } from "@/shared";

type ShareSolutionProps = {
  challenge: Challenge;
  template?: SupportedTemplates;
};

export function ShareSolutionButton(props: ShareSolutionProps) {
  const { challenge, template } = props;
  const { sandpack } = useSandpack();
  const { files } = sandpack;

  const onClick = () => {
    const URL = getShareAnswerURL({
      challenge,
      template,
      files,
    });

    if (URL !== "") {
      window.open(URL, "_blank")?.focus();
    }
  };

  return (
    <Button variant="secondary" onClick={onClick} className="hidden sm:flex">
      Share Solution
    </Button>
  );
}
