import { commonFiles } from "./common";

export const VANILLA_TEMPLATE = {
  files: {
    "/index.html": {
      active: true,
      code: `<!doctype html>
<html>
  <head>
    <title>Parcel Sandbox</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <h1>Hello World</h1>
  </body>
</html>`,
    },
    ...commonFiles,
    "/index.js": {
      code: `import "./styles.css";`,
    },
    "/package.json": {
      hidden: true,
      code: JSON.stringify({
        dependencies: {},
        main: "/index.js",
        devDependencies: {},
      }),
    },
  },
  main: "/index.js",
  environment: "parcel",
};
