import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import perfectionist from 'eslint-plugin-perfectionist';
import sortDestructureKeys from 'eslint-plugin-sort-destructure-keys';

export default tseslint.config(
  {
    ignores: [
      'eslint.config.mjs', 
      'eslint.config.js', 
      'apps/www/scripts/**',
      '**/scripts/**',
      'apps/www/next.config.js',
      'apps/www/postcss.config.js'
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      }, 
    },
  },
  {
    plugins: {
      react,
      'react-hooks': reactHooks,
      perfectionist,
      'sort-destructure-keys': sortDestructureKeys,
    },
  },
  {
    rules: {
      // React rules
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',

      // Perfectionist rules
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'line-length',
          order: 'asc',
        },
      ],

      // Sort destructure keys
      'sort-destructure-keys/sort-destructure-keys': 'error',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-floating-promises': 'off'
    },
  },
);