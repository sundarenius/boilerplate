/* eslint-disable max-len */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['src'],
      },
    },
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    semi: 'warn',
    'import/prefer-default-export': 'off',
    // Already have this with typescript, plus eslint dont seem to understand ts absolute imports.
    'import/no-unresolved': 'off',
    'max-len': ['warn', { code: 105 }],
    'no-console': 'off',
    // no-unused-vars dont care if it it's a type declaration
    // www.github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'implicit-arrow-linebreak': 'off',
    'no-shadow': 'off',
  },
};
