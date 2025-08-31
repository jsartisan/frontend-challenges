import baseConfig from "../../eslint.config.js";

export default [
  ...baseConfig,
  // Add ignore patterns specific to the www app
  {
    ignores: [
      "**/dist/**",
      "**/build/**",
      "**/node_modules/**",
      "**/.next/**",
      "**/.out/**",
      "eslint.config.js",
      "eslint.config.mjs",
    ],
  },
  {
    // Override or add specific rules for the www app if needed
    rules: {
      // Add any www-specific rules here
    },
  },
];
