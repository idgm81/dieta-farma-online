module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
		ecmaFeatures: {
			legacyDecorators: true
		}
	},
  plugins: ['ember'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended' // or other configuration
  ],
  env: {
    browser: true,
    jquery: true
  },
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
    "no-unused-vars": 2
  },
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'lib/*/index.js',
        'server/**/*.js'
      ],
      parserOptions: {
				sourceType: 'module',
				ecmaVersion: 2018
			},
      env: {
        browser: false,
        node: true
      },
      plugins: ['node'],
      extends: ['plugin:node/recommended'],
      rules: {
				'no-sync': 0,
				'no-process-env': 0,
				'node/shebang': 0,
				'node/no-extraneous-require': 1,
				// this can be removed once the following is fixed
				// https://github.com/mysticatea/eslint-plugin-node/issues/77
				'node/no-unpublished-require': 'off'
			}
    }
  ]
};
