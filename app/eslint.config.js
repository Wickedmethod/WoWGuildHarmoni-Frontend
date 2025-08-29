// Flat ESLint config for Vue 3 + TypeScript + Tailwind (Tailwind v4)
import js from '@eslint/js';
import ts from 'typescript-eslint';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import importPlugin from 'eslint-plugin-import';
import unicorn from 'eslint-plugin-unicorn';
import prettier from 'eslint-config-prettier';

export default [
  // Global ignore list (build artifacts, vendor, and common configs)
  {
    ignores: [
      'node_modules',
      'dist',
      'coverage',
      '.vite',
      'vite.config.*',
      'tailwind.config.*',
      'postcss.config.*',
    ],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  // Use Vue recommended SFC rules
  ...vue.configs['flat/recommended'],

  // App source: TS + Vue SFCs
  {
    files: ['**/*.{ts,tsx,vue}'],
    plugins: {
      import: importPlugin,
      unicorn,
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: ts.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
      },
    },
    settings: {
      // Help import plugin resolve TS paths from tsconfig.app.json
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.app.json'],
        },
      },
    },
    rules: {
      // Imports and module hygiene
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [
            { pattern: '@tanstack/**', group: 'external', position: 'after' },
            // Prefer feature types and composables first within internal paths
            { pattern: '@/**/features/**/types', group: 'internal', position: 'before' },
            { pattern: '@/**/features/**/composables/**', group: 'internal', position: 'before' },
            { pattern: '@/**/features/**/components/**', group: 'internal', position: 'after' },
            { pattern: '@/**/features/**/views/**', group: 'internal', position: 'after' },
            { pattern: '@/**', group: 'internal', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: ['builtin', 'type'],
        },
      ],
      // Naming
      'unicorn/filename-case': ['warn', { cases: { kebabCase: true, pascalCase: true } }],
      // Vue specifics
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',
      'vue/attributes-order': 'error',
      // TypeScript best practices (strict-ish without being noisy)
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      // DX
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  // Relax import/order in generated UI primitives to avoid noisy diffs
  {
    files: ['src/components/ui/**/*.{ts,tsx,vue}'],
    rules: {
      'import/order': 'off',
    },
  },

  // Test files (Jest-style globals; adjust if you use Vitest)
  {
    files: ['**/*.test.{ts,tsx,vue}', '**/*.spec.{ts,tsx,vue}'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
    rules: {
      'no-console': 'off',
    },
  },

  // Apply Prettier last to disable formatting-related ESLint rules
  prettier,
];
