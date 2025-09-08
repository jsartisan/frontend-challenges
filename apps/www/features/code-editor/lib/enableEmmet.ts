import { Monaco } from "@monaco-editor/react";
import { emmetHTML, emmetCSS } from "emmet-monaco-es";

export function enableEmmet(monaco: Monaco): void {
  emmetHTML(monaco);
  emmetCSS(monaco);
  // emmetJSX(monaco, ["javascript", "typescript"]);
}
