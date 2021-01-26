module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    "camelcase": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["off"],
    "@typescript-eslint/camelcase": ["off", {}],
    "@typescript-eslint/naming-convention": ["error", {
      "selector": 'default',
      "format": [
        'camelCase',
        'PascalCase',
        'snake_case',
        'UPPER_CASE'
      ]
    }],
    "no-var": "error",
    "prefer-const": ["error", {
      "destructuring": "any",
      "ignoreReadBeforeAssign": false
    }]
  }
};