module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react', 'import'],
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'no-unused-vars': "warn",
  },
};
