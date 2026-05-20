// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import perfectionist from 'eslint-plugin-perfectionist'
import react from 'eslint-plugin-react'
import tseslint from 'typescript-eslint'
import unusedImports from 'eslint-plugin-unused-imports';
import typescriptEslintParser from '@typescript-eslint/parser';


export default tseslint.defineConfig({ ignores: ['dist', '.next', 'node_modules', 'build', 'coverage'] }, {
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  ignores: ['**/*', '!src/**/*'],
  files: ['src/**/*.{ts,tsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    parser: typescriptEslintParser, // Added parser for TypeScript
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    'perfectionist': perfectionist,
    'react': react,
    'unused-imports': unusedImports,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'space-in-parens': ['error', 'never'],

    // Пробелы внутри фигурных скобок (для объектов)
    'object-curly-spacing': ['error', 'always'],

    // Убрать пробелы внутри квадратных скобок (для массивов)
    'array-bracket-spacing': ['error', 'never'],

    // Использовать одинарные кавычки
    "quotes": ["error", "single"],

    "perfectionist/sort-imports": ["error", {
      "customGroups": [
        {
          "groupName": "react",
          "elementNamePattern": ["^react$", "^react-.+"],
        },
      ],
      "groups": [
        "type-import",
        "react",
        ["value-builtin", "value-external"],
        "type-internal",
        "value-internal",
        ["type-parent", "type-sibling", "type-index"],
        ["value-parent", "value-sibling", "value-index"],
        "value-side-effect",
        "value-side-effect-style",
        "unknown",
      ],
      "newlinesBetween": 1,
      "order": "asc",
      "type": "natural",
    }],

    "padding-line-between-statements": [
      "error",
      {
        "blankLine": "always",
        "next": "return",
        "prev": "*"
      },
      {
        "blankLine": "always",
        "next": "*",
        "prev": [
          "const",
          "let",
          "var"
        ]
      },
      {
        "blankLine": "any",
        "next": [
          "const",
          "let",
          "var"
        ],
        "prev": [
          "const",
          "let",
          "var"
        ]
      }
    ],
    "prefer-const": "error",
    "react/jsx-curly-brace-presence": [
      "error",
      {
        "children": "ignore",
        "propElementValues": "always",
        "props": "always"
      }
    ],

    // Лимит на количество строк в файле
    "max-lines": [
      "error",
      300
    ],
    "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
      ]
  },
}, {
  files: ['src/shared/ui/**/*.{ts,tsx}'],
  rules: {
    'react-refresh/only-export-components': 'off',
  },
});
