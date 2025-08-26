export const TYPESCRIPT_TEMPLATE = {
  files: {
    "/tsconfig.json": {
      hidden: true,
      code: `{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx",
    "types": [ "jest" ]
  }
}`,
    },
    "/index.ts": {
      code: `export const add = (a: number, b: number) => a + b;`,
    },
    "/index.test.ts": {
      code: `import { add } from './index';

describe('add', () => {
  test('Commutative Law of Addition', () => {
    expect(add(1, 2)).toBe(add(2, 1));
  });
});`,
    },
    "/package.json": {
      hidden: true,
      code: JSON.stringify({
        dependencies: {},
        main: "/index.ts",
        devDependencies: { typescript: "^4.0.0" },
      }),
    },
  },
  main: "/index.test.ts",
  environment: "parcel",
  mode: "tests",
};
