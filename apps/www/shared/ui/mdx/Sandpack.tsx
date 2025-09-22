import React from "react";
import { SandpackFile } from "@codesandbox/sandpack-react";

import { File } from "~/features/code-editor/ui/File";
import { TEMPLATES } from "~/entities/challenge/model/constants";
import { SupportedTemplates } from "~/entities/challenge/model/types";
import { SandpackRoot } from "~/features/code-editor/ui/SandpackRoot";

type SandpackProps = {
  codeOnly?: boolean;
  previewOnly?: boolean;
  readOnly?: boolean;
  template: SupportedTemplates;
  children: React.ReactElement;
};

export function Sandpack(props: SandpackProps) {
  const { children, template = "react" } = props;

  // convert the children to an array
  const codeSnippets = React.Children.toArray(children);

  // using the array.reduce method to reduce the children to an object containing
  // filename as key then other properties like the code, if the file is hidden as
  // properties
  const files = codeSnippets.reduce((result: Record<string, SandpackFile>, codeSnippet: React.ReactElement) => {
    const { props } = (codeSnippet.props as any).children;
    let filePath; // path in the folder structure
    let fileHidden = false; // if the file is available as a tab
    let fileActive = false; // if the file tab is shown by default
    let fileReadOnly = false; // if the file is read only

    if (props.meta) {
      // get our metadata from the prop
      const [name, ...params] = props.meta.split(" ");
      filePath = "/" + name;
      if (params.includes("hidden")) {
        fileHidden = true;
      }
      if (params.includes("active")) {
        fileActive = true;
      }

      if (params.includes("readOnly")) {
        fileReadOnly = true;
      }
    } else {
      // if no name is given to the file, we give them defaults based on
      // the language
      if (props.className === "language-js") {
        filePath = "/App.js";
      } else if (props.className === "language-css") {
        filePath = "/styles.css";
      } else {
        throw new Error(`Code block is missing a filename: ${props.children}`);
      }
    }

    if (result[filePath]) {
      throw new Error(`File ${filePath} was defined multiple times. Each file snippet should have a unique path name`);
    }

    result[filePath] = {
      code: props.children,
      hidden: fileHidden,
      active: fileActive,
      readOnly: fileReadOnly,
    };
    return result;
  }, {});

  const allFiles = {
    ...TEMPLATES[template].files,
    ...files,
  };

  return (
    <div className="not-prose">
      <SandpackRoot files={allFiles}>
        <File template={template} showTabs={false} />
      </SandpackRoot>
    </div>
  );
}
