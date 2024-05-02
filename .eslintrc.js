const stylisticEsLint = require('@stylistic/eslint-plugin');

const customizedStylistJs = stylisticEsLint.configs.customize({
  // the following options are the default values
  indent: 2,
  quotes: 'single',
  quoteProps: 'consistent',
  semi: true,
  jsx: true,
  braceStyle: '1tbs',
});

const javascriptSettings = {
  files: ['*.js'],
  env: {
    'browser': true,
    'commonjs': true,
    'es2021': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:jest/recommended',
  ],
  parserOptions: {
    'ecmaVersion': 12,
  },
  rules: {
    'indent': [
      'error',
      2,
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'quotes': [
      'error',
      'single',
    ],
    'no-else-return': ['error', { allowElseIf: false }],
    'no-unused-vars': ['error', { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false }],
    'semi': [
      'error',
      'always',
    ],
  },
};

module.exports = {
  plugins: [
    'jest',
    '@stylistic',
  ],
  rules: {
    ...customizedStylistJs.rules,
    // ...your other rules
  },
  overrides: [
    javascriptSettings,
  ],
};
