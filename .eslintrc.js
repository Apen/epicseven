module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['plugin:vue/base', 'airbnb-base', 'prettier', 'prettier/vue', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'prettier/prettier': ['error'],
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    'func-names': 'off',
    'no-shadow': ['error', { allow: ['state'] }],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          // All properties except state are in the ignorePropertyModificationsFor array by default.
          'state',
          'acc',
          'e',
          'ctx',
          'req',
          'request',
          'res',
          'response',
          '$scope',
        ],
      },
    ],
  },
};
