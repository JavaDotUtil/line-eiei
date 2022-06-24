module.exports = {
  parserOptions: {
    ecmaVersion: 2022,
  },
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:json/recommended'],
  plugins: [ '@typescript-eslint'],
  env: {
    node: true,
  },
  rules: {
    // 'prettier/prettier': [
    //   'error',
    //   {
    //     trailingComma: 'es5',
    //     singleQuote: true,
    //   },
    // ],
  },
  overrides: [
    {
      files: ['**/*.test.js'],
      env: {
        jest: true,
      },
    },
  ],
};
