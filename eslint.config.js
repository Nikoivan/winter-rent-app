import js from '@eslint/js';
import jest from 'eslint-plugin-jest';
import globals from 'globals';
import sonarjs from 'eslint-plugin-sonarjs';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierPlugin from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';

export default tseslint.config({ ignores: ['dist'] }, js.configs.recommended, tseslint.configs.recommended, {
  files: ['**/*.{ts,tsx}', 'test/**'],
  ...jest.configs['flat/recommended'],
  ...importPlugin.flatConfigs.recommended,
  languageOptions: {
    ecmaVersion: 'latest',
    globals: globals.browser,
    sourceType: 'module',
  },
  plugins: {
    '@typescript-eslint': tseslint.plugin,
    react: eslintReact,
    jest,
    sonarjs,
    unicorn: eslintPluginUnicorn,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    prettier: prettierPlugin,
  },
  rules: {
    ...eslintReact.configs.recommended.rules,
    ...reactHooks.configs.recommended.rules,
    ...jest.configs['flat/recommended'].rules,
    'jest/prefer-expect-assertions': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    semi: [2, 'always'],
    'react/jsx-curly-newline': ['error'],
    'react/jsx-indent': ['error'],
    'react/jsx-indent-props': ['error'],
    'react/jsx-one-expression-per-line': ['error'],
    'react/jsx-wrap-multilines': ['error'],
    'react/jsx-props-no-multi-spaces': ['error'],
    'semi-spacing': [2, { before: false, after: true }],
    'wrap-iife': [2, 'inside'],
    'no-caller': 2,
    'no-cond-assign': [2, 'except-parens'],
    'no-constant-condition': 2,
    'no-debugger': 2,
    'no-dupe-args': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-empty': [2, { allowEmptyCatch: true }],
    'no-extra-boolean-cast': 2,
    'no-extra-semi': 2,
    'no-func-assign': 2,
    'no-new': 2,
    'no-sparse-arrays': 2,
    'no-undef': 0,
    'no-unexpected-multiline': 2,
    'no-unreachable': 2,
    strict: 2,
    'max-params': [2, 5],
    'max-depth': [1, 4],
    'no-eq-null': 0,
    'no-unused-expressions': 2,
    'dot-notation': 2,
    'use-isnan': 2,
    'block-scoped-var': 2,
    complexity: [0, 11],
    curly: [2, 'all'],
    eqeqeq: [2, 'always', { null: 'ignore' }],
    'no-else-return': 2,
    'no-extra-bind': 2,
    'no-implicit-coercion': [2, { allow: ['!!'] }],
    'no-return-assign': 0,
    'no-sequences': 2,
    yoda: 2,
    'no-restricted-globals': [2, 'fdescribe', 'fit'],
    'no-var': 1,
    'arrow-parens': [2, 'as-needed'],
    'array-bracket-spacing': [2, 'never'],
    'brace-style': [2, '1tbs', { allowSingleLine: true }],
    camelcase: [1, { properties: 'never', ignoreDestructuring: true }],
    'comma-dangle': ['error', 'never'],
    'comma-spacing': [2, { before: false, after: true }],
    'eol-last': 2,
    'func-call-spacing': [2, 'never'],
    'block-spacing': 2,
    'keyword-spacing': [2, { before: true, after: true }],
    'max-len': [
      2,
      {
        code: 120,
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignorePattern: 'require',
      },
    ],
    'no-lonely-if': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-multi-spaces': 2,
    'no-multiple-empty-lines': [2, { max: 1, maxBOF: 0, maxEOF: 0 }],
    'no-trailing-spaces': 2,
    'no-unneeded-ternary': 2,
    'no-nested-ternary': 2,
    'object-curly-spacing': [2, 'always'],
    'one-var-declaration-per-line': [2, 'initializations'],
    'one-var': [2, { let: 'never', const: 'never' }],
    'operator-linebreak': 'off',
    'padded-blocks': [2, 'never'],
    'quote-props': [2, 'as-needed', { numbers: true }],
    quotes: [2, 'single', { avoidEscape: true }],
    'space-before-blocks': [2, 'always'],
    'space-before-function-paren': [
      2,
      {
        asyncArrow: 'always',
        anonymous: 'always',
        named: 'never',
      },
    ],
    'space-in-parens': 2,
    'no-console': [2, { allow: ['assert', 'error', 'warn'] }],
    'key-spacing': [2, { beforeColon: false, afterColon: true, mode: 'strict' }],
    'space-infix-ops': 2,
    'newline-before-return': 'error',
    'import/no-commonjs': 'off',
    'import/no-import-module-exports': 'off',

    // REACT
    // https://github.com/yannickcr/eslint-plugin-react/tree/master/docs/rules
    'jsx-quotes': [2, 'prefer-single'],
    'react/jsx-boolean-value': 2,
    'react/display-name': 0,
    'react/jsx-closing-tag-location': 2,
    'react/jsx-equals-spacing': 2,
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-handler-names': 0,
    'react/jsx-key': 2,
    'react/jsx-no-duplicate-props': 2,
    'react/jsx-no-literals': 0,
    'react/jsx-no-undef': 0,
    'react/jsx-sort-props': 0,
    'react/jsx-tag-spacing': [2, { beforeClosing: 'never', beforeSelfClosing: 'always' }],
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'react/no-find-dom-node': 2,
    'react/no-multi-comp': 0,
    'react/no-set-state': 0,
    'react/react-in-jsx-scope': 0,
    'react/require-optimization': 0,
    'react/self-closing-comp': 2,
    'react/style-prop-object': 2,
    'react/void-dom-elements-no-children': 2,

    // sonarjs
    'sonarjs/no-implicit-dependencies': 'error',

    // unicorn
    'unicorn/better-regex': 'error',

    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules
    ...tseslint.configs.recommended.rules,
    '@typescript-eslint/consistent-type-assertions': 2,
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-empty-interface': 2,
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        vars: 'all',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': [
      'error',
      {
        allowedNames: [
          'render',
          'componentDidMount',
          'componentDidUpdate',
          'componentWillUnmount',
          'ngOnInit',
          'ngOnChanges',
          'ngAfterViewInit',
          'ngOnDestroy',
        ],
      },
    ],
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/no-empty-function': ['error', { allow: ['private-constructors'] }],
    '@typescript-eslint/no-unsafe-enum-comparison': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-require-imports': 'off',

    // https://github.com/danielnixon/eslint-plugin-total-functions
    'total-functions/require-strict-mode': 'off',
    'total-functions/no-unsafe-type-assertion': 'off',
    'total-functions/no-unsafe-readonly-mutable-assignment': 'off',
    'total-functions/no-partial-division': 'off',
    'total-functions/no-enums': 'off',
    'total-functions/no-partial-url-constructor': 'off',
  },
});
