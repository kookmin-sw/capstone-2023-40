module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react-hooks', // eslint-plugin-react-hooks 설치한 경우
  ],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:react/recommended', // eslint-plugin-react 설치한 경우
    'plugin:jsx-a11y/recommended', // eslint-plugin-jsx-a11y 설치한 경우
    'plugin:import/errors', // eslint-plugin-import 설치한 경우
    'plugin:import/warnings', // eslint-plugin-import 설치한 경우
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 0,
    'import/prefer-default-export': 'off',
    'global-require': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'no-underscore-dangle': 'off',
    'object-shorthand': 'off',
    '@typescript-eslint/no-unused-expressions': 'warn',
    '@typescript-eslint/naming-convention': 'warn',
    'react/require-default-props': 'warn',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
