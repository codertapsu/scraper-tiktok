/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  extends: ['next/core-web-vitals'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended'],
      plugins: ['simple-import-sort'],
      rules: {
        'simple-import-sort/imports': [
          'warn',
          {
            groups: [
              ['^next.*'],
              ['^electron.*'],
              ['^'],
              ['^@.*'],
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ],
          },
        ],
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', 'ts', 'tsx'] }],
        'no-unused-vars': 'off',
        '@typescript-eslint/explicit-member-accessibility': [
          'warn',
          {
            accessibility: 'explicit',
            overrides: {
              accessors: 'off',
              constructors: 'explicit',
              methods: 'explicit',
              properties: 'explicit',
              parameterProperties: 'explicit',
            },
          },
        ],
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^[_]*$',
            varsIgnorePattern: '^[_]*$',
            caughtErrorsIgnorePattern: '^[_]*$',
          },
        ],
        '@typescript-eslint/no-explicit-any': [
          'warn',
          {
            fixToUnknown: true,
            ignoreRestArgs: true,
          },
        ],
      },
    },
  ],
};

module.exports = config;
