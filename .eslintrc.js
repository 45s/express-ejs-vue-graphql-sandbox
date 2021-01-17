module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
    'prettier',
    'prettier/react',
  ],
  plugins: ['prettier'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['**/build/*.js', '**/dist/*.js'],
  rules: {
    'prettier/prettier': 1,
    'react/jsx-filename-extension': [
      0,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'import/no-dynamic-require': 0,
    'global-require': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'react/jsx-curly-brace-presence': 0,
    'arrow-body-style': 0,
    'object-curly-newline': 0,
    'react/no-unescaped-entities': 0,
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        labelComponents: ['CustomInputLabel'],
        labelAttributes: ['label'],
        controlComponents: ['CustomInput'],
        depth: 3,
      },
    ],
    'jsx-a11y/no-noninteractive-element-interactions': [
      'error',
      {
        handlers: [
          'onClick',
          'onMouseDown',
          'onMouseUp',
          'onKeyPress',
          'onKeyDown',
          'onKeyUp',
        ],
      },
    ],
    'react/jsx-props-no-spreading': 0,
    'consistent-return': 0,
    'no-console': ['error', { allow: ['warn', 'error'] }],
  },
}
