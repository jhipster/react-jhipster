import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from '@eslint-react/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['webpack.config.js', 'target/**', 'build/**', 'bundles/**', 'lib/**', 'coverage/**', 'jest.conf.js', 'node/**', 'postcss.config.js', 'eslint.config.mjs'],
  },
  js.configs.recommended,
  ...tsPlugin.configs['flat/recommended'],
  ...tsPlugin.configs['flat/recommended-type-checked'],
  reactPlugin.configs['recommended-type-checked'],
  eslintConfigPrettier,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.test.json',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: ['static-field', 'instance-field', 'constructor', 'static-method', 'instance-method'],
        },
      ],
      '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: { attributes: false } }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_', ignoreRestSiblings: true }],
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'spaced-comment': ['warn', 'always'],
      'guard-for-in': 'error',
      'no-labels': 'error',
      'no-caller': 'error',
      'no-bitwise': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-new-wrappers': 'error',
      'no-eval': 'error',
      'no-new': 'error',
      'no-var': 'error',
      radix: 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'prefer-const': 'error',
      'object-shorthand': ['error', 'always', { avoidExplicitReturnArrows: true }],
      'default-case': 'error',
      complexity: ['error', 40],
      'no-invalid-this': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
    },
  },
];
