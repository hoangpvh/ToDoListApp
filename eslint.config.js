// eslint.config.js
const eslintRecommended = require('@eslint/js');
const typescriptParser = require('@typescript-eslint/parser');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const sortKeysFix = require('eslint-plugin-sort-keys-fix');
const noJp = require('eslint-plugin-no-jp');
const react = require('eslint-plugin-react');
const reactNative = require('eslint-plugin-react-native');

module.exports = [
  {
    files: ['*.ts', '*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        // Define any global variables here
      },
    },
    plugins: {
      react,
      'simple-import-sort': simpleImportSort,
      'sort-keys-fix': sortKeysFix,
      'no-jp': noJp,
      'react-native': reactNative,
    },
    rules: {
      'react-native/no-raw-text': ['warn', { skip: ['Button', 'Paragraph'] }],
      'indent': ['error', 2, { "SwitchCase": 1 }],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-indent': ['error', 2],
      'sort-keys-fix/sort-keys-fix': 'warn',
      'no-jp/no-jp-identifier': 2,
      'no-jp/no-jp-comment': 2,
      'jsx-quotes': ['error', 'prefer-double'],
      'max-len': ['warn', { ignorePattern: '^import\\s.+\\sfrom\\s.+' }],
    },
  },
  {
    files: ['.eslintrc.{js,cjs}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'script',
      },
      globals: {
        // Define any global variables for this file type if necessary
      },
    },
  },
];
