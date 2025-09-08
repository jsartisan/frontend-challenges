import { Monaco } from "@monaco-editor/react";

// Load React type definitions from @types/react and @types/react-dom via unpkg and add them to Monaco
export async function loadReactTypeDefinitions(monaco: Monaco) {
  const reactVersion = "19.1.1"; // keep this in sync with the version in package.json
  const reactDomVersion = "19.1.1";

  const reactBase = `https://unpkg.com/@types/react@${reactVersion}/`;
  const reactDomBase = `https://unpkg.com/@types/react-dom@${reactDomVersion}/`;

  // Known important files we need besides index.d.ts
  const reactFiles = ["index.d.ts", "global.d.ts", "jsx-runtime.d.ts", "experimental.d.ts"];
  const reactDomFiles = ["client.d.ts", "index.d.ts"];

  try {
    const reactPromises = reactFiles.map(async (f) => {
      const txt = await fetch(reactBase + f).then((r) => r.text());
      return [`file:///node_modules/@types/react/${f}`, txt] as const;
    });

    const reactDomPromises = reactDomFiles.map(async (f) => {
      const txt = await fetch(reactDomBase + f).then((r) => r.text());
      return [`file:///node_modules/@types/react-dom/${f}`, txt] as const;
    });

    const files = await Promise.all([...reactPromises, ...reactDomPromises]);

    files.forEach(([path, contents]) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(contents, path);
    });
  } catch (error) {
    console.error("Failed to load React type definitions for Monaco", error);
  }
}
