import babel from "prettier/plugins/babel";
import prettier from "prettier/standalone";
import estree from "prettier/plugins/estree";
import typescript from "prettier/plugins/typescript";
import postcss from "prettier/plugins/postcss";
import prettierHTML from "prettier/plugins/html";
import { useSandpack } from "@codesandbox/sandpack-react";

export function usePrettify() {
  const { sandpack } = useSandpack();

  const prettify = (options: { tabSize?: number }) => {
    const { tabSize } = options;
    const activeFile = sandpack.activeFile;
    const code = sandpack.files[activeFile].code;
    const ext = activeFile.split(".").pop();
    let plugins = [] as any[];
    let parser = "babel";

    if (ext === "js" || ext === "jsx") {
      plugins = [babel, estree];
    }

    if (ext === "ts") {
      parser = "babel-ts";
      plugins = [babel, estree, typescript];
    }

    if (ext === "html") {
      plugins = [prettierHTML];
      parser = "html";
    }

    if (ext === "css") {
      parser = "css";
      plugins = [postcss];
    }

    return prettier
      .format(code, {
        parser: parser,
        plugins: plugins,
        tabWidth: tabSize,
      })
      .then((formatted) => {
        if (formatted) {
          sandpack.updateFile(activeFile, formatted);
          return {
            ...sandpack.files,
            [activeFile]: {
              ...sandpack.files[activeFile],
              code: formatted,
            },
          };
        }
        return null;
      })
      .catch(console.log);
  };

  return prettify;
}
