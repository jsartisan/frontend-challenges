import html from "prettier/plugins/html";
import prettier from "prettier/standalone";
import babel from "prettier/plugins/babel";
import estree from "prettier/plugins/estree";
import postcss from "prettier/plugins/postcss";
import typescript from "prettier/plugins/typescript";

const EXT_MAP: Record<string, { parser: string; plugins: any[] }> = {
  js: { parser: "babel", plugins: [babel, estree] },
  jsx: { parser: "babel", plugins: [babel, estree] },
  ts: { parser: "babel-ts", plugins: [babel, typescript, estree] },
  tsx: { parser: "babel-ts", plugins: [babel, typescript, estree] },
  html: { parser: "html", plugins: [html, estree] },
  css: { parser: "css", plugins: [postcss, estree] },
  json: { parser: "json", plugins: [babel, estree] },
  md: { parser: "markdown", plugins: [babel, estree] },
};

export function usePrettify() {
  const prettify = async (file: string, code: string, options: { tabSize?: number }) => {
    const { tabSize = 2 } = options;
    const ext = file.split(".").pop() ?? "";

    const config = EXT_MAP[ext] ?? { parser: "babel", plugins: [babel, estree] };

    try {
      return await prettier.format(code, {
        parser: config.parser,
        plugins: config.plugins.filter(Boolean),
        tabWidth: tabSize,
      });
    } catch (err) {
      console.error("Prettier failed:", err);
      return code; // fallback so editor doesn't crash
    }
  };

  return prettify;
}
