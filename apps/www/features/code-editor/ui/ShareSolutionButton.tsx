import { useSandpack } from "@codesandbox/sandpack-react";

import type { Challenge, SupportedTemplates } from "~/entities/challenge/model/types";

import { Button } from "~/components/ui";
import { generateShareAnswerURL } from "~/entities/challenge/lib/generateShareAnswerURL";

type ShareSolutionProps = {
  challenge: Challenge;
  template?: SupportedTemplates;
};

export function ShareSolutionButton(props: ShareSolutionProps) {
  const { challenge, template } = props;
  const { sandpack } = useSandpack();
  const { files } = sandpack;

  const onPress = () => {
    const URL = generateShareAnswerURL({
      challenge,
      template,
      files,
    });

    if (URL !== "") {
      window.open(URL, "_blank")?.focus();
    }
  };

  return (
    <Button variant="secondary" onPress={onPress} className="hidden sm:flex">
      Share Solution
    </Button>
  );
}
