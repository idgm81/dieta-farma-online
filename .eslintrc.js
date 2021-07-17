'use strict'

module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended'
  ],
  env: {
    browser: true,
    jquery: true
  },
  plugins: ['ember'],
  rules: {
    'ember/avoid-leaking-state-in-ember-objects': 1,
    'ember/closure-actions': 1,
    'ember/jquery-ember-run': 0,
    'ember/no-arrow-function-computed-properties': 0,
    'ember/no-deeply-nested-dependent-keys-with-each': 0,
    'ember/no-duplicate-dependent-keys': 0,
    'ember/no-global-jquery': 0,
    'ember/no-incorrect-calls-with-inline-anonymous-functions': 0,
    'ember/no-mixins': 1,
    'ember/no-new-mixins': 1,
    'ember/require-computed-property-dependencies': 1,
    'ember/no-private-routing-service': 1,
    'ember/no-observers': 1,
    'ember/no-on-calls-in-components': 0,
    'ember/no-side-effects': 1,
    'ember/no-get': 0,
    'ember/no-get-with-default': 1,
    'ember/no-jquery': 1,
    'ember/routes-segments-snake-case': 0,
    'ember/use-brace-expansion': 0,
    'ember/use-ember-get-and-set': 1,
    'no-unused-vars': 2
  },
  overrides: [
    {
      files: [
        '.eslintrc.js',
        'ember-cli-build.js',
        'testem.js',
        'config/**/*.js',
        'tests/.eslintrc.js'
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      },
      plugins: ['node'],
      rules: Object.assign({}, require('eslint-plugin-node').configs.recommended.rules, {
        'no-import-assign': 'off',
        // add your custom rules and overrides for node files here

        // this can be removed once the following is fixed
        // https://github.com/mysticatea/eslint-plugin-node/issues/77
        'node/no-unpublished-require': 'off'
      })
    }
  ]
};
