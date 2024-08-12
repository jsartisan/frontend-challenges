"use client";

import { useSandpack } from "@codesandbox/sandpack-react";
import { Challenge, SupportedTemplates } from "@frontend-challenges/shared";

import { Button } from "../ui";
import { getShareAnswerURL } from "../../utils/answers";
import { useEffect, useState } from "react";

type ShareSolutionProps = {
  challenge: Challenge;
  template?: SupportedTemplates;
};

function ShareSolutionButton(props: ShareSolutionProps) {
  const { challenge, template } = props;
  const { sandpack } = useSandpack();
  const [active, setActive] = useState(false);
  const { files } = sandpack;

  useEffect(() => {
    document.addEventListener("tests-ran", (event: CustomEvent) => {
      setActive(event.detail.passed);
    });

    return () => {
      document.removeEventListener("tests-ran", (event: CustomEvent) => {
        setActive(event.detail.passed);
      });
    };
  }, []);

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
    <Button disabled={!active} variant="secondary" onClick={onClick} className="hidden sm:flex">
      Share Solution
    </Button>
  );
}

export { ShareSolutionButton };
