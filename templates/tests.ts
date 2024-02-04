export const TESTS_TEMPLATE = {
  files: {
    "/index.js": {
      code: `export const add = (a, b) => a + b;`,
    },
    "/index.test.js": {
      code: `import { add } from './';

describe('add', () => {
  test('Commutative Law of Addition', () => {
    expect(add(1, 2)).toBe(add(2, 1));
  });
});`,
    },
    "/package.json": {
      code: JSON.stringify({
        dependencies: {},
        main: "/index.js",
        devDependencies: {},
      }),
    },
  },
  main: "/index.test.js",
  environment: "parcel",
  mode: "tests",
};
