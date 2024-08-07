"use client";

import { useState } from "react";
import { DOMAIN } from "@frontend-challenges/shared";
import { useSandpack } from "@codesandbox/sandpack-react";
import type { SupportedTemplates } from "@frontend-challenges/shared";

import { Button } from "../../components/ui";

type SharePlaygroundButtonProps = {
  template?: SupportedTemplates;
};

function SharePlaygroundButton(props: SharePlaygroundButtonProps) {
  const { sandpack } = useSandpack();
  const { files } = sandpack;
  const [label, setLabel] = useState("Share");

  const onClick = () => {
    const code = JSON.stringify(files, null, 2);
    const url = `${DOMAIN}/play?code=${encodeURIComponent(code)}&template=${props.template}`;

    // copy to clipboard
    navigator.clipboard.writeText(url);

    // show toast
    setLabel("Copied!");

    setTimeout(() => {
      setLabel("Share");
    }, 2000);
  };

  return (
    <Button variant="secondary" onClick={onClick} className="hidden sm:flex">
      {label}
    </Button>
  );
}

export { SharePlaygroundButton };
