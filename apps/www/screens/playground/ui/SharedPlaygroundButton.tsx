"use client";

import { useState } from "react";
import { useSandpack } from "@codesandbox/sandpack-react";

import { Button } from "~/components/ui";
import { DOMAIN } from "~/shared/config/paths";
import { TEMPLATES } from "~/entities/challenge/model/templates";
import { type SupportedTemplates } from "~/entities/challenge/model/types";

type SharePlaygroundButtonProps = {
  template?: SupportedTemplates;
};

const minifyCode = (code: string) => {
  return code
    .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "$1")
    .replace(/^\s+|\s+$/gm, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([=:,;{}()[\]])\s*/g, "$1")
    .trim();
};

function SharePlaygroundButton(props: SharePlaygroundButtonProps) {
  const { template = "vanilla" } = props;
  const { sandpack } = useSandpack();
  const { files } = sandpack;
  const [label, setLabel] = useState("Share");

  const onClick = () => {
    const templateFiles = TEMPLATES[template].files;
    const changedFiles = Object.entries(files).reduce(
      (acc, [path, file]) => {
        if (templateFiles[path]) {
          if (minifyCode(file.code) !== minifyCode(templateFiles[path].code)) {
            acc[path] = file;
          }
        } else {
          acc[path] = file;
        }

        return acc;
      },
      {} as Record<string, any>,
    );

    console.log(changedFiles);

    const code = JSON.stringify(changedFiles, null, 2);
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
